import { Global, Module } from '@nestjs/common';

import { CaslFactory } from './casl.factory';
import { AuthenService } from './authen.service';
import { RolesModule } from '../roles/roles.module';
import { PoliciesGuard } from './policies.guard';
import { PermissionsModule } from '../permissions/permissions.module';

@Global()
@Module({
  imports: [RolesModule],
  providers: [CaslFactory, AuthenService],
  exports: [CaslFactory, AuthenService],
})
export class CaslModule {}
