import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { PublicQuestionsController } from './public-questions.controller';
import { AdminQuestionController } from './admin-questions.controller';
import { SubtopicsModule } from 'src/subtopics/subtopics.module';
import { Choice } from './entities/choice.entity';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Choice]), SubtopicsModule],
  controllers: [PublicQuestionsController, AdminQuestionController],
  providers: [QuestionsService],
  exports: [TypeOrmModule, QuestionsService],
})
export class QuestionsModule {}
