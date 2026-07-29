import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { Topic, TopicSchema } from './entities/topic.entity';
import { AuthGuard } from '../auth/auth.guard';
import { KeyTokenModule } from '../auth/key-token.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
    KeyTokenModule,
  ],
  controllers: [TopicsController],
  providers: [TopicsService, AuthGuard],
})
export class TopicsModule {}
