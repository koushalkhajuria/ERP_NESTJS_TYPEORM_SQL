import { BadRequestException,
  Injectable,
  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGenericMessageBody } from '@starter/api-types';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RolePermissions } from './entities/role-permission.entity';
import { PatchRolePermissionDto } from './dto/patch-role-permission.dto';
import { PermissionsService } from '../permissions/permissions.service';



@Injectable()
export class RolesService {
  /**
   * Constructor
   * @param {Repository<Roles>} roleRepository
   */
   constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(RolePermissions)
    private readonly rolePermissionsRepository: Repository<RolePermissions>,
    private permissionService: PermissionsService
    ) {}

  async create(createRoleDto: CreateRoleDto, req: any) {
    const {name, permissions} = createRoleDto
    const role = 
      this.roleRepository.create({
        name,
        /*bannerImage: url(createSubscriptionDto.image, {
          protocol: 'http',
          s: '200',
          r: 'pg',
          d: '404',
        }),*/
        createdBy: req.user ? req.user.id : 1,
        updatedBy: req.user ? req.user.id : 1

      });
       const createdPermission = await this.permissionService.create(permissions, req);
       role.permissions = createdPermission 
       const createdRole = await this.roleRepository.save(role);
       return createdRole
  }

  async findRolePermission(name: string){
    const roleData = await this.findByRole(name)
    const data =await this.rolePermissionsRepository.findBy({roleId : roleData[0].id})
    if (!data.length){
      throw new NotFoundException("No permissions assigned to this Role")
    }
    const permissions = []
    data.forEach((per)=> {
      permissions.push(per.permission)
    })
    return permissions;
  }
  

   async findByRole(name: string) : Promise<Role[]>{
    //return this.roleRepository.findOne({ where: { id }, relations: ['roles'] });
    const role = await this.roleRepository.findBy({name});
    if (!role.length){
      throw new NotFoundException('Roles assigned to user does not exist')
    }
    return role
  }





  findAll(): Promise<Role[]>{
    return this.roleRepository.find();
  }

  findOne(id: number) : Promise<Role>{
    //return this.roleRepository.findOne({ where: { id }, relations: ['roles'] });
    return this.roleRepository.findOne({ where: { id }});
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const subscription = await this.findOne(id);
    if (subscription) {
      Object.keys(updateRoleDto).forEach((key) => {
        subscription[key] = updateRoleDto[key];
      });
      return this.roleRepository.save(subscription);
    } else {
      throw new BadRequestException(
        'The user with that role does not exist in the system. Please try another role.',
      );
    }
  }

  async remove(id: number): Promise<IGenericMessageBody>  {
    const deleted = await this.roleRepository.delete({ id });
    if (deleted.affected === 1) {
      return { message: `Deleted ${id} from records` };
    } else {
      throw new BadRequestException(
        `Failed to delete a user by the name of ${id}.`,
      );
    }
  }

  /*async assignRolePermissions(patchRolePermissionDto: PatchRolePermissionDto, req: any) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA:',patchRolePermissionDto)
    return this.rolePermissions.save(
      this.rolePermissionsRepository.create({
        ...patchRolePermissionDto,
        createdBy: req.user ? req.user.id : 1,
        updatedBy: req.user ? req.user.id : 1

      }),
    );
  }*/

  async assignRolePermissions(patchRolePermissionDto: PatchRolePermissionDto, req: any): Promise<IGenericMessageBody> {
    console.log('patchRolePermissionDto-AAAAAAAAAAAAA:',patchRolePermissionDto);
    const role = await this.roleRepository.findOne({where: {id: patchRolePermissionDto.roleId}});
    if(!role){
    throw new NotFoundException()
    }
    /* You can check if course with given ID exists aswell here in the same way with RoleRepository */
    
    const queryResult = await this.rolePermissionsRepository.save(
      this.rolePermissionsRepository.create({
      ...patchRolePermissionDto,
      createdBy: req.user ? req.user.id : 1,
      updatedBy: req.user ? req.user.id : 1
      }),);

      if (queryResult) {
        return { message: `Role permission assigned successfully` };
      } else {
        throw new BadRequestException(
          `Failed to assign permission of roleId ${patchRolePermissionDto.roleId}.`,
        );
      }
    }

    getPermissions(id: number) : Promise<RolePermissions[]>{
      //return this.roleRepository.findOne({ where: { id }, relations: ['roles'] });
      return this.rolePermissionsRepository.find({ where: { roleId:id }});
    }
}

