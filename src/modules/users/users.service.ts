import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user account
   * @param registerDto - User registration data
   * @returns Created user object
   * @throws ConflictException if email already exists
   * @throws BadRequestException if input is invalid
   */
  async create(registerDto: RegisterDto): Promise<User> {
    if (!registerDto || !registerDto.email) {
      throw new BadRequestException('Email is required');
    }

    // Check for existing user
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = this.usersRepository.create(registerDto);
    return await this.usersRepository.save(user);
  }

  /**
   * Find user by email address
   * @param email - User email
   * @returns User object or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return await this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Find user by ID
   * @param id - User UUID
   * @returns User object
   * @throws NotFoundException if user doesn't exist
   */
  async findById(id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
} 