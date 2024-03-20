import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotDto } from './dto/forgot.dto';
import { ResetDto } from './dto/reset.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly service: JwtService,
    private readonly database: PrismaService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.database.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new UnauthorizedException('email or password invalid');

    if (!(await compare(password, user.password)))
      throw new UnauthorizedException('email or password invalid');

    return this.createToken(user);
  }
  async reset({ password, token }: ResetDto) {
    // validar token

    const id = 0;

    const user = await this.database.user.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });

    return this.createToken(user);
  }

  async forgot({ email }: ForgotDto) {
    this.verifyIfEmailNotExists(email);
    return true;
  }

  async register({ confirm_password, email, name, password }: RegisterDto) {
    this.verifyIfEmailExists(email);

    this.verifyIfPasswordIsEqual(password, confirm_password);

    const hash_pass = await hash(password, 10);
    const user = await this.database.user.create({
      data: {
        name: name,
        email: email,
        password: hash_pass,
        role: Roles.USER,
      },
    });

    return this.createToken(user);
  }

  createToken(user: User) {
    return {
      token: this.service.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'API Nest Post',
        },
      ),
    };
  }

  verifyToken(token: string) {
    try {
      this.service.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  isValidToken(token: string) {
    try {
      this.service.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  currentUser(token: string) {
    try {
      const user = this.service.verify(token);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async verifyIfEmailExists(email: string) {
    const user = await this.database.user.findUnique({
      where: { email: email },
    });
    console.log(user);
    if (user) {
      throw new UnauthorizedException('This email already registered');
    }
  }
  verifyIfEmailNotExists(email: string) {
    const exists = this.database.user.findUnique({
      where: { email: email },
    });
    if (!exists) {
      throw new UnauthorizedException('The email is incorrect');
    }
  }

  verifyIfPasswordIsEqual(password: string, confirm_password: string) {
    if (password !== confirm_password) {
      throw new BadRequestException(
        'The password is diferent of confirm password',
      );
    }
  }

  async hasRoleAdmin(id: number) {
    const user = await this.database.user.findUnique({ where: { id: id } });

    if (user.role !== 'ADMIN') {
      return false;
    }

    return true;
  }
}
