import { IsEnum, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { Department, User } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  staff_id: string;
  @IsString()
  password: string;
  @IsString()
  email: string;
  @IsString()
  scopus_id: string;
  @IsString()
  google_scholar_id: string;
  @IsString()
  clarivate_id: string;
  @IsString()
  active: true;
  @IsEnum(Department)
  department: Department;
}
