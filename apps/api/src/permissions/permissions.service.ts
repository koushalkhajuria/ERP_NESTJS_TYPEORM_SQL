import { BadRequestException,
  Injectable,
  NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { IGenericMessageBody } from '@starter/api-types';

@Injectable()
export class PermissionsService {
  /**
   * Constructor
   * @param {Repository<Permission>} permissionRepository
   */
   constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  
  async create(createPermissionDto: CreatePermissionDto[], req: any) {
    const arr = []
    for (let i in createPermissionDto){
      const data =await this.permissionRepository.save(
        this.permissionRepository.create({
          ...createPermissionDto[i],
          /*bannerImage: url(createPermissionDto.image, {
            protocol: 'http',
            s: '200',
            r: 'pg',
            d: '404',
          }),*/
          createdBy: req.user ? req.user.id : 1,
          updatedBy: req.user ? req.user.id : 1
  
        })
        );
        arr.push(data);
    }
    return arr;
  }

  findAll(): Promise<Permission[]>{
    return this.permissionRepository.find();
  }

  findOne(id: number) : Promise<Permission>{
    //return this.subscriptionRepository.findOne({ where: { id }, relations: ['roles'] });
    return this.permissionRepository.findOne({ where: { id }});
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const subscription = await this.findOne(id);
    if (subscription) {
      Object.keys(updatePermissionDto).forEach((key) => {
        subscription[key] = updatePermissionDto[key];
      });
      return this.permissionRepository.save(subscription);
    } else {
      throw new BadRequestException(
        'The user with that permission does not exist in the system. Please try another permission.',
      );
    }
  }

  async remove(id: number): Promise<IGenericMessageBody>  {
    const deleted = await this.permissionRepository.delete({ id });
    if (deleted.affected === 1) {
      return { message: `Deleted ${id} from records` };
    } else {
      throw new BadRequestException(
        `Failed to delete a user by the name of ${id}.`,
      );
    }
  }
}

