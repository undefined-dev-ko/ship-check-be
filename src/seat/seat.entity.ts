import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Reservation } from "../reservation/reservation.entity";
import { Item } from "../item/item.entity";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "자리 ID" })
  id: number;

  @Column()
  @ApiProperty({ description: "책상 번호" })
  deskNo: number;

  @ApiProperty({ description: "예약 리스트", type: Reservation, isArray: true })
  @OneToMany(() => Reservation, (reservation) => reservation.seat)
  reservations: Relation<Reservation[]>;

  @ApiProperty({ description: "장비 리스트", type: Item, isArray: true })
  @OneToMany(() => Item, (item) => item.seat)
  items: Relation<Item[]>;
}
