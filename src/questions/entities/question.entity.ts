import { Subtopic } from 'src/subtopics/entities/subtopic.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Choice } from './choice.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Subtopic, (subtopic) => subtopic.questions, {
    onDelete: 'CASCADE',
  })
  subtopic: Subtopic;

  @Column({ type: 'enum', enum: ['MCQ', 'TF', 'FILL'] })
  type: 'MCQ' | 'TF' | 'FILL';

  @Column()
  questionText: string;

  @Column()
  correctAnswer: string;

  @Column({ nullable: true })
  explanation?: string;

  @OneToMany(() => Choice, (choice) => choice.question, {
    cascade: true,
    eager: true, // auto-load choices when fetching question
  })
  choices: Choice[];
}
