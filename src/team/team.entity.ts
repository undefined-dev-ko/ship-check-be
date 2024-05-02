import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";

@Entity("team")
@Unique(["name"])
export class Team {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ description: "회사에서 사용하는 팀 이름" })
  name: string;

  @OneToMany(() => User, (user) => user.team)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
