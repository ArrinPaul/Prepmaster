import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private prisma: PrismaService) {}

  async checkHealth() {
    const startTime = Date.now();
    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: await this.checkDatabase(),
        api: this.checkApi(),
      },
      responseTime: 0,
    };

    status.responseTime = Date.now() - startTime;

    // Determine overall status
    const allHealthy = Object.values(status.services).every((service: any) => service.status === 'healthy');
    status.status = allHealthy ? 'healthy' : 'degraded';

    return status;
  }

  private async checkDatabase() {
    try {
      const isHealthy = await this.prisma.healthCheck();
      
      if (isHealthy) {
        return {
          status: 'healthy',
          message: 'Database connection is healthy',
        };
      } else {
        return {
          status: 'unhealthy',
          message: 'Database connection failed',
        };
      }
    } catch (error) {
      this.logger.error('Database health check failed', error);
      return {
        status: 'unhealthy',
        message: 'Database connection error',
        error: error.message,
      };
    }
  }

  private checkApi() {
    return {
      status: 'healthy',
      message: 'API is running',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB',
      },
    };
  }

  async getReadiness() {
    const dbHealthy = await this.prisma.healthCheck();
    
    return {
      ready: dbHealthy,
      timestamp: new Date().toISOString(),
    };
  }

  getLiveness() {
    return {
      alive: true,
      timestamp: new Date().toISOString(),
    };
  }
}
