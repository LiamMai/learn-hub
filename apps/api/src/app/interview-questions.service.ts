import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInterviewQuestionDto } from './dto/create-interview-question.dto';
import { UpdateInterviewQuestionDto } from './dto/update-interview-question.dto';
import {
  InterviewQuestion,
  InterviewQuestionDocument,
} from './entities/interview-question.entity';

@Injectable()
export class InterviewQuestionsService {
  constructor(
    @InjectModel(InterviewQuestion.name)
    private readonly interviewQuestionModel: Model<InterviewQuestionDocument>,
  ) {}

  create(createInterviewQuestionDto: CreateInterviewQuestionDto) {
    return this.interviewQuestionModel.create(createInterviewQuestionDto);
  }

  findAll(conceptId?: string) {
    const filter = conceptId ? { conceptId } : {};
    return this.interviewQuestionModel.find(filter).exec();
  }

  async findOne(id: string) {
    const question = await this.interviewQuestionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException(`Interview question ${id} not found`);
    }
    return question;
  }

  async update(
    id: string,
    updateInterviewQuestionDto: UpdateInterviewQuestionDto,
  ) {
    const question = await this.interviewQuestionModel
      .findByIdAndUpdate(id, updateInterviewQuestionDto, { new: true })
      .exec();
    if (!question) {
      throw new NotFoundException(`Interview question ${id} not found`);
    }
    return question;
  }

  async remove(id: string) {
    const question = await this.interviewQuestionModel
      .findByIdAndDelete(id)
      .exec();
    if (!question) {
      throw new NotFoundException(`Interview question ${id} not found`);
    }
    return question;
  }
}
