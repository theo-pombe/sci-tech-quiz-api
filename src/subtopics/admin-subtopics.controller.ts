import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { Subtopic } from './entities/subtopic.entity';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/subtopics')
export class AdminSubtopicsController {
  constructor(private readonly subtopicsService: SubtopicsService) {}

  @Post()
  async create(@Body() createDto: CreateSubtopicDto): Promise<Subtopic> {
    return this.subtopicsService.create(createDto);
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateDto: UpdateSubtopicDto,
  ): Promise<Subtopic> {
    return this.subtopicsService.update(slug, updateDto);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<void> {
    return this.subtopicsService.remove(slug);
  }
}
