import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class PublicQuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async findAll(@Query('subtopicId') subtopicId?: number) {
    const questions = await this.questionsService.findAll(subtopicId);

    return questions.map(({ correctAnswer, explanation, ...rest }) => rest);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const question = await this.questionsService.findOneById(id);

    if (!question) throw new NotFoundException('Question not found');

    const { correctAnswer, explanation, ...safeQuestion } = question;
    return safeQuestion;
  }
}
