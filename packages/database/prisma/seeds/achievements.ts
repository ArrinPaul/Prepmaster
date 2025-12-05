import { PrismaClient } from '@prisma/client';

export async function seedAchievements(prisma: PrismaClient) {
  console.log('🏆 Seeding achievements...');

  const achievements = [
    // Interview Achievements
    {
      title: 'First Steps',
      description: 'Complete your first interview',
      category: 'INTERVIEWS',
      requirement: JSON.stringify({ interviewsCompleted: { gte: 1 } }),
      points: 10,
      icon: '🎯',
      isHidden: false,
    },
    {
      title: 'Getting Started',
      description: 'Complete 5 interviews',
      category: 'INTERVIEWS',
      requirement: JSON.stringify({ interviewsCompleted: { gte: 5 } }),
      points: 25,
      icon: '🚀',
      isHidden: false,
    },
    {
      title: 'Interview Apprentice',
      description: 'Complete 10 interviews',
      category: 'INTERVIEWS',
      requirement: JSON.stringify({ interviewsCompleted: { gte: 10 } }),
      points: 50,
      icon: '📚',
      isHidden: false,
    },
    {
      title: 'Interview Expert',
      description: 'Complete 25 interviews',
      category: 'INTERVIEWS',
      requirement: JSON.stringify({ interviewsCompleted: { gte: 25 } }),
      points: 100,
      icon: '🎓',
      isHidden: false,
    },
    {
      title: 'Interview Master',
      description: 'Complete 50 interviews',
      category: 'INTERVIEWS',
      requirement: JSON.stringify({ interviewsCompleted: { gte: 50 } }),
      points: 200,
      icon: '👑',
      isHidden: false,
    },
    {
      title: 'Interview Legend',
      description: 'Complete 100 interviews',
      category: 'INTERVIEWS',
      requirement: JSON.stringify({ interviewsCompleted: { gte: 100 } }),
      points: 500,
      icon: '⭐',
      isHidden: false,
    },

    // Streak Achievements
    {
      title: 'Consistency is Key',
      description: 'Maintain a 3-day streak',
      category: 'STREAKS',
      requirement: JSON.stringify({ currentStreak: { gte: 3 } }),
      points: 15,
      icon: '🔥',
      isHidden: false,
    },
    {
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      category: 'STREAKS',
      requirement: JSON.stringify({ currentStreak: { gte: 7 } }),
      points: 30,
      icon: '⚡',
      isHidden: false,
    },
    {
      title: 'Dedicated Learner',
      description: 'Maintain a 14-day streak',
      category: 'STREAKS',
      requirement: JSON.stringify({ currentStreak: { gte: 14 } }),
      points: 75,
      icon: '💪',
      isHidden: false,
    },
    {
      title: 'Monthly Champion',
      description: 'Maintain a 30-day streak',
      category: 'STREAKS',
      requirement: JSON.stringify({ currentStreak: { gte: 30 } }),
      points: 150,
      icon: '🏆',
      isHidden: false,
    },
    {
      title: 'Unstoppable',
      description: 'Maintain a 60-day streak',
      category: 'STREAKS',
      requirement: JSON.stringify({ currentStreak: { gte: 60 } }),
      points: 300,
      icon: '🌟',
      isHidden: false,
    },
    {
      title: 'Legendary Streak',
      description: 'Maintain a 100-day streak',
      category: 'STREAKS',
      requirement: JSON.stringify({ currentStreak: { gte: 100 } }),
      points: 500,
      icon: '💎',
      isHidden: false,
    },

    // Points Achievements
    {
      title: 'Point Collector',
      description: 'Earn 100 total points',
      category: 'POINTS',
      requirement: JSON.stringify({ totalPoints: { gte: 100 } }),
      points: 20,
      icon: '💰',
      isHidden: false,
    },
    {
      title: 'Point Enthusiast',
      description: 'Earn 500 total points',
      category: 'POINTS',
      requirement: JSON.stringify({ totalPoints: { gte: 500 } }),
      points: 50,
      icon: '💵',
      isHidden: false,
    },
    {
      title: 'Point Master',
      description: 'Earn 1000 total points',
      category: 'POINTS',
      requirement: JSON.stringify({ totalPoints: { gte: 1000 } }),
      points: 100,
      icon: '💸',
      isHidden: false,
    },
    {
      title: 'Point Tycoon',
      description: 'Earn 5000 total points',
      category: 'POINTS',
      requirement: JSON.stringify({ totalPoints: { gte: 5000 } }),
      points: 250,
      icon: '🤑',
      isHidden: false,
    },

    // Performance Achievements
    {
      title: 'Perfect Score',
      description: 'Get a perfect score (10/10) on any question',
      category: 'PERFORMANCE',
      requirement: JSON.stringify({ perfectScores: { gte: 1 } }),
      points: 25,
      icon: '💯',
      isHidden: false,
    },
    {
      title: 'Excellence Seeker',
      description: 'Get a perfect score on 5 questions',
      category: 'PERFORMANCE',
      requirement: JSON.stringify({ perfectScores: { gte: 5 } }),
      points: 75,
      icon: '🌟',
      isHidden: false,
    },
    {
      title: 'Ace Performer',
      description: 'Achieve an average score of 8+ across 10 interviews',
      category: 'PERFORMANCE',
      requirement: JSON.stringify({ 
        interviewsCompleted: { gte: 10 },
        averageScore: { gte: 8 }
      }),
      points: 100,
      icon: '🎖️',
      isHidden: false,
    },

    // Special/Hidden Achievements
    {
      title: 'Night Owl',
      description: 'Complete an interview between midnight and 4 AM',
      category: 'SPECIAL',
      requirement: JSON.stringify({ lateNightInterviews: { gte: 1 } }),
      points: 15,
      icon: '🦉',
      isHidden: true,
    },
    {
      title: 'Early Bird',
      description: 'Complete an interview between 5 AM and 7 AM',
      category: 'SPECIAL',
      requirement: JSON.stringify({ earlyMorningInterviews: { gte: 1 } }),
      points: 15,
      icon: '🐦',
      isHidden: true,
    },
    {
      title: 'Weekend Warrior',
      description: 'Complete 10 interviews on weekends',
      category: 'SPECIAL',
      requirement: JSON.stringify({ weekendInterviews: { gte: 10 } }),
      points: 50,
      icon: '🏖️',
      isHidden: true,
    },
    {
      title: 'Speed Runner',
      description: 'Complete an interview in under 10 minutes',
      category: 'SPECIAL',
      requirement: JSON.stringify({ fastInterviews: { gte: 1 } }),
      points: 30,
      icon: '⚡',
      isHidden: true,
    },
    {
      title: 'Marathon Session',
      description: 'Complete 5 interviews in a single day',
      category: 'SPECIAL',
      requirement: JSON.stringify({ marathonDays: { gte: 1 } }),
      points: 75,
      icon: '🏃',
      isHidden: true,
    },
    {
      title: 'Tech Explorer',
      description: 'Practice interviews for 5 different tech stacks',
      category: 'SPECIAL',
      requirement: JSON.stringify({ uniqueTechStacks: { gte: 5 } }),
      points: 50,
      icon: '🧭',
      isHidden: false,
    },
    {
      title: 'Role Versatility',
      description: 'Complete interviews for 3 different roles',
      category: 'SPECIAL',
      requirement: JSON.stringify({ uniqueRoles: { gte: 3 } }),
      points: 40,
      icon: '🎭',
      isHidden: false,
    },
  ];

  let created = 0;
  let updated = 0;

  for (const achievement of achievements) {
    const result = await prisma.achievement.upsert({
      where: { title: achievement.title },
      update: {
        description: achievement.description,
        category: achievement.category,
        requirement: achievement.requirement,
        points: achievement.points,
        icon: achievement.icon,
        isHidden: achievement.isHidden,
      },
      create: achievement,
    });

    if (result.createdAt === result.updatedAt) {
      created++;
    } else {
      updated++;
    }
  }

  console.log(`✅ Created ${created} new achievements`);
  console.log(`🔄 Updated ${updated} existing achievements`);
  console.log(`🏆 Total achievements: ${achievements.length}`);
}
