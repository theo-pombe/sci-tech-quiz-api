import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, (question) => question.choices, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @Column()
  text: string;

  @Column()
  isCorrect: boolean;
}
