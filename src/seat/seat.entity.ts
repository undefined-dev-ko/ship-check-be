import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Reservation } from "../reservation/reservation.entity";
import { User } from "../user/user.entity";

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

  @ApiProperty({ description: "고정 유저", type: User })
  @OneToOne(() => User, (user) => user.fixedSeat)
  @JoinColumn({ name: "fixedUserId", referencedColumnName: "id" })
  fixedUser?: Relation<User>;

  @Column({ nullable: true })
  @ApiProperty({ description: "고정 유저 ID" })
  fixedUserId?: number;
}
