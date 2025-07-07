import { Controller, Get, Param } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { Subtopic } from './entities/subtopic.entity';

@Controller('subtopics')
export class PublicSubtopicsController {
  constructor(private readonly subtopicsService: SubtopicsService) {}

  @Get()
  async findAll(): Promise<Subtopic[]> {
    return this.subtopicsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Subtopic> {
    return this.subtopicsService.findOneBySlug(slug);
  }
}
