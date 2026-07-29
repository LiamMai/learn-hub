import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConceptsService } from './concepts.service';
import { ConceptsController } from './concepts.controller';
import { Concept, ConceptSchema } from './entities/concept.entity';
import { AuthGuard } from '../auth/auth.guard';
import { KeyTokenModule } from '../auth/key-token.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Concept.name, schema: ConceptSchema },
    ]),
    KeyTokenModule,
  ],
  controllers: [ConceptsController],
  providers: [ConceptsService, AuthGuard],
})
export class ConceptsModule {}
