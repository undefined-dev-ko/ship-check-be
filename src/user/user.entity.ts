import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Seat } from "../seat/seat.entity";
import { Team } from "../team/team.entity";
import { Reservation } from "../reservation/reservation.entity";

@Entity("user")
@Unique(["email"])
export class User {
  @ApiProperty({ description: "유저 ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "이메일" })
  @Column()
  email: string;

  @ApiProperty({ description: "이름" })
  @Column()
  name: string;

  @ApiProperty({ description: "사진" })
  @Column()
  photo: string;

  @ApiProperty({ description: "예약", type: Reservation, isArray: true })
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Relation<Reservation[]>;

  @ApiProperty({ description: "Team 정보", type: Team })
  @ManyToOne(() => Team, (team) => team.users)
  @JoinColumn({ name: "teamId", referencedColumnName: "id" })
  team?: Relation<Team>;

  // #TODO 팀은 사후에 등록하도록 하기 위해서 nullable로
  @ApiProperty({ description: "소속 팀 ID" })
  @Column({ nullable: true })
  teamId?: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt?: Date;
}
