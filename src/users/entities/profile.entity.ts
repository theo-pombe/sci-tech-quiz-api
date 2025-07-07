import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entities';

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export enum EducationLevel {
  OLEVEL = 'o-level',
  ALEVEL = 'a-level',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ nullable: true })
  schoolName?: string;

  @Column({ nullable: true })
  region?: string;

  @Column({ nullable: true })
  district?: string;

  @Column({
    type: 'enum',
    enum: EducationLevel,
    default: EducationLevel.OLEVEL,
  })
  levelOfEducation: EducationLevel;
}
