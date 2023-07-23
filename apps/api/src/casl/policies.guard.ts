import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AppAbility, CaslFactory } from './casl.factory';
import { CHECK_POLICIES_KEY } from './check-policies.decorator';
import { PolicyHandler } from './policy-handlers';
import { AuthenService } from './authen.service';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private CaslFactory: CaslFactory,
    @Inject(AuthenService) private autherService: AuthenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const  req  = await context.switchToHttp().getRequest();
    const permissions = await this.autherService.findAllUserPermissions(req.user.roles[0].role)
    const ability = this.CaslFactory.createForUser(req.user, permissions);
    req.ability = ability;
    console.log(req.ability)
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability:AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
