"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepepository, jwtService) {
        this.userRepepository = userRepepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            await this.userRepepository.insert({
                email: userData.email.toLowerCase().trim(),
                fullName: userData.fullName,
                password: bcrypt.hashSync(password, 10),
            });
            return { message: 'user created successfully' };
        }
        catch (error) {
            this.handlerError(error);
        }
    }
    async login(loginUserDto) {
        const { password, email } = loginUserDto;
        const user = await this.userRepepository.findOne({
            where: { email },
            select: { email: true, password: true, fullName: true, id: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: `No user was found with the email: ${email}`,
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException({
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
    handlerError(error) {
        if (error.code === '23505') {
            throw new common_1.BadRequestException(error.detail);
        }
        throw new common_1.InternalServerErrorException('Please check logs');
    }
    getJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map