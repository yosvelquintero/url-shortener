import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { METADATA } from '@app/config/index';
import { EUserRole, IAuthUserPartial, IRoles } from '@app/types/index';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const contextData: IRoles = this.getContextRoles(context);
    if (!contextData.roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: IAuthUserPartial = request.user;

    return contextData.roles.includes(user.role);
  }

  private getContextRoles(context: ExecutionContext): IRoles {
    return this.reflector
      .getAll<IRoles[]>(METADATA.keys.roles, [
        context.getClass(),
        context.getHandler(),
      ])
      .filter((rf) => !!rf)
      .reduce(
        (rf, c) => {
          rf.roles = [...new Set(rf.roles.concat(c.roles))];
          return rf;
        },
        { roles: [] },
      );
  }
}
