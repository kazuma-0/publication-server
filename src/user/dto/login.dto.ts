import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  staff_id: string;
  @IsString()
  password: string;
}
