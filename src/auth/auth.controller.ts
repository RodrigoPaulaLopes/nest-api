import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ForgotDto } from './dto/forgot.dto';
import { ResetDto } from './dto/reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService, ) {}
  @Post('login')
  async login(@Body() login: LoginDto) {
    return this.service.login(login);
  }

  @Post('register')
  async register(@Body() register: RegisterDto) {
    return this.service.register(register);
  }


  @Post('forgot')
  async forgot(@Body() forgot: ForgotDto){
    return this.service.forgot(forgot);
  }

  @Post('reset')
  async reset(@Body() reset: ResetDto){
    return this.service.reset(reset);
  }

}
