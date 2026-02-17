import { IsEmail, IsString, IsEnum, MinLength, MaxLength, IsNotEmpty, Match } from 'class-validator';
import { UserRole } from '../../users/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { MatchPassword } from '../../users/decorators/match-password.decorator';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100)
  password: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @IsNotEmpty()
  @MatchPassword('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @ApiProperty({ enum: UserRole, example: UserRole.FREELANCER })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
} 