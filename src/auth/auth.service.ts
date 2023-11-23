import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
// import { UpdateAuthDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      await this.userRepepository.insert({
        email: userData.email.toLowerCase().trim(),
        fullName: userData.fullName,
        password: bcrypt.hashSync(password, 10),
      });

      return { message: 'user created successfully' };
    } catch (error) {
      this.handlerError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepepository.findOne({
      where: { email },
      select: { email: true, password: true, fullName: true, id: true },
    });

    if (!user) {
      throw new UnauthorizedException({
        message: `No user was found with the email: ${email}`,
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({
        message: `Incorrect password`,
      });
    }

    return {
      messages: `Welcome ${user.fullName}`,
      token: this.getJwtToken({
        email: user.email,
        fullName: user.fullName,
        id: user.id,
      }),
    };
  }

  private handlerError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check logs');
  }

  private getJwtToken(payload: IJwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }
}
