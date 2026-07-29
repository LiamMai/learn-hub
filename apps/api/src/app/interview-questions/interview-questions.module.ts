import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewQuestionsService } from './interview-questions.service';
import { InterviewQuestionsController } from './interview-questions.controller';
import {
  InterviewQuestion,
  InterviewQuestionSchema,
} from './entities/interview-question.entity';
import { AuthGuard } from '../auth/auth.guard';
import { KeyTokenModule } from '../auth/key-token.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InterviewQuestion.name, schema: InterviewQuestionSchema },
    ]),
    KeyTokenModule,
  ],
  controllers: [InterviewQuestionsController],
  providers: [InterviewQuestionsService, AuthGuard],
})
export class InterviewQuestionsModule {}
