import { BadRequestException, Body,Patch, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { parse } from 'path';
import { CreateWorkFlowDto } from './dto/create_workflow.dto';
import { updateWorkflowDto } from './dto/update_workfllow_dto';
import { WorkflowService } from './workflow.service';
import { WorkFlow } from './entities/workflow.entity';

@Controller('v1/workflow')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService) {}


    // *-------------------------------------------------------UpdateAttendance -------------------------------------------------*
    //#region UpdateAttendance

    @Post("attsubmit")
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    attSubmit(@Body() attSubmit ){       
        const data=  this.workflowService.attSubmit(attSubmit)
        return data;
    }
    //#endregion





    @Post()
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async createWorkFlow(@Body() payload: CreateWorkFlowDto) {
      const workflow = await this.workflowService.CreateWorkFlow(payload);
      return workflow;
    }    

    @Get(":userId")
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async ViewWorkflow(@Param("userId",ParseIntPipe) userId:number) {
      const workflow = await this.workflowService.ViewWorkflow(userId);
      if(!workflow){
        throw new BadRequestException(
            'The Workflow with that userId does not exist in the system.',
          );
      }else{     
      return {status:200,data:workflow,message:'Success'}
      }
    }

    @Patch(':id')
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async updateWorkflow(@Param("id",ParseIntPipe) id:number,@Body() payload:updateWorkflowDto) {
      const workflow = await this.workflowService.updateWorkflow(id,payload);
      if (workflow.affected === 1) {
        return { status:200,message: `Updated` };
      } else {
        throw new BadRequestException(
          `Failed to update`,
        );
      }
      }    
      
      @Get("/initiator/:initiator")
      @ApiResponse({ status: 201, description: 'Success' })
      @ApiResponse({ status: 400, description: 'Bad Request' })
      @ApiResponse({ status: 401, description: 'Unauthorized' })
      async SearchByInitiator(@Param("initiator") initiator:string) {
        const workflow = await this.workflowService.SearchByInitiator(initiator); 
                    
        if (!workflow) {
          throw new BadRequestException(
            'Data not found with this Initiator.',
          );
        }else{
        return workflow
        }

      }

      @Get("pendingWith/:pendingWith")  @ApiResponse({ status: 201, description: 'Success' })
      @ApiResponse({ status: 400, description: 'Bad Request' })
      @ApiResponse({ status: 401, description: 'Unauthorized' })
      async SearchByPendingWith(@Param("pendingWith") pendingWith:string):Promise<WorkFlow[]> {
        const workflow = await this.workflowService.SearchByPendingWith(pendingWith);             
        if (!workflow) {
          throw new BadRequestException(
            'Data not found with this Initiator.',
          );
        }
        return workflow;      
      }
} 
