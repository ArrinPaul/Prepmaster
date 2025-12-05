import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto, SubmitAnswerDto, InterviewQueryDto } from './dto/interview.dto';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@ApiTags('interviews')
@Controller('interviews')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 interviews per minute
  @ApiOperation({ summary: 'Create a new interview with AI-generated questions' })
  @ApiResponse({ status: 201, description: 'Interview created successfully' })
  async createInterview(@CurrentUser() user: any, @Body() dto: CreateInterviewDto) {
    return await this.interviewsService.createInterview(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all user interviews with pagination' })
  @ApiResponse({ status: 200, description: 'Interviews retrieved successfully' })
  async listInterviews(@CurrentUser() user: any, @Query() query: InterviewQueryDto) {
    return await this.interviewsService.listInterviews(user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get interview details' })
  @ApiResponse({ status: 200, description: 'Interview details retrieved' })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async getInterview(@Param('id') id: string, @CurrentUser() user: any) {
    return await this.interviewsService.getInterview(id, user.id);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Start interview session' })
  @ApiResponse({ status: 200, description: 'Interview started' })
  @HttpCode(HttpStatus.OK)
  async startInterview(@Param('id') id: string, @CurrentUser() user: any) {
    return await this.interviewsService.startInterview(id, user.id);
  }

  @Post(':id/questions/:questionId/answer')
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 answers per minute
  @ApiOperation({ summary: 'Submit answer to interview question' })
  @ApiResponse({ status: 200, description: 'Answer submitted successfully' })
  @HttpCode(HttpStatus.OK)
  async submitAnswer(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @CurrentUser() user: any,
    @Body() dto: SubmitAnswerDto,
  ) {
    return await this.interviewsService.submitAnswer(id, questionId, user.id, dto);
  }

  @Get(':id/report')
  @ApiOperation({ summary: 'Get comprehensive interview report' })
  @ApiResponse({ status: 200, description: 'Report retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Interview not completed' })
  async getInterviewReport(@Param('id') id: string, @CurrentUser() user: any) {
    return await this.interviewsService.getInterviewReport(id, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete interview' })
  @ApiResponse({ status: 200, description: 'Interview deleted successfully' })
  @HttpCode(HttpStatus.OK)
  async deleteInterview(@Param('id') id: string, @CurrentUser() user: any) {
    return await this.interviewsService.deleteInterview(id, user.id);
  }
}
