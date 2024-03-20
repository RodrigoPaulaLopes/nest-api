import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDto) {
    await this.existsEmail(email);

    const hash_pass = await hash(password, 10);
    return await this.prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hash_pass,
        role: Roles.ADMIN
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    this.exists(id);
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async update({ id, email, name, password }: UpdateUserDto) {
    this.exists(id);

    const hash_pass = await hash(password, 10);
    return await this.prisma.user.update({
      data: {
        email: email,
        name: name,
        password: hash_pass,
      },
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return await this.prisma.user.delete({ where: { id: id } });
  }

  async exists(id: number) {
    if (!(await this.prisma.user.count({ where: { id: id } }))) {
      throw new NotFoundException('User not found');
    }
  }
  async existsEmail(email: string) {
    if (await this.prisma.user.findUnique({ where: { email: email } })) {
      throw new BadRequestException('User with this email already registered.');
    }
  }
}
