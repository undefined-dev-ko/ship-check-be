import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Not } from "typeorm";
import {
  CreateTeamRequest,
  CreateTeamResponse,
  GetTeamListResponse,
  UpdateTeamRequest,
  UpdateTeamResponse,
} from "./dto";
import { Team } from "./team.entity";

@Injectable()
export class TeamService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createTeam(payload: CreateTeamRequest): Promise<CreateTeamResponse> {
    const team = this.dataSource.manager.create(Team, {
      ...payload,
    });

    return await this.dataSource.manager.save(team);
  }

  async getTeamList(): Promise<GetTeamListResponse> {
    return { list: await this.dataSource.manager.find(Team) };
  }

  async updateTeam(
    teamId: number,
    payload: UpdateTeamRequest
  ): Promise<UpdateTeamResponse> {
    const team = await this.dataSource.manager.findOne(Team, {
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException("팀이 존재하지 않습니다.");
    }

    team.name = payload.name;

    return await this.dataSource.manager.save(team);
  }

  async deleteTeam(teamId: number): Promise<void> {
    const team = await this.dataSource.manager.findOne(Team, {
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException("팀이 존재하지 않습니다.");
    }

    await this.dataSource.manager.softDelete(Team, { id: teamId });
  }
}
