import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '../entity/users-role.enum';
import { User } from '../entity/users.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    matchRoles(roles: Role[], userRole: string) {
        return roles.some((role) => role === userRole)
    }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),

        ]);


        if (!requiredRoles) {
            return false
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user
        return this.matchRoles(requiredRoles, user.role)

    }
}
