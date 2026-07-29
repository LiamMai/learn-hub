import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InterviewQuestionsService } from './interview-questions.service';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';
import { AuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth-request';

@Controller('interview-questions')
@UseGuards(AuthGuard)
export class InterviewQuestionsController {
  constructor(
    private readonly interviewQuestionsService: InterviewQuestionsService,
  ) {}

  @Post()
  create(
    @Body() createInterviewQuestionDto: CreateInterviewQuestionDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.interviewQuestionsService.create(
      createInterviewQuestionDto,
      request.user.userId,
    );
  }

  @Get()
  findAll(
    @Query('conceptId') conceptId: string | undefined,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.interviewQuestionsService.findAll(
      conceptId,
      request.user.userId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewQuestionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterviewQuestionDto: UpdateInterviewQuestionDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.interviewQuestionsService.update(
      id,
      updateInterviewQuestionDto,
      request.user.userId,
      request.user.roles,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.interviewQuestionsService.remove(
      id,
      request.user.userId,
      request.user.roles,
    );
  }
}
