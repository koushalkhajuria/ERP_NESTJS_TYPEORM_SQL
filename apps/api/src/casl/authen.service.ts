import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { RolePermissions } from "../roles/entities/role-permission.entity";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class AuthenService{
  constructor(
    private rolesService:RolesService,
  ){
  }

  async findAllUserPermissions(roleName: string){
  const rolePermission = await this.rolesService.findRolePermission(roleName)
  return(rolePermission)
  }
}