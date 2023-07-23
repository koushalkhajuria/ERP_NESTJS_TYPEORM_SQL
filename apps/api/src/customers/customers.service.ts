import { searchCusDto } from './dto/search-cus-dto';
import { patchCusDto } from './dto/patch-customers-dto';
import { cusDto } from './dto/customers-dto';
import { Customers } from './entities/customers.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CustomersService {

    constructor(@InjectRepository(Customers) private customerRepository: Repository<Customers>) { }

    // *---------------------------------------------add customer------------------------------------------------------------------*
    //#region add customer
    async createCustomer(cusDetails: cusDto): Promise<Customers> {

        const newCustomer = await this.customerRepository.create({ ...cusDetails });
        return await this.customerRepository.save(newCustomer)

    }
    //#endregion

    // *---------------------------------------------get customer------------------------------------------------------------------*
    // #region get customer
    async getAllCustomer(): Promise<Customers[]> {
        const customers = await this.customerRepository.find();
        if (!customers) {
            throw new BadRequestException(
                `No Customer found`,
            );
        }
        else {
            return customers;
        }
    }
    //#endregion

    // *---------------------------------------------get customer by id------------------------------------------------------------------*
    // #region get customer
    async getCustomerById(cusId: number): Promise<Customers> {
        const customers = await this.customerRepository.findOneBy({ "cusId": cusId });

        if (!customers) {
            throw new BadRequestException
                (`The user with that ${cusId} cusId could not be found.`,);
        }
        else { return customers; }
    }
    //#endregion

    // *---------------------------------------------update customer by id------------------------------------------------------------------*
    // #region update customer
    async updateCustomer(cusId: number, updateDetail: patchCusDto) {
        const customers = await this.customerRepository.findOneBy({ "cusId": cusId });

        if (!customers) {
            throw new BadRequestException(
                `The user with that ${cusId} cusId could not be found.`,
            );
        }

        else {
            const updateCus = await this.customerRepository.update({ cusId }, { ...updateDetail })
            if (updateCus.affected == 1) {
                return `Customer Update with cusId=${cusId}`
            }
            else { return `Customer not Update with cusId=${cusId}` }
        }
    }
    //#endregion

    // *---------------------------------------------search customer------------------------------------------------------------------*
    // #region search customer
    async searchCustomer(companyNames) {
        const { companyName } = companyNames
        var data = [];
        const customers = await this.customerRepository.find({
            where: [
                { companyName: Like(`%${companyName}%`) },

            ],
        });
        if (customers.length == 0) {
            return "no customer found"
        }
        else {

            for (let element in customers) {
                data.push({ data: customers[element].cusId + "|" + customers[element].companyName + "|" + customers[element].addressL1 + "|" + customers[element].addressL2 + "|" + customers[element].pinCode + "|" + customers[element].gstin })
            }
            return data;

        }
    }
    //#endregion
}
