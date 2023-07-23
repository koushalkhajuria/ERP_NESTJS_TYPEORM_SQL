import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSODto } from './dto/createso_dto';
import { So } from './entities/so.entity';
import { SoDetails } from './entities/sodetails.entity';

@Injectable()
export class SoService {
    
    @InjectRepository(So)   private readonly soRepository: Repository<So>
    @InjectRepository(SoDetails)   private readonly sodetilsRepository: Repository<SoDetails>

//#region Create SO
async CreatePO(payload: CreateSODto) {
    // const SO = payload.SO
    // const so = await this.soRepository.create(SO)
    // await this.soRepository.save(so)

    // const POD = payload.SODetails
    // const len = POD.length

    // for (let i = 0; i < len; i++) {
    //     var soDetails = await this.sodetilsRepository.create(POD[i])
    //     await this.sodetilsRepository.save(soDetails)
    // }
    // return { so, soDetails }

}
//#endregion

//#region Get So
// async SO(id:number){
//     const so= await this.soRepository.findOneBy({ "id": id });
//     const itemNo=(so.id)
    
//     const soDetails=await this.soRepository.find({where:{"id":itemNo},relations:[]})    
//     return {so,soDetails}
// }
//#endregion
    
}
