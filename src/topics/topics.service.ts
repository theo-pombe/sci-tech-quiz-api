import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { Topic } from './entities/topic.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepo: Repository<Topic>,

    private subjectService: SubjectsService,
  ) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const subject = await this.subjectService.findOneById(
      createTopicDto.subjectId,
    );

    const slug = slugify(createTopicDto.name.trim(), { lower: true });

    const topic = this.topicsRepo.create({
      ...createTopicDto,
      slug,
      subject,
    });

    return await this.topicsRepo.save(topic);
  }

  async findAll(): Promise<Topic[]> {
    return await this.topicsRepo.find();
  }

  async findOneBySlug(slug: string): Promise<Topic> {
    const topic = await this.topicsRepo.findOneBy({ slug });
    if (!topic)
      throw new NotFoundException(`Topic with slug "${slug}" not found`);
    return topic;
  }

  async findOneById(id: number): Promise<Topic> {
    const topic = await this.topicsRepo.findOneBy({ id });
    if (!topic) throw new NotFoundException(`Topic with id "${id}" not found`);
    return topic;
  }

  async update(id: string, dto: UpdateTopicDto): Promise<Topic> {
    const topic = await this.findOneBySlug(id);

    if (dto.name && dto.name !== topic.name) {
      const name = dto.name.trim();
      topic.name = name;
      topic.slug = slugify(name, { lower: true });
    }

    if (dto.description !== undefined) topic.description = dto.description;

    if (dto.subjectId) {
      const subject = await this.subjectService.findOneById(dto.subjectId);
      topic.subject = subject;
    }

    return this.topicsRepo.save(topic);
  }

  async remove(slug: string): Promise<void> {
    const topic = await this.findOneBySlug(slug);
    await this.topicsRepo.remove(topic);
  }
}
