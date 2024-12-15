import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto';
import { JWTRefreshGuard } from './guards/refresh.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginDto
  })
  @ApiOperation({ summary: 'Login', description: 'method for sign in by login and password' })
  @Post('login')
  //TODO: rename
  signIn(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiBody({
    type: CreateUserDto
  })
  @ApiOperation({ summary: 'Register', description: 'method for sign up by login, email and password' })
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Refresh token', description: 'method for refresh token' })
  @UseGuards(JWTRefreshGuard)
  @ApiBearerAuth('refresh')
  @Post('refresh')
  refresh(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}