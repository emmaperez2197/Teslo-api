import { Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interface/jwt-payload.interface';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    validate(payload: IJwtPayload): Promise<User>;
}
export {};
