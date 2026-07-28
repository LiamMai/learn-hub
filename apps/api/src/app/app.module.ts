import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicsModule } from './topics.module';
import { ConceptsModule } from './concepts.module';
import { ProjectsModule } from './projects.module';
import { InterviewQuestionsModule } from './interview-questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>(
          'MONGODB_URI',
          'mongodb://localhost:27017/learn-hub',
        ),
      }),
    }),
    TopicsModule,
    ConceptsModule,
    ProjectsModule,
    InterviewQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
