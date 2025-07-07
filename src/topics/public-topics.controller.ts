import { Controller, Get, Param } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from './entities/topic.entity';

@Controller('topics')
export class PublicTopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async findAll(): Promise<Topic[]> {
    return this.topicsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Topic> {
    return this.topicsService.findOneBySlug(slug);
  }
}
