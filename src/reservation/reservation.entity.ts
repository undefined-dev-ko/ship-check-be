import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ApiProperty({ description: "유저 아이디" })
  userId: number;

  @Column()
  @ApiProperty({ description: "자리 아이디" })
  seatId: number;

  @Column()
  @ApiProperty({ description: "예약 날짜 YYYYMMDD 형식" })
  reservedAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}