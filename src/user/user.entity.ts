import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/team/team.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("user")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  photo: string;

  @ApiProperty({ description: "Team 정보" })
  @ManyToOne(() => Team, (team) => team.users)
  @JoinColumn([{ name: "teamId", referencedColumnName: "id" }])
  team?: Team;

  // #TODO 팀은 사후에 등록하도록 하기 위해서 nullable로
  @Column({ nullable: true })
  teamId?: number;
}
