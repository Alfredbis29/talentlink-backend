import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from '../../modules/jobs/jobs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from '../../modules/jobs/entities/job.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('JobsService', () => {
  let service: JobsService;
  let repository: Repository<Job>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getRepositoryToken(Job),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    repository = module.get<Repository<Job>>(getRepositoryToken(Job));
  });

  describe('create', () => {
    it('should create a new job', async () => {
      const createJobDto = {
        title: 'Test Job',
        description: 'Test Description',
        budget: 100,
      };
      const client = { id: '1', email: 'test@test.com' };

      mockRepository.create.mockReturnValue({ ...createJobDto, client });
      mockRepository.save.mockResolvedValue({ id: '1', ...createJobDto, client });

      const result = await service.create(createJobDto, client as any);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe(createJobDto.title);
    });
  });
}); 