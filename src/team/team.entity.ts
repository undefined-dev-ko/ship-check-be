import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity("team")
@Unique(["name"])
export class Team {
  @ApiProperty({ description: "팀 ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ description: "회사에서 사용하는 팀 이름" })
  name: string;

  @ApiProperty({ description: "팀 소속 유저", type: User, isArray: true })
  @OneToMany(() => User, (user) => user.team)
  users: Relation<User[]>;

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
