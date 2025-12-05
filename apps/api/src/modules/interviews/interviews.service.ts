import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAIService } from '../../services/openai/openai.service';
import { QueueService } from '../../services/queue/queue.service';
import { CreateInterviewDto, SubmitAnswerDto, InterviewQueryDto } from './dto/interview.dto';

@Injectable()
export class InterviewsService {
  private readonly logger = new Logger(InterviewsService.name);

  constructor(
    private prisma: PrismaService,
    private openaiService: OpenAIService,
    private queueService: QueueService,
  ) {}

  // ═════════════════════════════════════════════════════════════════════
  // CREATE INTERVIEW
  // ═════════════════════════════════════════════════════════════════════

  async createInterview(userId: string, dto: CreateInterviewDto) {
    this.logger.log(`Creating ${dto.type} interview for user: ${userId}`);

    try {
      // Generate questions using OpenAI
      const generatedQuestions = await this.openaiService.generateInterviewQuestions({
        type: dto.type,
        role: dto.role,
        experienceLevel: dto.experienceLevel,
        techStack: dto.techStack,
        company: dto.company,
        count: dto.questionsCount,
      });

      // Create interview with questions
      const interview = await this.prisma.interview.create({
        data: {
          userId,
          type: dto.type,
          status: 'DRAFT',
          role: dto.role,
          company: dto.company,
          experienceLevel: dto.experienceLevel,
          techStack: dto.techStack,
          focusAreas: dto.focusAreas || [],
          duration: dto.duration,
          questionsCount: dto.questionsCount,
          useAiGeneration: dto.useAiGeneration ?? true,
          voiceEnabled: dto.voiceEnabled ?? true,
          ttsVoice: dto.ttsVoice || 'alloy',
          questions: {
            create: generatedQuestions.map((q, index) => ({
              order: index + 1,
              question: q.question,
              category: q.category,
              difficulty: q.difficulty as any,
              expectedAnswer: q.expectedAnswer,
              evaluationCriteria: q.evaluationCriteria,
              generatedByAi: true,
            })),
          },
        },
        include: {
          questions: {
            orderBy: { order: 'asc' },
          },
        },
      });

      // Queue TTS generation for questions if voice is enabled
      if (dto.voiceEnabled) {
        for (const question of interview.questions) {
          await this.queueService.addTTSJob({
            questionId: question.id,
            text: question.question,
            voice: dto.ttsVoice || 'alloy',
          });
        }
      }

      this.logger.log(`Interview created successfully: ${interview.id}`);
      return interview;
    } catch (error) {
      this.logger.error('Failed to create interview:', error);
      throw new BadRequestException('Failed to create interview');
    }
  }

  // ═════════════════════════════════════════════════════════════════════
  // LIST INTERVIEWS
  // ═════════════════════════════════════════════════════════════════════

