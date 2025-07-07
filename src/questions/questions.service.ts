import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Choice } from './entities/choice.entity';
import { SubtopicsService } from 'src/subtopics/subtopics.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateChoiceDto } from './dto/create-choice.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,

    @InjectRepository(Choice)
    private choiceRepo: Repository<Choice>,

    private subtopicService: SubtopicsService,
  ) {}

  async create(dto: CreateQuestionDto): Promise<Question> {
    const subtopic = await this.subtopicService.findOneById(dto.subtopicId);

    this.validateChoicesForQuestionType(dto.type, dto.choices);

    const question = this.questionRepo.create({
      ...dto,
      subtopic,
      choices:
        dto.type === 'MCQ'
          ? dto.choices!.map((choice) => this.choiceRepo.create(choice))
          : [],
    });

    return this.questionRepo.save(question);
  }

  async findAll(subtopicId?: number): Promise<Question[]> {
    const query = this.questionRepo
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.choices', 'choice')
      .leftJoinAndSelect('question.subtopic', 'subtopic');

    if (subtopicId) query.where('subtopic.id = :subtopicId', { subtopicId });

    return await query.getMany();
  }

  async findOneById(id: string): Promise<Question> {
    const question = await this.questionRepo.findOne({
      where: { id },
      relations: ['choices', 'subtopic'],
    });

    if (!question) throw new NotFoundException('Question not found');

    return question;
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionRepo.findOne({
      where: { id },
      relations: ['choices', 'subtopic'],
    });

    if (!question) throw new NotFoundException('Question not found');

    if (dto.subtopicId && dto.subtopicId !== question.subtopic.id) {
      const subtopic = await this.subtopicService.findOneById(dto.subtopicId);
      if (!subtopic) throw new NotFoundException('Subtopic not found');
      question.subtopic = subtopic;
    }

    // Update choices if type is MCQ
    if (dto.type === 'MCQ') {
      this.validateChoicesForQuestionType(dto.type, dto.choices);
    } else {
      question.choices = [];
    }

    Object.assign(question, dto);

    return this.questionRepo.save(question);
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOneById(id);
    await this.questionRepo.remove(question);
  }

  private validateChoicesForQuestionType(
    type: string,
    choices?: CreateChoiceDto[],
  ): void {
    if (type !== 'MCQ') {
      if (choices?.length) {
        throw new BadRequestException(
          'Choices can only be added for MCQ type questions',
        );
      }
      return;
    }

    if (!choices || choices.length < 2)
      throw new BadRequestException('MCQ must have at least 2 choices');

    const correctCount = choices.filter((c) => c.isCorrect).length;
    if (correctCount === 0)
      throw new BadRequestException('At least one choice must be correct');
  }
}
