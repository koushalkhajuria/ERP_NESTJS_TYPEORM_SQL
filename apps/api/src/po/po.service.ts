import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materials } from '../materials/entities/materials.entity';
import { createPoDto} from './dto/createpo_dto';
import { ValidateMaterial } from './dto/validate_material_dto';
import { Po } from './entities/po.entity';
import { PoDetails } from './entities/podetails.entity';

@Injectable()
export class PoService {

    @InjectRepository(Po) private readonly poRepository: Repository<Po>
    @InjectRepository(PoDetails) private readonly podetilsRepository: Repository<PoDetails>
    @InjectRepository(Materials) private readonly materialRepository: Repository<Materials>


    //#region Generate PO
    async createPO(payload:createPoDto) {
        const{fullPo}=payload
        const{po}=fullPo[0]
        const{poDetails}=fullPo[1]
        const poData = await this.poRepository.create({...po[0]})
        const arr = []
        for(let element in poDetails)
        {

            const poDataDetail = await this.podetilsRepository.create({ ...poDetails[element]})
            await this.podetilsRepository.save(poDataDetail)
            arr.push(poDataDetail)
        }

        poData.po_Details = arr
        return await this.poRepository.save(poData)
        

    }
    //#endregion
// *---------------------------------------------Validate Material------------------------------------------------------------------*
    //#region Validate Material
    async validateMat(payload:ValidateMaterial) {
        const { data } = payload

        var output = [];
        var Response = [];
        var materialdata = [];

        for (let element in data) {
            var sNo = data[element].sNo;
            var mat = await this.materialRepository.findOneBy({ "typeNo": data[element].typeNo})
            if (!mat) {                
                continue
            }
            else {
                materialdata.push({ "matId":mat.matId,"typeNo":mat.typeNo,"shortDesc": mat.shortDesc})
                Response.push(mat.typeNo);
            }
        }
        output.push({ material: materialdata
        , message: Response })
        return output
    }
    //#endregion


}
