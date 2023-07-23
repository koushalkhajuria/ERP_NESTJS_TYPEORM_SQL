import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PatchRolePermissionDto } from './dto/patch-role-permission.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Role Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createRoleDto: CreateRoleDto, @Request() req) {
    return this.rolesService.create(createRoleDto, req);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  @Post('role/permissions')
  @ApiResponse({ status: 201, description: 'Role Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  roleAssign(@Body() patchRolePermissionDto: PatchRolePermissionDto, @Request() req) {
    return this.rolesService.assignRolePermissions(patchRolePermissionDto, req);
  }

  @Get('permissions/:id')
  @ApiResponse({ status: 201, description: 'Permission Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getPermissionsByRole(@Param('id') id: string) {
    return this.rolesService.getPermissions(+id);
  }
}
