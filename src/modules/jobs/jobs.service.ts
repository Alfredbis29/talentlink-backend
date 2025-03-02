import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobStatus } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto, client: User): Promise<Job> {
    const job = this.jobRepository.create({
      ...createJobDto,
      client,
    });
    return await this.jobRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find({
      relations: ['client', 'freelancer'],
    });
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['client', 'freelancer'],
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async assignFreelancer(jobId: string, freelancer: User): Promise<Job> {
    const job = await this.findOne(jobId);
    if (job.status !== JobStatus.OPEN) {
      throw new ForbiddenException('Job is not open for assignment');
    }
    
    job.freelancer = freelancer;
    job.status = JobStatus.IN_PROGRESS;
    return await this.jobRepository.save(job);
  }

  async completeJob(jobId: string, user: User): Promise<Job> {
    const job = await this.findOne(jobId);
    if (job.client.id !== user.id) {
      throw new ForbiddenException('Only the client can complete the job');
    }
    
    job.status = JobStatus.COMPLETED;
    return await this.jobRepository.save(job);
  }
} 