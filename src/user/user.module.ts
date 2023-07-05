import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from './user.service';
import { UserIdCheckMiddleware } from 'src/midlewares/user-id-check.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
