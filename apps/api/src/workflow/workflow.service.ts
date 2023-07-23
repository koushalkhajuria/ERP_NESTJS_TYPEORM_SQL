import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateWorkFlowDto } from './dto/create_workflow.dto';
import { updateWorkflowDto } from './dto/update_workfllow_dto';
import { WorkFlow } from './entities/workflow.entity';

@Injectable()
export class WorkflowService {


    @InjectRepository(WorkFlow)
    private readonly workflowRepository: Repository<WorkFlow>
    

    async attSubmit(attSubmit) {}


    //#region CreateWorkFlow
    async CreateWorkFlow(workflow: CreateWorkFlowDto): Promise<WorkFlow> {
        var { followDateInitiator, followDatePendingWith } = workflow
        var {  userId, description, initiator, pendingWith, wstatus, 
            remarks } = workflow
        var initiateDate = new Date(followDateInitiator)
        var pendingDate = new Date(followDatePendingWith)
        const data = await this.workflowRepository.create({
            userId: userId,
            description: description,
            initiator: initiator,
            timeStamp: new Date(),
            pendingWith: pendingWith,
            wstatus: wstatus,
            followDateInitiator: initiateDate,
            followDatePendingWith: pendingDate,
            remarks: remarks
        })
        return await this.workflowRepository.save(data)
    }
    //#endregion

    //#region  View workflow
    async ViewWorkflow(userId: number) {
        var data = await this.workflowRepository.find({ where: [{ userId: userId }] });
        return data
    }
    //#endregion

    //#region Update WorkFlow
    async updateWorkflow(id: number, payload: updateWorkflowDto) {
        const { description, initiator, followDateInitiator, followDatePendingWith,  pendingWith,
            remarks } = payload
        var initiateDate = new Date(followDateInitiator)
        var pendingDate = new Date(followDatePendingWith)
        return await this.workflowRepository.update({ workflowNo: id }, {
            description: description, initiator: initiator, followDateInitiator: initiateDate,
            followDatePendingWith: pendingDate,  pendingWith: pendingWith,
            remarks: remarks
        })
    }
    //#endregion

    //#region SearchBy initiator   
    async SearchByInitiator(initiator: string) :Promise<WorkFlow[]>{  
        const initiat=`Emp${initiator}`
        console.log(initiat);
        
       return await this.workflowRepository.findBy({initiator:initiat})
    }
    //#endregion

      //#region SearchBy pendingWith   
      async SearchByPendingWith(pendingWith: string) :Promise<WorkFlow[]>{     
        return await this.workflowRepository.findBy({pendingWith:pendingWith})
     }
     //#endregion
}
