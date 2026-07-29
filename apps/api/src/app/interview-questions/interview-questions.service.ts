import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  create(
    createInterviewQuestionDto: CreateInterviewQuestionDto,
    ownerId: string,
  ) {
    return this.interviewQuestionModel.create({
      ...createInterviewQuestionDto,
      ownerId,
    });
  }

  findAll(conceptId: string | undefined, userId: string) {
    const filter = {
      ...(conceptId && { conceptId }),
      $or: [{ isPublic: true }, { ownerId: userId }],
    };
    return this.interviewQuestionModel.find(filter).exec();
  }

  async findOne(id: string) {
    const question = await this.interviewQuestionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException(`Interview question ${id} not found`);
    }
    return question;
  }

  private assertOwnerOrAdmin(
    question: InterviewQuestionDocument,
    userId: string,
    roles: string[],
  ) {
    const isOwner = question.ownerId.toString() === userId;
    const isAdmin = roles.includes('admin');
    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(
        'Only the owner or an admin can modify this question',
      );
    }
  }

  async update(
    id: string,
    updateInterviewQuestionDto: UpdateInterviewQuestionDto,
    userId: string,
    roles: string[],
  ) {
    const question = await this.interviewQuestionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException(`Interview question ${id} not found`);
    }
    this.assertOwnerOrAdmin(question, userId, roles);

    question.set(updateInterviewQuestionDto);
    return question.save();
  }

  async remove(id: string, userId: string, roles: string[]) {
    const question = await this.interviewQuestionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException(`Interview question ${id} not found`);
    }
    this.assertOwnerOrAdmin(question, userId, roles);

    await question.deleteOne();
    return question;
  }
}
