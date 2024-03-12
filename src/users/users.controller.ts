import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInterceptor } from 'src/interceptors/log/log.interceptor';
import { ParamId } from 'src/decorators/param-id/param-id.decorator';
import { AuthguardGuard } from 'src/guards/authguard/authguard.guard';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { write } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { FileService } from 'src/file/file.service';

@UseGuards(AuthguardGuard, AdminGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadService: FileService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  async upload_photo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const result = await this.uploadService.upload(photo);
    return result;
  }

  @UseInterceptors(LogInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
