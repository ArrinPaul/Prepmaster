import { Controller, Get, Post, Body, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@ApiTags('activity')
@Controller('activity')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('heatmap')
  @ApiOperation({ summary: 'Get 365-day activity heatmap' })
  @ApiResponse({ status: 200, description: 'Heatmap retrieved successfully' })
  async getHeatmap(@CurrentUser() user: any, @Query('days', ParseIntPipe) days: number = 365) {
    return await this.activityService.getHeatmap(user.id, days);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get activity statistics' })
  @ApiResponse({ status: 200, description: 'Stats retrieved successfully' })
  async getStats(@CurrentUser() user: any) {
    return await this.activityService.getStats(user.id);
  }

  @Get('streak')
  @ApiOperation({ summary: 'Get streak information' })
  @ApiResponse({ status: 200, description: 'Streak info retrieved' })
  async getStreak(@CurrentUser() user: any) {
    return await this.activityService.getStreak(user.id);
  }

  @Post('track')
  @ApiOperation({ summary: 'Track activity' })
  @ApiResponse({ status: 201, description: 'Activity tracked' })
  async trackActivity(@CurrentUser() user: any, @Body() data: any) {
    return await this.activityService.trackActivity(user.id, data.type, data);
  }
}
