import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async getAllAchievements() {
    return await this.prisma.achievement.findMany({
      where: { isHidden: false },
      orderBy: [{ category: 'asc' }, { points: 'asc' }],
    });
  }

  async getUserAchievements(userId: string) {
    const userAchievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    const achievementIds = userAchievements.map((ua) => ua.achievementId);

    const achievements = await this.prisma.achievement.findMany({
      where: {
        id: {
          in: achievementIds,
        },
      },
    });

    return userAchievements.map((ua) => {
      const achievement = achievements.find((a) => a.id === ua.achievementId);
      return {
        ...ua,
        achievement,
      };
    });
  }

  async getAchievementDetails(achievementId: string) {
    return await this.prisma.achievement.findUnique({
      where: { id: achievementId },
    });
  }

  async checkAndUnlockAchievements(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    const achievements = await this.prisma.achievement.findMany();

    for (const achievement of achievements) {
      const userAchievement = await this.prisma.userAchievement.findUnique({
        where: {
          userId_achievementId: {
            userId,
            achievementId: achievement.id,
          },
        },
      });

      // Check if user meets requirements
      const meetsRequirements = this.checkRequirements(user, achievement.requirement as any);

      if (meetsRequirements && (!userAchievement || !userAchievement.isUnlocked)) {
        // Unlock achievement
        await this.prisma.userAchievement.upsert({
          where: {
            userId_achievementId: {
              userId,
              achievementId: achievement.id,
            },
          },
          create: {
            userId,
            achievementId: achievement.id,
            progress: 100,
            isUnlocked: true,
            unlockedAt: new Date(),
          },
          update: {
            progress: 100,
            isUnlocked: true,
            unlockedAt: new Date(),
          },
        });

        // Award points
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            totalPoints: { increment: achievement.points },
          },
        });

        // Track activity
        await this.prisma.activity.create({
          data: {
            userId,
            type: 'ACHIEVEMENT_UNLOCKED',
            title: `Unlocked: ${achievement.name}`,
            description: achievement.description,
            points: achievement.points,
          },
        });
      }
    }
  }

  private checkRequirements(user: any, requirement: any): boolean {
    const { field, operator, value } = requirement;

    const userValue = user[field];

    switch (operator) {
      case 'gte':
        return userValue >= value;
      case 'lte':
        return userValue <= value;
      case 'eq':
        return userValue === value;
      case 'gt':
        return userValue > value;
      case 'lt':
        return userValue < value;
      default:
        return false;
    }
  }
}
