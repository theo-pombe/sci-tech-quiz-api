import { Topic } from 'src/topics/entities/topic.entity';
import { EducationLevel } from 'src/users/entities/profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ length: 5, unique: true })
  code: string;

  @Column({ unique: true, length: 100 })
  @Index('IDX_SUBJECT_CODE')
  slug: string;

  @Column({
    type: 'enum',
    enum: EducationLevel,
    default: EducationLevel.OLEVEL,
  })
  level: EducationLevel;

  @OneToMany(() => Topic, (topic) => topic.subject)
  topics: Topic[];
}
