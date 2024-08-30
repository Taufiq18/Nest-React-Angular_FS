import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../entities/customer.entity';

// Menambhakan 'api/' pada API
@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer> {
    const customer = await this.customerService.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  @Post()
  create(@Body() customer: Customer): Promise<Customer> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() customer: Partial<Customer>,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerService.update(id, customer);
    if (!updatedCustomer) {
      throw new NotFoundException(`Unable to update. Customer with ID ${id} not found`);
    }
    return updatedCustomer;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const result = await this.customerService.remove(id);
    if (!result) {
      throw new NotFoundException(`Unable to delete. Customer with ID ${id} not found`);
    }
  }
}
