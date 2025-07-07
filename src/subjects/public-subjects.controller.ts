import { Controller, Get, Param } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';

@Controller('subjects')
export class PublicSubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Subject> {
    return this.subjectsService.findOneBySlug(slug);
  }
}
