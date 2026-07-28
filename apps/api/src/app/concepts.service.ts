import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { Concept, ConceptDocument } from './entities/concept.entity';

@Injectable()
export class ConceptsService {
  constructor(
    @InjectModel(Concept.name)
    private readonly conceptModel: Model<ConceptDocument>,
  ) {}

  create(createConceptDto: CreateConceptDto) {
    return this.conceptModel.create(createConceptDto);
  }

  findAll(topicId?: string) {
    const filter = topicId ? { topicId } : {};
    return this.conceptModel.find(filter).exec();
  }

  async findOne(id: string) {
    const concept = await this.conceptModel.findById(id).exec();
    if (!concept) {
      throw new NotFoundException(`Concept ${id} not found`);
    }
    return concept;
  }

  async update(id: string, updateConceptDto: UpdateConceptDto) {
    const concept = await this.conceptModel
      .findByIdAndUpdate(id, updateConceptDto, { new: true })
      .exec();
    if (!concept) {
      throw new NotFoundException(`Concept ${id} not found`);
    }
    return concept;
  }

  async remove(id: string) {
    const concept = await this.conceptModel.findByIdAndDelete(id).exec();
    if (!concept) {
      throw new NotFoundException(`Concept ${id} not found`);
    }
    return concept;
  }
}
