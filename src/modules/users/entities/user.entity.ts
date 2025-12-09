import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Job } from '../../jobs/entities/job.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Use text column instead of Postgres enum to support SQLite for local dev.
  // TypeScript enum validation is preserved while allowing multiple DB backends.
  @Column({ type: 'text', default: UserRole.FREELANCER })
  role: UserRole;

  @OneToMany(() => Job, job => job.client)
  postedJobs: Job[];

  @OneToMany(() => Job, job => job.freelancer)
  assignedJobs: Job[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];
} 