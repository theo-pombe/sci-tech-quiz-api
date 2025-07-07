import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { AdminTopicsController } from './admin-topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { PublicTopicsController } from './public-topics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), SubjectsModule],
  controllers: [AdminTopicsController, PublicTopicsController],
  providers: [TopicsService],
  exports: [TypeOrmModule, TopicsService],
})
export class TopicsModule {}
