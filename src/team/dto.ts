import { ApiProperty } from "@nestjs/swagger";
import { Team } from "./team.entity";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamRequest implements Partial<Team> {
  @ApiProperty({ description: "회사에서 사용하는 팀 이름" })
  name: string;
}

export class CreateTeamResponse extends Team {}

export class GetTeamListResponse {
  @ApiProperty({ description: "팀 리스트", isArray: true, type: Team })
  list: Team[];
}

export class UpdateTeamRequest {
  @ApiProperty({ description: "회사에서 사용하는 팀 이름" })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateTeamResponse extends Team {}
