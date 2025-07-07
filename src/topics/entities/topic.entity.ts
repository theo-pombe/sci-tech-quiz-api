import { Subject } from 'src/subjects/entities/subject.entity';
import { Subtopic } from 'src/subtopics/entities/subtopic.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Subtopic, (subtopic) => subtopic.topic)
  subtopics: Topic[];
}
