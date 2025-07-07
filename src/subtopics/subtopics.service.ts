import { Injectable, NotFoundException } from '@nestjs/common';
import { TopicsService } from 'src/topics/topics.service';
import { Repository } from 'typeorm';
import { Subtopic } from './entities/subtopic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import slugify from 'slugify';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';

@Injectable()
export class SubtopicsService {
  constructor(
    @InjectRepository(Subtopic)
    private subtopicsRepo: Repository<Subtopic>,

    private topicsService: TopicsService,
  ) {}

  async create(dto: CreateSubtopicDto): Promise<Subtopic> {
    const topic = await this.topicsService.findOneById(dto.topicId);

    const slug = slugify(dto.name.trim(), { lower: true });

    const subtopic = this.subtopicsRepo.create({
      ...dto,
      slug,
      topic,
    });

    return await this.subtopicsRepo.save(subtopic);
  }

  async findAll(): Promise<Subtopic[]> {
    return await this.subtopicsRepo.find();
  }

  async findOneBySlug(slug: string): Promise<Subtopic> {
    const subtopic = await this.subtopicsRepo.findOneBy({ slug });
    if (!subtopic)
      throw new NotFoundException(`Subtopic with slug "${slug}" not found`);
    return subtopic;
  }

  async findOneById(id: string): Promise<Subtopic> {
    const subtopic = await this.subtopicsRepo.findOneBy({ id });
    if (!subtopic)
      throw new NotFoundException(`Subtopic with id "${id}" not found`);
    return subtopic;
  }

  async update(id: string, dto: UpdateSubtopicDto): Promise<Subtopic> {
    const subtopic = await this.findOneBySlug(id);

    if (dto.name && dto.name !== subtopic.name) {
      const name = dto.name.trim();
      subtopic.name = name;
      subtopic.slug = slugify(name, { lower: true });
    }

    if (dto.description !== undefined) subtopic.description = dto.description;

    if (dto.topicId) {
      const topic = await this.topicsService.findOneById(dto.topicId);
      subtopic.topic = topic;
    }

    return this.subtopicsRepo.save(subtopic);
  }

  async remove(slug: string): Promise<void> {
    const subtopic = await this.findOneBySlug(slug);
    await this.subtopicsRepo.remove(subtopic);
  }
}
