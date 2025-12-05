import { PrismaClient, Role, Plan } from '.prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Admin User
  console.log('Creating admin user...');
  const adminPassword = await bcrypt.hash('Admin123!@#', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@preppath.com' },
    update: {},
    create: {
      email: 'admin@preppath.com',
      password: adminPassword,
      name: 'PrepPath Admin',
      username: 'admin',
      role: Role.ADMIN,
      plan: Plan.ENTERPRISE,
      credits: 9999,
      emailVerified: new Date(),
      currentStreak: 50,
      longestStreak: 100,
      totalPoints: 100000,
      interviewsCompleted: 200,
      problemsSolved: 1000,
      bio: 'PrepPath system administrator',
      location: 'San Francisco, CA',
      website: 'https://preppath.com',
      isActive: true,
      lastLoginAt: new Date(),
      lastActivityAt: new Date(),
      userPreferences: {
        create: {
          theme: 'dark',
          emailNotifications: true,
          pushNotifications: true,
          interviewReminders: true,
          streakReminders: true,
          language: 'en',
          timezone: 'America/Los_Angeles',
        },
      },
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Demo User (ArrinPaul)
  console.log('Creating demo user (ArrinPaul)...');
  const demoPassword = await bcrypt.hash('Demo123!@#', 12);
  
  const demo = await prisma.user.upsert({
    where: { email: 'demo@preppath.com' },
    update: {},
    create: {
      email: 'demo@preppath.com',
      password: demoPassword,
      name: 'Arrin Paul',
      username: 'ArrinPaul',
      role: Role.USER,
      plan: Plan.PRO,
      credits: 100,
      emailVerified: new Date(),
      currentStreak: 15,
      longestStreak: 30,
      totalPoints: 5000,
      interviewsCompleted: 35,
      problemsSolved: 250,
      bio: 'Full-stack developer | Interview prep enthusiast | Building PrepPath',
      location: 'New York, NY',
      website: 'https://arrinpaul.dev',
      githubUrl: 'https://github.com/arrinpaul',
      linkedinUrl: 'https://linkedin.com/in/arrinpaul',
      twitterUrl: 'https://twitter.com/arrinpaul',
      isActive: true,
      lastLoginAt: new Date(),
      lastActivityAt: new Date(),
      userPreferences: {
        create: {
          theme: 'dark',
          emailNotifications: true,
          pushNotifications: true,
          interviewReminders: true,
          streakReminders: true,
          newFeatureEmails: true,
          weeklyDigest: true,
          language: 'en',
          timezone: 'America/New_York',
        },
      },
    },
  });
  console.log('✅ Demo user created:', demo.email);

  // Test Users
  console.log('Creating test users...');
  const testUsers = [
    {
      email: 'sarah.chen@example.com',
      name: 'Sarah Chen',
      username: 'sarahc',
      bio: 'Senior Software Engineer | Google',
      location: 'Mountain View, CA',
    },
    {
      email: 'mike.wilson@example.com',
      name: 'Mike Wilson',
      username: 'mikew',
      bio: 'Full Stack Developer | Meta',
      location: 'Seattle, WA',
    },
    {
      email: 'priya.patel@example.com',
      name: 'Priya Patel',
      username: 'priyap',
      bio: 'Backend Engineer | Amazon',
      location: 'Austin, TX',
    },
    {
      email: 'james.kim@example.com',
      name: 'James Kim',
      username: 'jamesk',
      bio: 'Frontend Developer | Netflix',
      location: 'Los Angeles, CA',
    },
    {
      email: 'lisa.rodriguez@example.com',
      name: 'Lisa Rodriguez',
      username: 'lisar',
      bio: 'DevOps Engineer | Microsoft',
      location: 'Boston, MA',
    },
  ];

  for (const userData of testUsers) {
    const hashedPassword = await bcrypt.hash('Test123!@#', 12);
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        username: userData.username,
        bio: userData.bio,
        location: userData.location,
        role: Role.USER,
        plan: Plan.FREE,
        credits: 10,
        emailVerified: new Date(),
        currentStreak: Math.floor(Math.random() * 20),
        longestStreak: Math.floor(Math.random() * 50),
        totalPoints: Math.floor(Math.random() * 2000),
        interviewsCompleted: Math.floor(Math.random() * 30),
        problemsSolved: Math.floor(Math.random() * 150),
        isActive: true,
        userPreferences: {
          create: {
            theme: 'dark',
            emailNotifications: true,
            language: 'en',
          },
        },
      },
    });
    console.log('✅ Test user created:', userData.email);
  }

  // System Configuration
  console.log('\nCreating system configuration...');
  const systemConfigs = [
    { key: 'app_name', value: 'PrepPath', type: 'string' },
    { key: 'app_version', value: '1.0.0', type: 'string' },
    { key: 'maintenance_mode', value: 'false', type: 'boolean' },
    { key: 'max_file_size_mb', value: '10', type: 'number' },
    { key: 'free_plan_credits', value: '10', type: 'number' },
    { key: 'pro_plan_credits', value: '100', type: 'number' },
    { key: 'openai_enabled', value: 'true', type: 'boolean' },
    { key: 'stripe_enabled', value: 'false', type: 'boolean' },
  ];

  for (const config of systemConfigs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }
  console.log('✅ System configuration created');

  console.log('\n✨ Database seeded successfully!\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📧 Admin Login:');
  console.log('   Email: admin@preppath.com');
  console.log('   Password: Admin123!@#');
  console.log('');
  console.log('📧 Demo User Login (ArrinPaul):');
  console.log('   Email: demo@preppath.com');
  console.log('   Password: Demo123!@#');
  console.log('');
  console.log('📧 Test User Login:');
  console.log('   Email: sarah.chen@example.com');
  console.log('   Password: Test123!@#');
  console.log('═══════════════════════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
