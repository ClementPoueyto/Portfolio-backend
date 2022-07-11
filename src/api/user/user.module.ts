import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { UserService } from './user.services';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule,
  PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],

})
export class UserModule {}