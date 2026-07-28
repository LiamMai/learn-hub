import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InterviewQuestionsService } from './interview-questions.service';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';

@Controller('interview-questions')
export class InterviewQuestionsController {
  constructor(
    private readonly interviewQuestionsService: InterviewQuestionsService,
  ) {}

  @Post()
  create(@Body() createInterviewQuestionDto: CreateInterviewQuestionDto) {
    return this.interviewQuestionsService.create(createInterviewQuestionDto);
  }

  @Get()
  findAll(@Query('conceptId') conceptId?: string) {
    return this.interviewQuestionsService.findAll(conceptId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewQuestionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterviewQuestionDto: UpdateInterviewQuestionDto,
  ) {
    return this.interviewQuestionsService.update(
      id,
      updateInterviewQuestionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewQuestionsService.remove(id);
  }
}
