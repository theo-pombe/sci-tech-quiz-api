import { Subject } from 'src/subjects/entities/subject.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subject, (subject) => subject.topics, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  subject: Subject;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true, length: 100 })
  @Index('IDX_TOPIC_CODE')
  slug: string;
}