  async listInterviews(userId: string, query: InterviewQueryDto) {
    const { page = 1, limit = 10, status, type } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (status) where.status = status;
    if (type) where.type = type;

    const [interviews, total] = await Promise.all([
      this.prisma.interview.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { questions: true },
          },
        },
      }),
      this.prisma.interview.count({ where }),
    ]);

    return {
      data: interviews,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ═════════════════════════════════════════════════════════════════════
  // GET INTERVIEW DETAILS
  // ═════════════════════════════════════════════════════════════════════

  async getInterview(interviewId: string, userId: string) {
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId,
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            order: true,
            question: true,
            category: true,
            difficulty: true,
            audioUrl: true,
            audioDuration: true,
            ttsGenerated: true,
            userAnswer: true,
            transcription: true,
            score: true,
            correctness: true,
            completeness: true,
            clarity: true,
            strengths: true,
            improvements: true,
            answeredAt: true,
            timeSpent: true,
          },
        },
        feedback: true,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    return interview;
  }

  // ═════════════════════════════════════════════════════════════════════
  // START INTERVIEW SESSION
  // ═════════════════════════════════════════════════════════════════════

  async startInterview(interviewId: string, userId: string) {
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    if (interview.status !== 'DRAFT') {
      throw new BadRequestException('Interview has already been started');
    }

    const updated = await this.prisma.interview.update({
      where: { id: interviewId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
    });

    this.logger.log(`Interview started: ${interviewId}`);
    return updated;
  }

  // ═════════════════════════════════════════════════════════════════════
  // SUBMIT ANSWER
  // ═════════════════════════════════════════════════════════════════════

  async submitAnswer(interviewId: string, questionId: string, userId: string, dto: SubmitAnswerDto) {
    // Verify ownership
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId,
      },
      include: {
        questions: {
          where: { id: questionId },
        },
      },
    });

    if (!interview || interview.questions.length === 0) {
      throw new NotFoundException('Question not found in this interview');
    }

    if (interview.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Interview is not in progress');
    }

    // Update question with answer
    const updatedQuestion = await this.prisma.interviewQuestion.update({
      where: { id: questionId },
      data: {
        userAnswer: dto.userAnswer,
        userAudioUrl: dto.audioUrl,
        transcription: dto.transcription,
        answeredAt: new Date(),
        timeSpent: dto.timeSpent,
      },
    });

    // Queue evaluation job
    await this.queueService.addEvaluationJob({
      questionId,
    });

    this.logger.log(`Answer submitted for question: ${questionId}`);

    // Check if all questions are answered
    const allQuestions = await this.prisma.interviewQuestion.findMany({
      where: { interviewId },
      select: { userAnswer: true },
    });

    const allAnswered = allQuestions.every((q) => q.userAnswer !== null);

    if (allAnswered) {
      // Mark interview as completed
      await this.completeInterview(interviewId);
    }

    return updatedQuestion;
  }

  // ═════════════════════════════════════════════════════════════════════
  // COMPLETE INTERVIEW
  // ═════════════════════════════════════════════════════════════════════

  private async completeInterview(interviewId: string) {
    const interview = await this.prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        questions: true,
      },
    });

    if (!interview) return;

    // Calculate scores (wait for evaluations to complete)
    const evaluatedQuestions = interview.questions.filter((q) => q.score !== null);

    if (evaluatedQuestions.length > 0) {
      const avgScore = evaluatedQuestions.reduce((sum, q) => sum + (q.score || 0), 0) / evaluatedQuestions.length;

      const avgCorrectness =
        evaluatedQuestions.reduce((sum, q) => sum + (q.correctness || 0), 0) / evaluatedQuestions.length;

      const avgCompleteness =
        evaluatedQuestions.reduce((sum, q) => sum + (q.completeness || 0), 0) / evaluatedQuestions.length;

      const avgClarity = evaluatedQuestions.reduce((sum, q) => sum + (q.clarity || 0), 0) / evaluatedQuestions.length;

      // Calculate duration
      const duration = interview.startedAt
        ? Math.floor((new Date().getTime() - interview.startedAt.getTime()) / 1000 / 60)
        : null;

      await this.prisma.interview.update({
        where: { id: interviewId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          totalDuration: duration,
          overallScore: avgScore,
          correctnessScore: avgCorrectness,
          completenessScore: avgCompleteness,
          clarityScore: avgClarity,
        },
      });

      // Generate comprehensive feedback
      await this.generateFeedback(interviewId);

      // Update user stats
      await this.updateUserStats(interview.userId);

      this.logger.log(`Interview completed: ${interviewId}`);
    }
  }

  // ═════════════════════════════════════════════════════════════════════
  // GENERATE FEEDBACK
  // ═════════════════════════════════════════════════════════════════════

  private async generateFeedback(interviewId: string) {
    const interview = await this.prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        questions: true,
      },
    });

    if (!interview) return;

    const evaluatedQuestions = interview.questions.filter((q) => q.score !== null && q.userAnswer !== null);

    if (evaluatedQuestions.length === 0) return;

    const feedback = await this.openaiService.generateInterviewFeedback({
      interviewType: interview.type,
      role: interview.role,
      questions: evaluatedQuestions.map((q) => ({
        question: q.question,
        userAnswer: q.userAnswer!,
        score: q.score!,
        strengths: q.strengths,
        improvements: q.improvements,
      })),
      overallScore: interview.overallScore || 0,
    });

    await this.prisma.interviewFeedback.create({
      data: {
        interviewId,
        summary: feedback.summary,
        strengths: feedback.strengths,
        areasToImprove: feedback.areasToImprove,
        recommendations: feedback.recommendations,
        nextSteps: feedback.nextSteps,
        generatedByAi: true,
      },
    });

    this.logger.log(`Feedback generated for interview: ${interviewId}`);
  }

  // ═════════════════════════════════════════════════════════════════════
  // UPDATE USER STATS
  // ═════════════════════════════════════════════════════════════════════

  private async updateUserStats(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        interviewsCompleted: { increment: 1 },
        totalPoints: { increment: 50 },
        lastActivityAt: new Date(),
      },
    });

    // Track activity
    await this.prisma.activity.create({
      data: {
        userId,
        type: 'INTERVIEW_COMPLETED',
        title: 'Completed an interview',
        points: 50,
        isPublic: true,
      },
    });

    // Update daily activity
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.prisma.dailyActivity.upsert({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      create: {
        userId,
        date: today,
        interviews: 1,
        totalPoints: 50,
        intensity: 1,
      },
      update: {
        interviews: { increment: 1 },
        totalPoints: { increment: 50 },
        intensity: { increment: 1 },
      },
    });
  }

  // ═════════════════════════════════════════════════════════════════════
  // GET INTERVIEW REPORT
  // ═════════════════════════════════════════════════════════════════════

  async getInterviewReport(interviewId: string, userId: string) {
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId,
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
        feedback: true,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    if (interview.status !== 'COMPLETED') {
      throw new BadRequestException('Interview is not yet completed');
    }

    return {
      interview: {
        id: interview.id,
        type: interview.type,
        role: interview.role,
        company: interview.company,
        status: interview.status,
        startedAt: interview.startedAt,
        completedAt: interview.completedAt,
        totalDuration: interview.totalDuration,
      },
      scores: {
        overall: interview.overallScore,
        correctness: interview.correctnessScore,
        completeness: interview.completenessScore,
        clarity: interview.clarityScore,
      },
      questions: interview.questions.map((q) => ({
        id: q.id,
        order: q.order,
        question: q.question,
        category: q.category,
        difficulty: q.difficulty,
        userAnswer: q.userAnswer,
        score: q.score,
        correctness: q.correctness,
        completeness: q.completeness,
        clarity: q.clarity,
        strengths: q.strengths,
        improvements: q.improvements,
        aiEvaluation: q.aiEvaluation,
        modelAnswer: q.modelAnswer,
        timeSpent: q.timeSpent,
      })),
      feedback: interview.feedback,
    };
  }

  // ═════════════════════════════════════════════════════════════════════
  // DELETE INTERVIEW
  // ═════════════════════════════════════════════════════════════════════

  async deleteInterview(interviewId: string, userId: string) {
    const interview = await this.prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId,
      },
    });

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    await this.prisma.interview.delete({
      where: { id: interviewId },
    });

    this.logger.log(`Interview deleted: ${interviewId}`);
    return { message: 'Interview deleted successfully' };
  }
}
