import { BadRequestException,
  Injectable,
  NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { IGenericMessageBody } from '@starter/api-types';

@Injectable()
export class SubscriptionService {

  /**
   * Constructor
   * @param {Repository<Subscription>} subscriptionRepository
   */
   constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}
  
  async create(createSubscriptionDto: CreateSubscriptionDto, req: any) {
   
    return this.subscriptionRepository.save(
      this.subscriptionRepository.create({
        ...createSubscriptionDto,
        createdBy: req.user ? req.user.id : 1,
        updatedBy: req.user ? req.user.id : 1

      }),
    );
  }

  findAll(): Promise<Subscription[]>{
    return this.subscriptionRepository.find();
  }

  findOne(id: number) : Promise<Subscription>{
    //return this.subscriptionRepository.findOne({ where: { id }, relations: ['roles'] });
    return this.subscriptionRepository.findOne({ where: { id }});
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscription> {
    const subscription = await this.findOne(id);
    if (subscription) {
      Object.keys(updateSubscriptionDto).forEach((key) => {
        subscription[key] = updateSubscriptionDto[key];
      });
      return this.subscriptionRepository.save(subscription);
    } else {
      throw new BadRequestException(
        'The subscription does not exist in the system. Please try another subscription.',
      );
    }
  }

  async remove(id: number): Promise<IGenericMessageBody>  {
    const deleted = await this.subscriptionRepository.delete({ id });
    if (deleted.affected === 1) {
      return { message: `Deleted ${id} from records` };
    } else {
      throw new BadRequestException(
        `Failed to delete a user by the name of ${id}.`,
      );
    }
  }
}
