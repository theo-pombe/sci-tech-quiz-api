import { Topic } from 'src/topics/entities/topic.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';

export enum SubjectLevel {
  O_LEVEL = 'o-level',
  A_LEVEL = 'a-level',
}

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ length: 5, unique: true })
  code: string;

  @Column({ unique: true, length: 100 })
  @Index('IDX_SUBJECT_CODE')
  slug: string;

  @Column({ type: 'enum', enum: SubjectLevel })
  level: SubjectLevel;

  @OneToMany(() => Topic, (topic) => topic.subject)
  topics: Topic[];
}
