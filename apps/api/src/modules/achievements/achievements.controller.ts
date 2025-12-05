import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AchievementsService } from './achievements.service';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@ApiTags('achievements')
@Controller('achievements')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({ summary: 'List all achievements' })
  @ApiResponse({ status: 200, description: 'Achievements retrieved' })
  async getAllAchievements() {
    return await this.achievementsService.getAllAchievements();
  }

  @Get('user')
  @ApiOperation({ summary: 'Get user achievements' })
  @ApiResponse({ status: 200, description: 'User achievements retrieved' })
  async getUserAchievements(@CurrentUser() user: any) {
    return await this.achievementsService.getUserAchievements(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get achievement details' })
  @ApiResponse({ status: 200, description: 'Achievement details retrieved' })
  async getAchievementDetails(@Param('id') id: string) {
    return await this.achievementsService.getAchievementDetails(id);
  }
}
