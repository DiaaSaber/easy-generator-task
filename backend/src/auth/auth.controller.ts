import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  async signup(@Body() body: SignUpDto) {
    const { name, email, password } = body;
    return this.authService.signup(name, email, password);
  }

  @Post('signin')
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'User successfully signed in.' })
  async signin(@Body() body: SignInDto) {
    const { email, password } = body;
    return this.authService.signin(email, password);
  }
}
