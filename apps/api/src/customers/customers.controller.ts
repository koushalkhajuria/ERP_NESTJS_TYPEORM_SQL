import { searchCusDto } from './dto/search-cus-dto';
import { patchCusDto } from './dto/patch-customers-dto';
import { cusDto } from './dto/customers-dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Put, Get, Param, ParseIntPipe, BadRequestException, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';

@ApiTags('customers')
@Controller('v1/customer')
export class CustomersController {

  constructor(private customerService: CustomersService) { }

  // *---------------------------------------------add customer------------------------------------------------------------------*
  //#region add customer
  @Post()
  @ApiResponse({ status: 201, description: 'User Register' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  async createCustomer(@Body() customerDetails: cusDto) {

    const customer = await this.customerService.createCustomer(customerDetails);
    if (customer) {
      return { "message": "Customer Added" }
    }
    else {
      throw new BadRequestException(
        { "message": "Customer Not Added" }
      );
    }
  }
  //#endregion

  // *---------------------------------------------get customer------------------------------------------------------------------*
  //#region get customer
  @Get()
  @ApiResponse({ status: 200, description: 'Fetch customer Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch customer Request Failed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllcustomer() {
    const customer = await this.customerService.getAllCustomer()
    return customer
  }
  //#endregion

  // *---------------------------------------------get customer by id ------------------------------------------------------------------*
  // #region get customer by id
  @Get(":cusId")
  @ApiResponse({ status: 200, description: 'Fetch customer Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch customer Request Failed' })
  async getUserById(@Param("cusId", ParseIntPipe) cusrId: number) {
    const customer = await this.customerService.getCustomerById(cusrId)
    return customer;
  }
  //#endregion

  // *---------------------------------------------update customer by id------------------------------------------------------------------*
  // #region update customer
  @Patch(":cusId")
  @ApiResponse({ status: 200, description: 'Patch customer Request Received' })
  @ApiResponse({ status: 400, description: 'Patch customer Request Failed' })
  async updateUser(@Param("cusId", ParseIntPipe) cusId: number, @Body() updateUser: patchCusDto) {
    const customer = await this.customerService.updateCustomer(cusId, updateUser)
    return customer;
  }
  //#endregion

  // *---------------------------------------------search customer------------------------------------------------------------------*
  //#region search customer
  @Post("search")
  @ApiResponse({ status: 201, description: 'User Register' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })

  async searchCustomer(@Body() companyName) {

    const customer = await this.customerService.searchCustomer(companyName);
    return customer
  }
  //#endregion
}
