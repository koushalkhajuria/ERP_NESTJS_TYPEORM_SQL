import { patchPlanDto } from './dto/patch-plans-dto';
import { IGenericMessageBody } from '@starter/api-types';
import { Repository } from 'typeorm';
import { Plans } from './entities/plans.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Injectable, BadRequestException } from '@nestjs/common';
import { planDto } from './dto/plans-dto';


@Injectable()
export class PlansService {

    constructor(@InjectRepository(Plans) private plansRepository: Repository<Plans>) { }

    // *---------------------------------------------create plan------------------------------------------------------------------*
    //#region create plan
    async createPlan(planDetails: planDto): Promise<Plans> {

        const { title } = planDetails

        const CheckTitle = await this.plansRepository.findOneBy({ "title": title });

        if (!CheckTitle) {
            const newPlan = this.plansRepository.create({ ...planDetails });
            return await this.plansRepository.save(newPlan)
        }
        else {
            throw new BadRequestException(
                'This Title already used Please use different Title',
            )
        }



    }
    //#endregion
    // *---------------------------------------------get plan------------------------------------------------------------------*

    // #region get plan
    async getAllPlan(): Promise<Plans[]> {
        const plan = await this.plansRepository.find();
        if (!plan) {
            throw new BadRequestException(
                'The plan cound not find any data',
            );
        }
        else {
            return plan;
        }
    }
    // #endregion
    // *---------------------------------------------get plan by id------------------------------------------------------------------*

    // #region get plan by id
    async getPlanById(id: number): Promise<Plans> {
        const user = await this.plansRepository.findOneBy({ "id": id });
        if (!user) {
            throw new BadRequestException(
                'The Plan with that Id could not be found.',
            );
        }
        else {
            return user;
        }
    }
    // #endregion

    // *---------------------------------------------update plan------------------------------------------------------------------*
    // #region update plan
    async updatePlan(id: number, updateDetail: patchPlanDto) {

        const checkId = await this.plansRepository.findOneBy({ "id": id });
        if (!checkId) {
            throw new BadRequestException(
                'The plan with that Id could not be found.',
            );
        }
        else {
            return await this.plansRepository.update({ id }, { ...updateDetail })
        }
    }
    // #endregion

    // *---------------------------------------------delete plan------------------------------------------------------------------*
    // #region delete plan
    async planRemove(id): Promise<IGenericMessageBody> {
        const deleted = await this.plansRepository.delete({ id });

        if (deleted.affected === 1) {
            return { message: `Deleted ${id} from records` };
        }

        else {
            throw new BadRequestException(
                `Failed to delete a plan by the id of ${id}.`,
            );
        }
    }
    //#endregion
}
