import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async create(dto: CreateSubjectDto) {
    const slug = slugify(dto.name, { lower: true });

    const subject = this.subjectRepo.create({
      ...dto,
      slug,
    });

    return await this.subjectRepo.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectRepo.find();
  }

  async findOne(slug: string): Promise<Subject> {
    const subject = await this.subjectRepo.findOneBy({ slug });
    if (!subject) {
      throw new NotFoundException(`Subject with slug "${slug}" not found`);
    }
    return subject;
  }

  async update(slug: string, dto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(slug);

    // Only regenerate slug if name has changed
    if (dto.name && dto.name !== subject.name)
      subject.slug = slugify(dto.name, { lower: true });

    Object.assign(subject, dto);

    return await this.subjectRepo.save(subject);
  }

  async remove(slug: string): Promise<void> {
    const subject = await this.subjectRepo.findOneBy({ slug });

    if (!subject) {
      throw new NotFoundException(`Subject with slug "${slug}" not found`);
    }

    await this.subjectRepo.remove(subject);
  }
}
