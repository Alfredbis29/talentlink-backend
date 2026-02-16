import { Controller, Get, Post, Body, Param, UseGuards, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('jobs')
@ApiBearerAuth()
@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  /**
   * Create a new job posting
   * @param createJobDto - Job creation details
   * @param user - Authenticated user (job client)
   * @returns Created job object
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createJobDto: CreateJobDto, @GetUser() user: User) {
    return this.jobsService.create(createJobDto, user);
  }

  /**
   * Get all available jobs
   * @returns Array of job objects
   */
  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'List of all jobs' })
  findAll() {
    return this.jobsService.findAll();
  }

  /**
   * Get a specific job by ID
   * @param id - Job UUID
   * @returns Job object
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiParam({ name: 'id', description: 'Job UUID', example: 'uuid-here' })
  @ApiResponse({ status: 200, description: 'Job found' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Job ID is required');
    }
    return this.jobsService.findOne(id);
  }

  /**
   * Assign a freelancer to a job
   * @param id - Job UUID
   * @param user - Authenticated user (freelancer)
   * @returns Updated job object
   */
  @Post(':id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign freelancer to job' })
  @ApiParam({ name: 'id', description: 'Job UUID' })
  @ApiResponse({ status: 200, description: 'Freelancer assigned' })
  @ApiResponse({ status: 403, description: 'Job not available for assignment' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  assignFreelancer(@Param('id') id: string, @GetUser() user: User) {
    if (!id) {
      throw new BadRequestException('Job ID is required');
    }
    return this.jobsService.assignFreelancer(id, user);
  }

  /**
   * Mark a job as completed
   * @param id - Job UUID
   * @param user - Authenticated user
   * @returns Updated job object
   */
  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark job as completed' })
  @ApiParam({ name: 'id', description: 'Job UUID' })
  @ApiResponse({ status: 200, description: 'Job completed' })
  @ApiResponse({ status: 403, description: 'Not authorized to complete job' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  completeJob(@Param('id') id: string, @GetUser() user: User) {
    if (!id) {
      throw new BadRequestException('Job ID is required');
    }
    return this.jobsService.completeJob(id, user);
  }
} 