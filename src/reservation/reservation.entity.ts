import { ApiProperty } from "@nestjs/swagger";
import { Seat } from "../seat/seat.entity";
import { User } from "../user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  Relation,
} from "typeorm";

@Entity()
export class Reservation {
  @ApiProperty({ description: "예약 ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "예약 유저" })
  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: Relation<User>;

  @ApiProperty({ description: "유저 ID" })
  @Column()
  userId: number;

  @ApiProperty({ description: "예약 자리" })
  @ManyToOne(() => Seat, (seat) => seat.reservations)
  @JoinColumn({ name: "seatId", referencedColumnName: "id" })
  seat: Relation<Seat>;

  @ApiProperty({ description: "자리 ID" })
  @Column()
  seatId: number;

  @ApiProperty({ description: "고정석 여부" })
  @Column()
  isFixedSeat: boolean;

  @Column({ type: "date" })
  @ApiProperty({ description: "예약 날짜 YYYY-MM-DD 형식" })
  reservedAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
