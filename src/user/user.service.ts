import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      password: await bcrypt.hash(
        createUserDto.password,
        await bcrypt.genSalt(12),
      ),
    };

    return await this.userRepo.save(newUser);
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async validateUser(loginDto: LoginDto) {
    console.log(loginDto);
    const user = await this.userRepo.findOneBy({ staff_id: loginDto.staff_id });
    console.log(user);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    console.log(user);
    if (!user) throw new BadRequestException('Invalid credentails');
    const token = this.jwtService.sign(user, {
      secret: process.env.SECRET,
    });

    return {
      access_token: token,
    };
  }
}
