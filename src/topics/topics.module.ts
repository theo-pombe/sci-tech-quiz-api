import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), SubjectsModule],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TypeOrmModule, TopicsService],
})
export class TopicsModule {}
