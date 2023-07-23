import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AddHoliday } from './dto/addholiday_dto';
import { HolidayService } from './holiday.service';

@Controller('v1/holiday')
export class HolidayController {
    constructor(private holidayService: HolidayService) { }
    @Post()
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async AddHoliday(@Body() payload: AddHoliday) {
        return await this.holidayService.AddHoliday(payload)
    }

    @Get()
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async ViewHoliday() {
        return await this.holidayService.ViewHoliday()
    }

    @Patch(":id")
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async UpdateHoliday(@Param("id", ParseIntPipe) id: number, @Body() payload: AddHoliday) {
        const holiday = await this.holidayService.UpdateHoliday(id, payload)
        if (holiday.affected === 1) {
            return { status: 200, message: `Updated` };
        } else {
            throw new BadRequestException(
                `Failed to update`,
            );
        }
    }

    @Delete(":id")
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async DeleteHoliday(@Param("id", ParseIntPipe) id: number) {
        const Deleted = await this.holidayService.DeleteHoliday(id)
        if (Deleted.affected === 1) {
            return { status: 200, message: `Deleted` };
        } else {
            throw new BadRequestException(
                `Failed to Delete`,
            );
        }
    }
}
