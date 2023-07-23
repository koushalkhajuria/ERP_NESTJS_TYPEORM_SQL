import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateSODto } from './dto/createso_dto';
import { SoService } from './so.service';

@Controller('v1/so')
export class SoController {
    // constructor(private readonly soService: SoService) { }
    // @Post()
    // @ApiResponse({ status: 201, description: 'So Created' })
    // @ApiResponse({ status: 400, description: 'Bad Request' })
    // @ApiResponse({ status: 401, description: 'Unauthorized' })
    // async CreatePO(@Body() createPODto: CreateSODto) {
    //     const data = await this.soService.CreatePO(createPODto);
    //     if (data != null) {
    //         return data
    //     } else {
    //         throw new BadRequestException("SO is Not Generated");
    //     }
    // }

    // //#region Get SO
    // @Get(":id")
    // @ApiResponse({ status: 201, description: 'Success' })
    // @ApiResponse({ status: 400, description: 'Bad Request' })
    // @ApiResponse({ status: 401, description: 'Unauthorized' })
    // async SO(@Param("id", ParseIntPipe) id: number) {
    //     const data = await this.soService.SO(id);
    //     if (data != null) {
    //         return data
    //     } else {
    //         throw new BadRequestException("SO Number is not Exist");
    //     }
    // }
    //#endregion


}
