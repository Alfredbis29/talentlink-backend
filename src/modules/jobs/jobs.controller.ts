import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('jobs')
@ApiBearerAuth()
@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto, @GetUser() user: User) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Post(':id/assign')
  assignFreelancer(@Param('id') id: string, @GetUser() user: User) {
    return this.jobsService.assignFreelancer(id, user);
  }

  @Post(':id/complete')
  completeJob(@Param('id') id: string, @GetUser() user: User) {
    return this.jobsService.completeJob(id, user);
  }
} 