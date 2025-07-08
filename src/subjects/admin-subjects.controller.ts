import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/subjects')
export class AdminSubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(@Body() createDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.create(createDto);
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectsService.update(slug, updateDto);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<void> {
    return this.subjectsService.remove(slug);
  }
}
