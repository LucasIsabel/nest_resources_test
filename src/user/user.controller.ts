import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';
import { updateUserPatchDTO } from './dto/update-patch-user.dto';
import { User } from '@prisma/client';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { NewInterceptor } from 'src/interceptors/new.interceptor';

type UserResponse = Partial<User>;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
  @Get()
  async getUsers(@Res() res): Promise<UserResponse[]> {
    console.log('entrou');

    const users = await this.userService.getUsers();

    if (users.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).send(users);
  }

  @Post()
  createUser(@Body() body: CreateUserDTO): Promise<UserResponse> {
    return this.userService.createUser(body);
  }

  @UseInterceptors(NewInterceptor)
  @Get(':id')
  getParam(
    @Param('id', ParseIntPipe) id,
    @Headers() headers,
  ): Promise<UserResponse> {
    console.log(headers);

    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id, @Body() user: updateUserDTO) {
    return this.userService.updateUser(id, user);
  }

  @Patch(':id')
  updateUserData(
    @Param('id', ParseIntPipe) id,
    @Body() user: updateUserPatchDTO,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
