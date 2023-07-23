import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPoDto } from './dto/createpo_dto';
import { ValidateMaterial } from './dto/validate_material_dto';
import { PoService } from './po.service';

@ApiTags('Po')
@Controller('v1/po')
export class PoController {
    constructor(private readonly poService: PoService) { }
    //#region Generate Material
    @Post()
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async createPO(@Body() createPoDto: createPoDto) {
        
        const data = await this.poService.createPO(createPoDto);
        // if (data != null) {
        //     return { status: 201,  message: "PO Generated" }
        // } else {
        //     throw new BadRequestException("PO is Not Generated");
        // }

        return data
    }
    //#endregion

    //#region validate Material
    @Post('/validate')
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async validateMat(@Body() validate: ValidateMaterial) {

        const data = await this.poService.validateMat(validate);
        return data 
    }
    //#endregion

}
