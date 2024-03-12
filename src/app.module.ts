import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [ConfigModule.forRoot(), PostModule, AuthModule, UsersModule, FileModule],
  controllers: [],
  providers: [FileService],
})
export class AppModule {}
