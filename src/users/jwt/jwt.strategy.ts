import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { UsersRepository } from '../users.repository';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // @InjectRepository(User)
        private readonly usersRepository: UsersRepository,
    ) {
        super({
            secretOrKey: 'topSecret55',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user: User = await this.usersRepository.findUserByUsername(username);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}