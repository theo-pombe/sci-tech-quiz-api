import { Module } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtopic } from './entities/subtopic.entity';
import { TopicsModule } from 'src/topics/topics.module';
import { AdminSubtopicsController } from './admin-subtopics.controller';
import { PublicSubtopicsController } from './public-subtopics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subtopic]), TopicsModule],
  controllers: [AdminSubtopicsController, PublicSubtopicsController],
  providers: [SubtopicsService],
  exports: [TypeOrmModule, SubtopicsService],
})
export class SubtopicsModule {}
