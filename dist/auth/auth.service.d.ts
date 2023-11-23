import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepepository;
    private readonly jwtService;
    constructor(userRepepository: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        messages: string;
        token: string;
    }>;
    private handlerError;
    private getJwtToken;
}
