import { ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../resources/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto';
import { User } from 'src/resources/users/entities/user.entity';
import { jwtConstants } from './auth.constants';
import { LoginDto } from './dto/login.dto';

const EXPIRE_TIME = 20 * 1000;


export interface IJwtPayload {
  email: string;
}

export interface IResponseWithToken {
  user: Omit<User, 'password'>,
  backendTokens: {
    accessToken: any,
    refreshToken: any,
    expiresIn: number
  }
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(dto: LoginDto): Promise<IResponseWithToken> {
    console.log('try signIn', dto)
    const user = await this.validateUser(dto);

    return this.generateResponseWithToken(user);
  }

  async register(user: CreateUserDto): Promise<IResponseWithToken> {
    const newUser: User = await this.usersService.create(user);
    if (!newUser) {
      throw new HttpException('Пользователь не создан', 400);
    }
    const token = this.generateResponseWithToken(newUser)
    if (!token) {
      throw new ForbiddenException('Не удалось создать токен');
    }
    return token
  }

  async validateUser(dto: LoginDto) {
    const user = dto.login.includes('@') ? await this.usersService.findByEmail(dto.login) : await this.usersService.findByLogin(dto.login);

    if (user && dto.password == user.password) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async generateResponseWithToken(user: Omit<User, 'password'>): Promise<IResponseWithToken> {
    const payload = { sub: user.id, login: user.login, role: user.role };
    return {
      user,
      backendTokens: {
      accessToken: await this.jwtService.signAsync(payload,{
        secret: jwtConstants.secret,
        expiresIn: '20m'
      }),
      refreshToken: await this.jwtService.signAsync(payload,{
        secret: jwtConstants.refreshSecret,
        expiresIn: '5h'
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    }};
  }

  async refreshToken(user:any){
    const token = this.generateResponseWithToken(user)
    if (!token) {
      throw new ForbiddenException('Не удалось создать токен');
    }
    return token
  }
}
