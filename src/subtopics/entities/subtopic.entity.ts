import { Topic } from 'src/topics/entities/topic.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subtopic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Topic, (topic) => topic.subtopics, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  topic: Topic;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true, length: 100 })
  @Index('IDX_SUBTOPIC_CODE')
  slug: string;
}
