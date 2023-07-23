import { searchMatDto } from './dto/search-material-dto';
import { updateMatDto } from './dto/patch-material-dto';
import { materialDto } from './dto/material-dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { Controller, Post, Body, Get, Param, ParseIntPipe, BadRequestException, Patch } from '@nestjs/common';

@ApiTags('materials')
@Controller('v1/materials')
export class MaterialsController {


    constructor(private materialService: MaterialsService) { }

    // *---------------------------------------------add Material------------------------------------------------------------------*
    // #region get Material
    @Post()
    @ApiResponse({ status: 201, description: 'material Register' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async creatematerial(@Body() materialDetails: materialDto) {
        const data = this.materialService.createMaterial(materialDetails);
        if (data) {
            return { "message": "Material Added" }
          }
          else {
            throw new BadRequestException(
              { "message": "Material Not Added" }
            );
          }
    }
    //#endregion

    // *---------------------------------------------get Material------------------------------------------------------------------*
    // #region get Material
    @Get()
    async getAllmaterial() {
        const data = await this.materialService.getAllMaterial()

        return data
    }
    //#endregion

    // *---------------------------------------------get Material by id------------------------------------------------------------------*
    // #region get Material
    @Get(":matlId")
    @ApiResponse({ status: 200, description: 'Fetch material Request Received' })
    @ApiResponse({ status: 400, description: 'Fetch material Request Failed' })
    async getmaterialById(@Param("matlId", ParseIntPipe) matlId: number) {
        return await this.materialService.getMaterialById(matlId)
    }
    //#endregion

    // *--------------------------------------------update Material------------------------------------------------------------------*
    // #region get Material
    @Patch(":matlId")
    @ApiResponse({ status: 200, description: 'Patch material Request Received' })
    @ApiResponse({ status: 400, description: 'Patch material Request Failed' })
    async updatematerial(@Param("matlId", ParseIntPipe) matlId: number, @Body() updatematerial: updateMatDto) {
        return await this.materialService.updateMaterial(matlId, updatematerial)
    }
    //#endregion

    // *---------------------------------------------search Material------------------------------------------------------------------*
    //#region search Material
    @Post("search")
    @ApiResponse({ status: 201, description: 'User Register' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })

    async searchMaterial(@Body() materials) {

        const data = await this.materialService.searchMaterial(materials);
        return data
    }
    //#endregion
}

