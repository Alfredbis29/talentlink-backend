import { IsNotEmpty, IsString, IsNumber, Min, MinLength, MaxLength, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Build a React Dashboard', minLength: 5, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Job title must be at least 5 characters' })
  @MaxLength(200, { message: 'Job title cannot exceed 200 characters' })
  title: string;

  @ApiProperty({ example: 'Need a responsive dashboard for sales analytics', minLength: 10, maxLength: 5000 })
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Job description must be at least 10 characters' })
  @MaxLength(5000, { message: 'Job description cannot exceed 5000 characters' })
  description: string;

  @ApiProperty({ example: 5000, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Budget must be a positive number' })
  @Min(1, { message: 'Budget must be at least 1' })
  budget: number;
} 