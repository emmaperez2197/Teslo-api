import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto/index';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        messages: string;
        token: string;
    }>;
    testPrivateRoute(user: User, email: string, rawHeaders: string[]): {
        messasges: string;
        user: User;
        email: string;
        rawHeaders: string[];
    };
    test2(user: User): {
        messasges: string;
        user: User;
    };
}
