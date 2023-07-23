import { CreatePermissionDto } from "../../permissions/dto/create-permission.dto";
import { Permission } from "../../permissions/entities/permission.entity";

export class CreateRoleDto{
  id: number
  name: string;
  permissions: CreatePermissionDto[]
}