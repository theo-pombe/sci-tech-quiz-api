import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ length: 5 })
  code: string;

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column({ type: 'enum', enum: SubjectLevel })
  level: string; // e.g., 'o-level', 'a-level'
}
