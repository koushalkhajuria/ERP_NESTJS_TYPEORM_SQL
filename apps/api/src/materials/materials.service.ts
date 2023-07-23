import { searchMatDto } from './dto/search-material-dto';
import { updateMatDto } from './dto/patch-material-dto';
import { materialDto } from './dto/material-dto';
import { Materials } from './entities/materials.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';

@Injectable()
export class MaterialsService {

    constructor(@InjectRepository(Materials) private materialRepository: Repository<Materials>) { }


    // *---------------------------------------------add Material------------------------------------------------------------------*
    //#region add Material
    async createMaterial(materialDetails: materialDto): Promise<Materials> {
        const newMaterial = this.materialRepository.create({ ...materialDetails });
        return await this.materialRepository.save(newMaterial)
    }
    //#endregion

    // *---------------------------------------------get all Material------------------------------------------------------------------*
    // #region get Material
    async getAllMaterial(): Promise<Materials[]> {
        const materials = await this.materialRepository.find();
        if (!materials) {
            throw new BadRequestException(
                `No material found`,
            );
        }
        else {
            return materials;
        }
    }
    //#endregion

    // *---------------------------------------------get Material by id------------------------------------------------------------------*
    // #region get Material
    async getMaterialById(matId: number): Promise<Materials> {
        const materials = await this.materialRepository.findOneBy({ "matId": matId });
        if (!materials) {
            throw new BadRequestException(
                `The user with that ${matId} matId could not be found.`,
            );
        }
        else {
            return materials;
        }
    }
    //#endregion

    // *---------------------------------------------update Material by id------------------------------------------------------------------*
    // #region update Material
    async updateMaterial(matId: number, updateDetail: updateMatDto) {
        const materials = await this.materialRepository.findOneBy({ "matId": matId });
        if (!materials) {
            throw new BadRequestException(
                `The user with that ${matId} matId could not be found.`,
            );
        }
        else {
            const updateMaterial = await this.materialRepository.update({ matId }, { ...updateDetail })
            if (updateMaterial.affected == 1) {
                return `Material Update with cusId=${matId}`
            }
            else { return `Material not Update with cusId=${matId}` }
        }


    }
    //#endregion

    // *---------------------------------------------search Materials ------------------------------------------------------------------*
    // #region search Materials
    async searchMaterial(materials) {
        const { material } = materials
        var data = [];
        const mat = await this.materialRepository.find({
            where: [
              {typeNo: Like(`%${material}%`) },
              { longDesc: Like(`%${material}%`) },
            ],
          });
        if (mat.length==0) {
            return "no materail found"
        }
        else {

            for (let element in mat) {
                data.push({ data: mat[element].matId + "|" + mat[element].typeNo + "|" + mat[element].shortDesc })
            }
            return data;

        }
    }
    //#endregion
}
