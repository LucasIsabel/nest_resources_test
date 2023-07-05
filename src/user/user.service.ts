import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';

type UserResponse = Partial<User>;

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<UserResponse[]> {
    const data = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    return data;
  }

  async createUser(user: CreateUserDTO): Promise<UserResponse> {
    const data = await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return data;
  }

  async getUserById(id: number): Promise<UserResponse> {
    return await this.prismaService.user.findFirst({
      where: {
        id: { equals: id },
      },
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }

  async updateUser(id, user) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
      select: {
        id: true,
      },
    });
  }

  async deleteUser(id) {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
