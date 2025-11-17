import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum JobStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  budget: number;

  // Use a text column for status so the schema works across SQLite and Postgres.
  // Postgres enums are nicer, but SQLite doesn't support enum types — this keeps
  // local development simple while preserving the TypeScript enum.
  @Column({ type: 'text', default: JobStatus.OPEN })
  status: JobStatus;

  @ManyToOne(() => User, user => user.postedJobs)
  client: User;

  @ManyToOne(() => User, user => user.assignedJobs, { nullable: true })
  freelancer: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 