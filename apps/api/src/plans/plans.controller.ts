import { patchPlanDto } from './dto/patch-plans-dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Get, ParseIntPipe, Param, BadRequestException, Patch, UsePipes, ValidationPipe, Delete, Response } from '@nestjs/common';
import { PlansService } from './plans.service';
import { planDto } from './dto/plans-dto';

@ApiTags('plans')
@Controller('v1/plans')
export class PlansController {

    constructor(private planService: PlansService) { }

    // *---------------------------------------------create plan------------------------------------------------------------------*
    //#region create plan
    @Post()
    @ApiResponse({ status: 201, description: 'plan Register' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UsePipes(new ValidationPipe())
    async createPlan(@Body() planDetails: planDto) {
        return await this.planService.createPlan(planDetails);

    }
    //#endregion

    // *---------------------------------------------get plan------------------------------------------------------------------*
    //#region get plans
    @Get()
    @ApiResponse({ status: 200, description: 'Fetch plan Request Received' })
    @ApiResponse({ status: 400, description: 'Fetch plan Request Failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getAllplan() {
        return await this.planService.getAllPlan()


    }
    //#endregion

    // *---------------------------------------------get plan by id------------------------------------------------------------------*
    //#region get plans by id
    @Get(":id")
    @ApiResponse({ status: 200, description: 'Fetch plan Request Received' })
    @ApiResponse({ status: 400, description: 'Fetch plan Request Failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getPlanById(@Param("id", ParseIntPipe) id: number) {
        return await this.planService.getPlanById(id)

    }
    //#endregion

    // *---------------------------------------------update plan------------------------------------------------------------------*
    //#region update plan
    @Patch(":id")
    @ApiResponse({ status: 200, description: 'Patch plan Request Received' })
    @ApiResponse({ status: 400, description: 'Patch plan Request Failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UsePipes(new ValidationPipe())
    async updatePlan(@Param("id", ParseIntPipe) id: number, @Body() updateplan:patchPlanDto) {
        return await this.planService.updatePlan(id, updateplan)
    }
    //#endregion 

    // *---------------------------------------------update plan------------------------------------------------------------------*
    //#region delete plan
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Patch plan Request Received' })
    @ApiResponse({ status: 400, description: 'Patch plan Request Failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async planRemove(@Param('id', ParseIntPipe) id: number) {
        return await this.planService.planRemove(id);
    }
    //#region 
}
