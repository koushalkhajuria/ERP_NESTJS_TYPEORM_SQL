import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IGenericMessageBody } from '@starter/api-types';

import { CheckPolicies } from '../casl/check-policies.decorator';
import { PoliciesGuard } from '../casl/policies.guard';
// import { DeleteUserPolicyHandler } from '../casl/policy-handlers';
import { PatchUserDto } from './dto/patch-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { PatchUserSubRoleDto } from './dto/patch-user-subscription-role.dto';
import { updateUserRoleDto } from './dto/update-user-role.dto';

/**
 * Users Controller
 */
@ApiBearerAuth()
@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  /**
   * Constructor
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves current authenticated user
   * @returns {Promise<User>} queried user data
   */
  @Get('user')
  getUser(@Request() req) {
    return req.user;
  }

  /**
   * Retrieves a all users
   * @param username the user given id to fetch
   * @returns {Promise<User>} queried user data
   */
   @Get('lte/:lte')
   @ApiResponse({ status: 200, description: 'Fetch User Request Received' })
   @ApiResponse({ status: 400, description: 'Fetch User Request Failed' })
   async getUsers(@Param('lte') lte: number): Promise<User[]> {
     const users = await this.usersService.getAll(lte);
     if (!users) {
       throw new BadRequestException(
         'The user with that id could not be found.',
       );
     }
     return users;
   }

   
  /**
   * Retrieves a particular user
   * @param username the user given id to fetch
   * @returns {Promise<User>} queried user data
   */
  @Get('id/:id')
  @ApiResponse({ status: 200, description: 'Fetch User Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch User Request Failed' })
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.get(id);
    if (!user) {
      throw new BadRequestException(
        'The user with that id could not be found.',
      );
    }
    return user;
  }

  /**
   * Retrieves a particular user
   * @param username the user given username to fetch
   * @returns {Promise<User>} queried user data
   */
  @Get(':username')
  @ApiResponse({ status: 200, description: 'Fetch User Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch User Request Failed' })
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.getByUsername(username);
    if (!user) {
      throw new BadRequestException(
        'The user with that username could not be found.',
      );
    }
    return user;
  }

  /**
   * Retrieves a particular user
   * @param username the user given email to fetch
   * @returns {Promise<User>} queried user data
   */
   @Get('email/:email')
   @ApiResponse({ status: 200, description: 'Fetch User Request Received' })
   @ApiResponse({ status: 400, description: 'Fetch User Request Failed' })
   async getUserByEmail(@Param('username') email: string): Promise<User> {
     const user = await this.usersService.getByEmail(email);
     if (!user) {
       throw new BadRequestException(
         'The user with that email could not be found.',
       );
     }
     return user;
   }

  /**
   * Edit a user
   * @param {RegisterPayload} payload
   * @returns {Promise<User>} mutated user data
   */
  @Patch()
  @ApiResponse({ status: 200, description: 'Patch User Request Received' })
  @ApiResponse({ status: 400, description: 'Patch User Request Failed' })
  async patchUser(@Body() payload: PatchUserDto): Promise<User> {
    return this.usersService.edit(payload);
  }


  /**
   * Removes a user from the database
   * @param {string} username the username to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the user has been deleted
   */
  @Delete(':username')
  @UseGuards(PoliciesGuard)
  // @CheckPolicies(new DeleteUserPolicyHandler())
  @ApiResponse({ status: 200, description: 'Delete User Request Received' })
  @ApiResponse({ status: 400, description: 'Delete User Request Failed' })
  async deleteUserByUsername(
    @Param('username') username: string,
  ): Promise<IGenericMessageBody> {
    return this.usersService.delete(username);
  }

  /**
   * Authentication route to register
   * @param {RegisterDto} payload the registration dto
   */
   @Post('register')
   @ApiResponse({ status: 201, description: 'Registration Completed' })
   @ApiResponse({ status: 400, description: 'Bad Request' })
   @ApiResponse({ status: 401, description: 'Unauthorized' })
   async register(@Body() payload: RegisterDto, @Request() req) {
     const user = await this.usersService.createByAdmin(payload, req);
     return user;
   }

   /**
   * Authentication route to register
   * @param {RegisterDto} payload the user-subscription-role dto
   */
   @Post('permissions')
    @ApiResponse({ status: 201, description: 'Permissions Completed' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async assignPermissions(@Body() payload: PatchUserSubRoleDto, @Request() req) {
      const user = await this.usersService.assignPermissions(payload, req);
      return user;
    }



    // ------------------------------------------add month----------------------------------
    @Get("active")
    @ApiResponse({ status: 200, description: 'Fetch User Request Received' })
    @ApiResponse({ status: 400, description: 'Fetch User Request Failed' })
    async getActiveUser(): Promise<User[]> {
      const user = await this.usersService.getActiveUser();
     
      return user;
    }


    @Patch("role/:id")
    @ApiResponse({ status: 200, description: 'Patch User Request Received' })
    @ApiResponse({ status: 400, description: 'Patch User Request Failed' })
    async updateUserRole(@Param("id", ParseIntPipe) id: number,@Body() payload: updateUserRoleDto) {
      return await this.usersService.updateUserRole(payload, id);
    }
  
}
