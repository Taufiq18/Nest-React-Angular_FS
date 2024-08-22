import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ length: 100 })
  nama: string;

  @Column('text')
  alamat: string;

  @Column({ length: 50 })
  kota: string;
}
