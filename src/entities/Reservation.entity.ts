import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;
}
