import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(private prisma: PrismaService) {}

  async getHeatmap(userId: string, days: number = 365) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const activities = await this.prisma.dailyActivity.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return activities.map((activity) => ({
      date: activity.date,
      interviews: activity.interviews,
      problems: activity.problems,
      totalPoints: activity.totalPoints,
      intensity: activity.intensity,
    }));
  }

  async getStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        longestStreak: true,
        totalPoints: true,
        interviewsCompleted: true,
        problemsSolved: true,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayActivity = await this.prisma.dailyActivity.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    const recentActivities = await this.prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return {
      user: user,
      today: todayActivity || { interviews: 0, problems: 0, totalPoints: 0 },
      recentActivities,
    };
  }

  async getStreak(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        longestStreak: true,
      },
    });

    // Calculate if streak is active today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayActivity = await this.prisma.dailyActivity.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    return {
      currentStreak: user?.currentStreak || 0,
      longestStreak: user?.longestStreak || 0,
      isActiveToday: !!todayActivity,
    };
  }

  async trackActivity(userId: string, type: string, data: any) {
    this.logger.log(`Tracking activity: ${type} for user: ${userId}`);

    const activity = await this.prisma.activity.create({
      data: {
        userId,
        type: type as any,
        title: data.title,
        description: data.description,
        points: data.points || 0,
        metadata: data.metadata,
        isPublic: data.isPublic ?? true,
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
        interviews: type === 'INTERVIEW_COMPLETED' ? 1 : 0,
        problems: type === 'PROBLEM_SOLVED' ? 1 : 0,
        totalPoints: data.points || 0,
        intensity: 1,
      },
      update: {
        interviews: type === 'INTERVIEW_COMPLETED' ? { increment: 1 } : undefined,
        problems: type === 'PROBLEM_SOLVED' ? { increment: 1 } : undefined,
        totalPoints: { increment: data.points || 0 },
        intensity: { increment: 1 },
      },
    });

    // Update streak
    await this.updateStreak(userId);

    return activity;
  }

  private async updateStreak(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayActivity = await this.prisma.dailyActivity.findUnique({
      where: {
        userId_date: {
          userId,
          date: yesterday,
        },
      },
    });

    let newStreak = 1;

    if (yesterdayActivity) {
      newStreak = user.currentStreak + 1;
    }

    const longestStreak = Math.max(newStreak, user.longestStreak);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        longestStreak,
      },
    });

    // Check for streak milestones
    if (newStreak % 7 === 0 && newStreak > 0) {
      await this.prisma.activity.create({
        data: {
          userId,
          type: 'STREAK_MILESTONE',
          title: `${newStreak}-day streak!`,
          description: `Congratulations on maintaining a ${newStreak}-day streak!`,
          points: newStreak * 5,
        },
      });
    }
  }
}
