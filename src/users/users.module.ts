import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: 'topSecret55',
    }),],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, JwtStrategy],
  exports: [UsersService, JwtStrategy, PassportModule],
})
export class UsersModule { }
