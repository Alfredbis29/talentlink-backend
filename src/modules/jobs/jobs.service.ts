import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
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

  /**
   * Create a new job posting
   * @param createJobDto - Job creation details
   * @param client - User who is posting the job
   * @returns Created job object
   */
  async create(createJobDto: CreateJobDto, client: User): Promise<Job> {
    if (!client || !client.id) {
      throw new BadRequestException('User must be authenticated to create a job');
    }

    const job = this.jobRepository.create({
      ...createJobDto,
      client,
      status: JobStatus.OPEN,
    });
    return await this.jobRepository.save(job);
  }

  /**
   * Get all jobs with client and freelancer details
   * @returns Array of all jobs
   */
  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find({
      relations: ['client', 'freelancer'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get a specific job by ID
   * @param id - Job UUID
   * @returns Job object
   * @throws NotFoundException if job doesn't exist
   */
  async findOne(id: string): Promise<Job> {
    if (!id) {
      throw new BadRequestException('Job ID is required');
    }

    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['client', 'freelancer'],
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  /**
   * Assign a freelancer to an open job
   * @param jobId - Job UUID
   * @param freelancer - User who is accepting the job
   * @returns Updated job object
   * @throws NotFoundException if job doesn't exist
   * @throws ForbiddenException if job is not open
   */
  async assignFreelancer(jobId: string, freelancer: User): Promise<Job> {
    if (!freelancer || !freelancer.id) {
      throw new BadRequestException('User must be authenticated to accept a job');
    }

    const job = await this.findOne(jobId);
    if (job.status !== JobStatus.OPEN) {
      throw new ForbiddenException(`Job is not available for assignment. Current status: ${job.status}`);
    }
    
    job.freelancer = freelancer;
    job.status = JobStatus.IN_PROGRESS;
    job.updatedAt = new Date();
    return await this.jobRepository.save(job);
  }

  /**
   * Mark a job as completed
   * @param jobId - Job UUID
   * @param user - Authenticated user (must be the job client)
   * @returns Updated job object
   * @throws NotFoundException if job doesn't exist
   * @throws ForbiddenException if user is not the job client
   */
  async completeJob(jobId: string, user: User): Promise<Job> {
    if (!user || !user.id) {
      throw new BadRequestException('User must be authenticated to complete a job');
    }

    const job = await this.findOne(jobId);
    if (job.client.id !== user.id) {
      throw new ForbiddenException('Only the job client can mark the job as completed');
    }

    if (job.status === JobStatus.COMPLETED) {
      throw new BadRequestException('Job is already completed');
    }

    job.status = JobStatus.COMPLETED;
    job.completedAt = new Date();
    job.updatedAt = new Date();
    return await this.jobRepository.save(job);
  }
} 