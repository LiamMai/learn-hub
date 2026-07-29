import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic, TopicDocument } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name) private readonly topicModel: Model<TopicDocument>,
  ) {}

  create(createTopicDto: CreateTopicDto) {
    return this.topicModel.create(createTopicDto);
  }

  findAll() {
    return this.topicModel.find().exec();
  }

  async findOne(id: string) {
    const topic = await this.topicModel.findById(id).exec();
    if (!topic) {
      throw new NotFoundException(`Topic ${id} not found`);
    }
    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicModel
      .findByIdAndUpdate(id, updateTopicDto, { new: true })
      .exec();
    if (!topic) {
      throw new NotFoundException(`Topic ${id} not found`);
    }
    return topic;
  }

  async remove(id: string) {
    const topic = await this.topicModel.findByIdAndDelete(id).exec();
    if (!topic) {
      throw new NotFoundException(`Topic ${id} not found`);
    }
    return topic;
  }
}
