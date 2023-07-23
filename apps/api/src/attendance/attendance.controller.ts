import { Controller,Post,Body ,Get,Req,Param,ParseIntPipe,Patch, UseGuards, UnauthorizedException, ForbiddenException} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { AddMonthDto } from './dto/addmonth_dto';
import { MonthDetailsDto } from './dto/month_details_dto';
import {  UpdateMonDetailsDto } from './dto/update_mondetails_dto';
import { MonthDetails } from './entities/month_details_entity';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { UserActionsEnum } from '@starter/api-types';
import { AppAbility } from '../casl/casl.factory';
import { ForbiddenError, subject } from '@casl/ability';
import { Month } from './entities/attendance.entity';

@ApiTags('attendence')
@Controller('v1/attendance')
export class AttendanceController {

    constructor(private attendanceService:AttendanceService){}
    // *-------------------------------------------------------ViewMonth -------------------------------------------------*
    //#region  ViewMonth
    
    @Get("month")
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => {return ability.can(UserActionsEnum.Read,subject("Attendance", Month))})
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => {return ability.can(UserActionsEnum.Read, "Attendence")})
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async ViewMonth(){
        return this.attendanceService.ViewMonth();
    }
//#endregion

       // *-------------------------------------------------------ViewMonthDetails-------------------------------------------------*
    //#region ViewMonthDetails 

    @Get()
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => {return ability.can(UserActionsEnum.Create,subject("Attendance", Month))})
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async ViewMonthDetails(){
        return this.attendanceService.ViewMonthDetails();
    }
    //#endregion

    // *-------------------------------------------------------Add month -------------------------------------------------*
    //#region  AddMonth

    @Post("addmonth")
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => {return ability.can(UserActionsEnum.Create,subject("Attendance", Month))})
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    AddMonth(@Body() addMonth:AddMonthDto){       
        const data=  this.attendanceService.AddMonth(addMonth)
        return data;
    }
//#endregion

    // *-------------------------------------------------------ViewAttendance -------------------------------------------------*
    //#region ViewAttendance
    
    @Post()
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => {return ability.can(UserActionsEnum.Read,subject("Attendance", Month))})
    async ViewAttendance(@Body() getMonthDetail:MonthDetailsDto){
        return this.attendanceService.ViewAttendance(getMonthDetail);
    }
//#endregion

    // *-------------------------------------------------------UpdateAttendance -------------------------------------------------*
    //#region UpdateAttendance

    @Patch()
    @ApiResponse({ status: 200, description: 'Update Attendance Request Received' })
    @ApiResponse({ status: 400, description: 'Update  Attendance Request Failed' })
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => {return ability.can(UserActionsEnum.Update,subject("Attendance", Month))})
    async getPostById(@Req() req, @Body() updateAttendance:UpdateMonDetailsDto) {
        const findAttendanceToBeUpdated = await this.attendanceService.findUserAttendance(updateAttendance.id)

        if (req.ability.can(UserActionsEnum.Update,subject("Attendance", findAttendanceToBeUpdated)) === false) {
            throw new ForbiddenException()
          }    
        return await this.attendanceService.markAttendance(updateAttendance)
    }      
    //#endregion

//#region Submit attendance And Create WorkFlow
 
@Post('/submit/attendance')
@ApiResponse({ status: 201, description: 'Success' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
async SubmitAttendance(@Body() payload:any){
    return this.attendanceService.SubmitAttendance(payload);
}
//#endregion

}
