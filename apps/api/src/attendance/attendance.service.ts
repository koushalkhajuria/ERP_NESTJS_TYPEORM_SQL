import { WorkFlow } from './../workflow/entities/workflow.entity';
import { MonthDetails } from './entities/month_details_entity';
import { Month } from './entities/attendance.entity';
import { Injectable, BadRequestException, NotFoundException, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment = require('moment');
import { first, firstValueFrom } from 'rxjs';
import { Any, RelationId, Repository } from 'typeorm';
import { AddMonthDto } from './dto/addmonth_dto';
import { MonthDetailsDto } from './dto/month_details_dto';
import { UpdateMonDetailsDto } from './dto/update_mondetails_dto';
import console = require('console');



@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(MonthDetails) private attendanceRepository: Repository<MonthDetails>,
        @InjectRepository(Month) private monthRepositoy: Repository<Month>,
        @InjectRepository(WorkFlow) private workflowRepositoy: Repository<WorkFlow>
        
    ) { }



    // *-------------------------------------------------------Add month -------------------------------------------------*
    //#region  AddMonth

    async AddMonth(addMonth: AddMonthDto) {

        let { userId, month, year } = addMonth
        //#region get month
        let monNo = 0
        if (month == 'Jan') {
            monNo = 1
        } else if (month == 'Feb') {
            monNo = 2

        } if (month == 'Mar') {
            monNo = 3
        } else if (month == 'Apr') {
            monNo = 4

        } if (month == 'May') {
            monNo = 5
        } else if (month == 'Jun') {
            monNo = 6

        } if (month == 'Jul') {
            monNo = 7
        } else if (month == 'Aug') {
            monNo = 8

        } if (month == 'Sept') {
            monNo = 9
        } else if (month == 'Oct') {
            monNo = 10

        } if (month == 'Nov') {
            monNo = 11
        } else if (month == 'Dec') {
            monNo = 12
        }
        //#endregion

        //#region  calculate no. of days in month 
        const getDays = (years, months) => {
            return new Date(years, months, 0).getDate();
        };
        const NoOfDays = getDays(year, monNo);
        //#endregion calculate no. of days in month 

var Response=[]
        //#region  logic for add month
        for (let element in userId) {
            var empMonth = await this.monthRepositoy.find({ where: [{ userId: userId[element], month: month, year: year }] });
            if (empMonth.length != 0) {
               
                Response.push( `The user with ${userId[element]} userId is already exist in ${month} month.`);
                continue

            }
            else {
                const monthData = await this.monthRepositoy.create({ userId: userId[element], month: month, year: year })
                const arr = []

                for (let i = 1; i <= NoOfDays; i++) {
                    const date = new Date(`${year},${monNo},${i}`)
                    const monthDataDetail = await this.attendanceRepository.create({ date: date })
                    await this.attendanceRepository.save(monthDataDetail)
                    arr.push(monthDataDetail)
                }
                monthData.monthDetails = arr
                const refId = await this.monthRepositoy.save(monthData)
                Response.push( `The user with  ${userId[element]} userId is added `);
            }
        }
        //#endregion
        return Response

    }

    //#endregion

    // *-------------------------------------------------------view month -------------------------------------------------*
    // #region view month

    async ViewMonth(): Promise<Month[]> {
        var data = await this.monthRepositoy.find();
        if (data) {
            return data
        } else {
            throw new NotFoundException();
        }
    }
    //#endregion

    // *-------------------------------------------------------view month details -------------------------------------------------*
    // #region view month details

    async ViewMonthDetails(): Promise<MonthDetails[]> {
        var data = await this.attendanceRepository.find();
        if (data) {
            return data
        } else {
            throw new BadRequestException(
                'The user with that userId does not exist in the system. Please try another userId.',
            );
        }
    }
    //#endregion

    async findUserAttendance(id: number){
    //   const userDetail = await this.attendanceRepository.findOne( {where: {id},
    //     relations: ['Month'] }); 
      const userDetail = await this.attendanceRepository.findOne( {where: {id}});
        return userDetail.refId;
    }

    // *-------------------------------------------------------ViewAttendance -------------------------------------------------*
    //#region ViewAttendance

    async ViewAttendance(getMonthDetail: MonthDetailsDto) {
        const { userId, month, year } = getMonthDetail;
        var data = await this.monthRepositoy.find({ where: { userId, month, year }, relations: ["monthDetails"] })
        if (!data.length) {
            throw new NotFoundException()
        }
        return (data[0].monthDetails)
    }

    //#endregion


    // *-------------------------------------------------------MarkAttendance -------------------------------------------------*
    //#region MarkAttendance

    async markAttendance(updateAttendance: UpdateMonDetailsDto) {
        const { id, ...updateData } = updateAttendance
        var { affected } = await this.attendanceRepository.update(id, updateData)
        if (affected != 1) {
            throw new NotFoundException("Only user's attendance can be Marked")
        }
        return `attendence mark`
    }
    //#endregion

//#region Submit attendance And Create WorkFlow
async SubmitAttendance(payload:any)
{
let{month,year,userId}=payload
await this.monthRepositoy.update({userId:userId,month:month,year:year},{submitted:'Yes'})
const submit=await this.monthRepositoy.findOne({where:{userId:userId,month:month,year:year,submitted:'Yes'}})
console.log("submit",submit);
const d=new Date()
const date=d.toJSON().slice(0,10)
const data =await this.workflowRepositoy.create({
    description:`Attendance submitted for ${month} ${year}`,
    initiator:`Emp${userId}`,
    pendingWith:'Admin',
    wstatus:'Open',
    userId:userId,
    refId:submit.id, 
    followDateInitiator:date,
    followDatePendingWith:date
})
 await this.workflowRepositoy.save(data)
 return {message:'Attendance Submitted and Workflow Generated '}
}
//#endregion
}



