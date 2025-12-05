import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import * as fs from 'fs';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private readonly openai: OpenAI;
  private readonly model: string;
  private readonly whisperModel: string;
  private readonly ttsModel: string;

  constructor(private config: ConfigService) {
    this.openai = new OpenAI({
      apiKey: config.get('OPENAI_API_KEY'),
      organization: config.get('OPENAI_ORG_ID'),
    });
    this.model = config.get('OPENAI_MODEL', 'gpt-4-1106-preview');
    this.whisperModel = config.get('OPENAI_WHISPER_MODEL', 'whisper-1');
    this.ttsModel = config.get('OPENAI_TTS_MODEL', 'tts-1-hd');
  }

  // ═════════════════════════════════════════════════════════════════════
  // QUESTION GENERATION
  // ═════════════════════════════════════════════════════════════════════

  async generateInterviewQuestions(params: {
    type: string;
    role: string;
    experienceLevel: string;
    techStack: string[];
    company?: string;
    count: number;
  }): Promise<
    Array<{
      question: string;
      category: string;
      difficulty: string;
      expectedAnswer: string;
      evaluationCriteria: any;
    }>
  > {
    this.logger.log(`Generating ${params.count} ${params.type} questions for ${params.role}`);

    const prompt = this.buildQuestionGenerationPrompt(params);

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content:
              'You are an expert technical interviewer at top tech companies like Google, Meta, Amazon. Generate realistic, high-quality interview questions with detailed evaluation criteria.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content);
      this.logger.log(`Successfully generated ${result.questions.length} questions`);
      return result.questions;
    } catch (error) {
      this.logger.error('Failed to generate questions:', error);
      throw new Error('Failed to generate interview questions');
    }
  }

  private buildQuestionGenerationPrompt(params: any): string {
    return `Generate ${params.count} ${params.type} interview questions for a ${params.experienceLevel} level ${params.role} position${params.company ? ` at ${params.company}` : ''}.

Tech Stack: ${params.techStack.join(', ')}

Requirements:
- Questions should be realistic and match the experience level
- Include a mix of difficulties (easy, medium, hard)
- Provide detailed expected answers
- Include specific evaluation criteria

Return JSON in this exact format:
{
  "questions": [
    {
      "question": "string",
      "category": "string",
      "difficulty": "EASY|MEDIUM|HARD",
      "expectedAnswer": "string",
      "evaluationCriteria": {
        "keyPoints": ["string"],
        "commonMistakes": ["string"],
        "bonusPoints": ["string"]
      }
    }
  ]
}`;
  }

  // ═════════════════════════════════════════════════════════════════════
  // SPEECH TO TEXT (WHISPER)
  // ═════════════════════════════════════════════════════════════════════

  async transcribeAudio(filePath: string): Promise<{
    text: string;
    language: string;
    duration: number;
  }> {
    this.logger.log(`Transcribing audio file: ${filePath}`);

    try {
      const transcription = await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: this.whisperModel,
        response_format: 'verbose_json',
        language: 'en',
      });

      this.logger.log(`Transcription completed: ${transcription.text.length} characters`);

      return {
        text: transcription.text,
        language: transcription.language || 'en',
        duration: transcription.duration || 0,
      };
    } catch (error) {
      this.logger.error('Transcription failed:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  // ═════════════════════════════════════════════════════════════════════
  // TEXT TO SPEECH
  // ═════════════════════════════════════════════════════════════════════

  async generateSpeech(text: string, voice: string = 'alloy'): Promise<Buffer> {
    this.logger.log(`Generating speech for text (${text.length} chars) with voice: ${voice}`);

    try {
      const mp3 = await this.openai.audio.speech.create({
        model: this.ttsModel,
        voice: voice as any,
        input: text,
        speed: 1.0,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      this.logger.log(`Speech generated: ${buffer.length} bytes`);
      return buffer;
    } catch (error) {
      this.logger.error('TTS generation failed:', error);
      throw new Error('Failed to generate speech');
    }
  }

  // ═════════════════════════════════════════════════════════════════════
  // ANSWER EVALUATION
  // ═════════════════════════════════════════════════════════════════════

  async evaluateAnswer(params: {
    question: string;
    expectedAnswer: string;
    userAnswer: string;
    category: string;
    difficulty: string;
    evaluationCriteria?: any;
  }): Promise<{
    score: number;
    correctness: number;
    completeness: number;
    clarity: number;
    strengths: string[];
    improvements: string[];
    feedback: string;
    modelAnswer: string;
  }> {
    this.logger.log(`Evaluating answer for question: ${params.question.substring(0, 50)}...`);

    const prompt = `Evaluate this interview answer:

QUESTION: ${params.question}
CATEGORY: ${params.category}
DIFFICULTY: ${params.difficulty}

EXPECTED ANSWER:
${params.expectedAnswer}

USER'S ANSWER:
${params.userAnswer}

${params.evaluationCriteria ? `EVALUATION CRITERIA:\n${JSON.stringify(params.evaluationCriteria, null, 2)}` : ''}

Provide a detailed evaluation with scores (0-10) for:
1. Correctness - Technical accuracy
2. Completeness - Coverage of key points
3. Clarity - Communication effectiveness

Also provide:
- List of strengths (what they did well)
- List of areas to improve
- Detailed feedback paragraph
- An ideal model answer

Return JSON in this exact format:
{
  "correctness": 0-10,
  "completeness": 0-10,
  "clarity": 0-10,
  "strengths": ["string"],
  "improvements": ["string"],
  "feedback": "string",
  "modelAnswer": "string"
}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content:
              'You are an expert technical interviewer providing constructive, detailed feedback on interview answers. Be fair but thorough.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content);

      const score = (result.correctness + result.completeness + result.clarity) / 3;

      this.logger.log(`Evaluation completed with score: ${score.toFixed(2)}`);

      return {
        score,
        correctness: result.correctness,
        completeness: result.completeness,
        clarity: result.clarity,
        strengths: result.strengths,
        improvements: result.improvements,
        feedback: result.feedback,
        modelAnswer: result.modelAnswer,
      };
    } catch (error) {
      this.logger.error('Answer evaluation failed:', error);
      throw new Error('Failed to evaluate answer');
    }
  }

  // ═════════════════════════════════════════════════════════════════════
  // INTERVIEW FEEDBACK GENERATION
  // ═════════════════════════════════════════════════════════════════════

  async generateInterviewFeedback(params: {
    interviewType: string;
    role: string;
    questions: Array<{
      question: string;
      userAnswer: string;
      score: number;
      strengths: string[];
      improvements: string[];
    }>;
    overallScore: number;
  }): Promise<{
    summary: string;
    strengths: string[];
    areasToImprove: string[];
    recommendations: string[];
    nextSteps: string[];
  }> {
    this.logger.log(`Generating comprehensive interview feedback`);

    const prompt = `Generate comprehensive feedback for this ${params.interviewType} interview for a ${params.role} position.

OVERALL SCORE: ${params.overallScore.toFixed(2)}/10

QUESTIONS AND RESPONSES:
${params.questions
  .map(
    (q, i) => `
Question ${i + 1}: ${q.question}
Score: ${q.score.toFixed(2)}/10
Strengths: ${q.strengths.join(', ')}
Improvements: ${q.improvements.join(', ')}
`,
  )
  .join('\n')}

Provide:
1. Executive summary (2-3 sentences)
2. Top 3-5 overall strengths
3. Top 3-5 areas to improve
4. Specific recommendations for improvement
5. Next steps and action items

Return JSON in this exact format:
{
  "summary": "string",
  "strengths": ["string"],
  "areasToImprove": ["string"],
  "recommendations": ["string"],
  "nextSteps": ["string"]
}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content:
              'You are a senior technical interviewer providing comprehensive, actionable feedback to help candidates improve.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content);
      this.logger.log('Interview feedback generated successfully');
      return result;
    } catch (error) {
      this.logger.error('Feedback generation failed:', error);
      throw new Error('Failed to generate interview feedback');
    }
  }
}
