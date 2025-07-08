import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './entities/topic.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/topics')
export class AdminTopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  async create(@Body() createDto: CreateTopicDto): Promise<Topic> {
    return this.topicsService.create(createDto);
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateDto: UpdateTopicDto,
  ): Promise<Topic> {
    return this.topicsService.update(slug, updateDto);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<void> {
    return this.topicsService.remove(slug);
  }
}
