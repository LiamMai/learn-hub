import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewQuestionsService } from './interview-questions.service';
import { InterviewQuestionsController } from './interview-questions.controller';
import {
  InterviewQuestion,
  InterviewQuestionSchema,
} from './entities/interview-question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InterviewQuestion.name, schema: InterviewQuestionSchema },
    ]),
  ],
  controllers: [InterviewQuestionsController],
  providers: [InterviewQuestionsService],
})
export class InterviewQuestionsModule {}
