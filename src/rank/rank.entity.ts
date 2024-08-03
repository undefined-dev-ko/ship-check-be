import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

import { User } from "../user/user.entity";

@Entity()
export class Rank {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "예약 유저" })
  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: Relation<User>;

  @ApiProperty({ description: "출석, 결석, 취소 횟수" })
  count: number;
}
