// import {
//   Ability,
//   AbilityBuilder,
//   AbilityClass,
//   ExtractSubjectType,
//   InferSubjects,
// } from '@casl/ability';
// import { Injectable } from '@nestjs/common';

// import { UserActionsEnum, UserRolesEnum } from '@starter/api-types';

// import { User } from '../users/user.entity';

// // Creating CASL subjects to manage. Remark: all is a special keyword in CASL that represents "any subject".
// type Subjects = InferSubjects<typeof User> | 'all';

// export type AppAbility = Ability<[UserActionsEnum, Subjects]>;

// @Injectable()
// export class CaslFactory {
//   createForUser(user: User) {
//     // Remark: the user is coming from the req.user.
//     const { can, build } = new AbilityBuilder<
//       Ability<[UserActionsEnum, Subjects]>
//     >(Ability as AbilityClass<AppAbility>);

//     if (user.roles.some(({ role }) => role === UserRolesEnum.SUDO)) {
//       can(UserActionsEnum.Manage, 'all'); // read-write access to everything
//     } else {
//       can(UserActionsEnum.Read, 'all'); // read-only access to everything
//     }

//     can(UserActionsEnum.Update, User, { username: user.username }); // update own user

//     return build({
//       // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
//       detectSubjectType: (item) =>
//         item.constructor as ExtractSubjectType<Subjects>,
//     });
//   }
// }







import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { UserActionsEnum, UserRolesEnum } from '@starter/api-types';

import { User } from '../users/user.entity';
import { CreatePermissionDto } from '../permissions/dto/create-permission.dto';
import { AttendanceController } from '../attendance/attendance.controller';
import { MonthDetails } from '../attendance/entities/month_details_entity';
import { Month } from '../attendance/entities/attendance.entity';

// Creating CASL subjects to manage. Remark: all is a special keyword in CASL that represents "any subject".
type Subjects = InferSubjects<typeof Month | "Attendence" > | 'all';

export type AppAbility = Ability<[UserActionsEnum, Subjects]>;

@Injectable()
export class CaslFactory {
  createForUser(user:User, permission: CreatePermissionDto[]) {
    const { can, build } =  new AbilityBuilder<AppAbility>(Ability)

    permission.forEach((item) => {
      // const parsedConditions = parseCondition(item.conditions, { jwtToken });
      can(item.action, item.subject);
      console.log(user.id)
    });
    can(UserActionsEnum.Update, Month, {userId: user.id});
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
