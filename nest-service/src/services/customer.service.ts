import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOneBy({ no: id });
  }

  create(customer: Customer): Promise<Customer> {
    return this.customerRepository.save(customer);
  }

  async update(id: number, customer: Partial<Customer>): Promise<Customer> {
    await this.customerRepository.update(id, customer);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.customerRepository.delete(id);
    return deleteResult.affected > 0; 
  }
}
