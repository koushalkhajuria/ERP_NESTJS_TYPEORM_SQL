import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddHoliday } from './dto/addholiday_dto';
import { Holiday } from './holiday_entity';

@Injectable()
export class HolidayService {
    constructor(@InjectRepository(Holiday) private holidayRepository: Repository<Holiday>) { }

    //#region AddHoliday
    async AddHoliday(payload: AddHoliday): Promise<Holiday> {
        const holiday = await this.holidayRepository.create(payload)
        return await this.holidayRepository.save(holiday)
    }
    //#endregion

    //#region ViewHoliday
    async ViewHoliday() {
        const records = await this.holidayRepository.find()
        return records
    }
    //#endregion

    //#region UpdateHoliday
    async UpdateHoliday(id: number, payload: AddHoliday) {
        const { date, description } = payload
        return await this.holidayRepository.update({ id }, { date, description })
    }
    //#endregion

    //#region Delete Holiday
    async DeleteHoliday(id: number) {
        return await this.holidayRepository.delete({ id });

    }
    //#endregion
}
