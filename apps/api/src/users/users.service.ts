import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { url } from 'gravatar';
import { Repository } from 'typeorm';

import { IGenericMessageBody } from '@starter/api-types';

import { RegisterDto } from '../auth/dto/register.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserRoles } from './user-role.entity';
import { PatchRolePermissionDto } from '../roles/dto/patch-role-permission.dto';
import { User } from './user.entity';
import { PatchUserSubRoleDto } from './dto/patch-user-subscription-role.dto';
import { Role } from '../roles/entities/role.entity';
import { Subscription } from '../subscription/entities/subscription.entity';
import { UserSubRoles } from './user-subcription.role.entity';
import { updateUserRoleDto } from './dto/update-user-role.dto';

/**
 * Users Service
 */
@Injectable()
export class UsersService {
  /**
   * Constructor
   * @param {Repository<User>} userRepository
   * @param {Repository<UserRoles>} userRoleRepository
   *  * @param {Repository<Role>} roleRepository
   * * @param {Repository<Subscription>} subRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(UserRoles)
    private readonly userRoleRepository: Repository<UserRoles>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Subscription)
    private readonly subRepository: Repository<Subscription>,

    @InjectRepository(UserSubRoles)
    private readonly userSubRolesRepository: Repository<UserSubRoles>,
  ) {}

  /**
   * Fetches users from database by lte<role id>
   * @param {number} lte
   * @returns {Promise<User[]>} data from queried users
   */
   getAll(lte: number): Promise<User[]> {
    return this.userRepository.find();
  }


  /**
   * Fetches user from database by UUID
   * @param {number} id
   * @returns {Promise<User>} data from queried user
   */
  get(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  /**
   * Fetches user from database by username
   * @param {string} username
   * @returns {Promise<User>} data from queried user
   */
  getByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  /**
   * Fetches user from database by username
   * @param {string} username
   * @returns {Promise<User>} data from queried user
   */
   getByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  /**
   * Fetches user by username and hashed password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<User>} data from queried user
   */
  getByUsernameAndPass(username: string, password: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.username = :username and users.password = :password')
      .setParameter('username', username)
      .setParameter(
        'password',
        crypto.createHmac('sha256', password).digest('hex'),
      )
      .getOne();
  }

  /**
   * Create a user with RegisterPayload fields
   * @param {RegisterDto} payload user payload
   * @returns {Promise<User>} data from the created user
   */
  async create(payload: RegisterDto): Promise<User> {
    const user = await this.getByUsername(payload.username);

    if (user) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }

    // Remark: Default role is set to sudo
    const roles: UserRoles[] = [new UserRoles()];
    await this.userRoleRepository.save(roles);

    return this.userRepository.save(
      this.userRepository.create({
        ...payload,
        roles,
        profileImage: url(payload.email, {
          protocol: 'http',
          s: '200',
          r: 'pg',
          d: '404',
        }),
        createdBy: 'admin'
      }),
    );
  }

  /**
   * Edit user data
   * @param {PatchUserDto} payload
   * @returns {Promise<User>} mutated user data
   */
  async edit(payload: PatchUserDto): Promise<User> {
    const { username } = payload;
    const user = await this.getByUsername(username);
    if (user) {
      Object.keys(payload).forEach((key) => {
        if (key === 'password') {
          key = crypto.createHmac('sha256', key).digest('hex');
        }
        user[key] = payload[key];
      });
      return this.userRepository.save(user);
    } else {
      throw new BadRequestException(
        'The user with that username does not exist in the system. Please try another username.',
      );
    }
  }

  /**
   * Delete user given a username
   * @param {string} username
   * @returns {Promise<IGenericMessageBody>} whether or not the delete operation was completed
   */
  async delete(username: string): Promise<IGenericMessageBody> {
    const deleted = await this.userRepository.delete({ username });
    if (deleted.affected === 1) {
      return { message: `Deleted ${username} from records` };
    } else {
      throw new BadRequestException(
        `Failed to delete a user by the name of ${username}.`,
      );
    }
  }

  /**
   * Create a user with RegisterPayload fields
   * @param {RegisterDto} payload user payload
   * @returns {Promise<User>} data from the created user
   */
   async createByAdmin(payload: RegisterDto, req: any): Promise<User> {
    const user = await this.getByUsername(payload.username);
    const userId = req.user.id;

    if (user) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }

    // Remark: Default role is set to sudo
    const roles: UserRoles[] = [new UserRoles()];
    await this.userRoleRepository.save(roles);

    return this.userRepository.save(
      this.userRepository.create({
        ...payload,
        roles,
        profileImage: url(payload.email, {
          protocol: 'http',
          s: '200',
          r: 'pg',
          d: '404',
        }),
        createdBy: userId ? userId : 1,
        updatedBy: userId ? userId : 1
      }),
    );
  }

  /**
   * Assign User Subcription Role  with RegisterPayload fields
   * @param {PatchUserSubRoleDto} payload user payload
   * @returns {Promise<PatchUserSubRoleDto>} data from the assign user subscription
   */
  async assignPermissions(patchUserSubRoleDto: PatchUserSubRoleDto, req: any): Promise<IGenericMessageBody> {
    console.log('patchUserSubRoleDto-UUUUUUUU:',patchUserSubRoleDto);
    
    const role = await this.roleRepository.findOne({where: {id: patchUserSubRoleDto.roleId}});
    const user = await this.roleRepository.findOne({where: {id: patchUserSubRoleDto.userId}});
    const sub = await this.subRepository.findOne({where: {id: patchUserSubRoleDto.subId}});
    if(!role || !user || !sub){
    throw new NotFoundException()
    }

    const userSubRoles = await this.userSubRolesRepository.findOne({where: {roleId: patchUserSubRoleDto.roleId, subId: patchUserSubRoleDto.subId}});
    console.log('found duplicate :',userSubRoles)
    if(userSubRoles){
      return { message: `Failed to insert a duplicate record` };
    }
    /* You can check if course with given ID exists aswell here in the same way with RoleRepository */
    
    const queryResult = await this.userSubRolesRepository.save(
      this.userSubRolesRepository.create({
      ...patchUserSubRoleDto,
      createdBy: req.user ? req.user.id : 1,
      updatedBy: req.user ? req.user.id : 1
      }),);

      if (queryResult) {
        return { message: `User Subscription Role assigned successfully` };
      } else {
        throw new BadRequestException(
          `Failed to assign permission of roleId ${patchUserSubRoleDto.roleId}.`,
        );
      }
    }




   
   async getActiveUser(): Promise<User[]> {
      return await this.userRepository.find({ where:[{isActive:true}] });
    }



// -------------------------------------- Different ----------------------------------------------



    async updateUserRole(payload: updateUserRoleDto, id: number){
     const check = await this.get(id)
     if (!check){
      throw new NotFoundException("User Not found")
     }
     const {affected} =await this.userRoleRepository.update({id: check.roles[0].id},{role: payload.role})
     if(!affected){
      throw new BadRequestException("Could Not Update");
     }
     return (`User with id: ${id} role has been updated to ${payload.role}`)
    }

   
  
}
