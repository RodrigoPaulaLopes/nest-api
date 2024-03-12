import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check/user-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [PrismaModule, AuthModule, FileModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes(
      {
        path: '/users/:id',
        method: RequestMethod.GET,
      },
      {
        path: '/users/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: '/users/:id',
        method: RequestMethod.PATCH,
      });
  }
}
