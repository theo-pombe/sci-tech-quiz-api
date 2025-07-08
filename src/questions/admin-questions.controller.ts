import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/questions')
export class AdminQuestionController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() createDto: CreateQuestionDto): Promise<Question> {
    return this.questionsService.create(createDto);
  }

  @Get()
  async findAll(@Query('subtopicId') subtopicId?: number): Promise<Question[]> {
    return this.questionsService.findAll(subtopicId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Question> {
    const question = await this.questionsService.findOneById(id);
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.questionsService.remove(id);
  }
}
