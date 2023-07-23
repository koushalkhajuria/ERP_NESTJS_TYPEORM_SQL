import { UserActionsEnum, UserRolesEnum } from "@starter/api-types";
import { BaseEntity } from "../../common/base-entity";

export class CreatePermissionDto extends BaseEntity {
  
  id: number

  action: string;
  
  subject: string;

  inverted?: boolean;

  fields?: string;

  condition?: string;
  
   isActive?: boolean;

}
