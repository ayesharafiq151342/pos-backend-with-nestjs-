import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Warranty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'No Title' })
  title: string;

  @Column({ default: 'inactive' })
  status: string;
}
