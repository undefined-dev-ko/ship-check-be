import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  CreateTeamRequest,
  CreateTeamResponse,
  GetTeamListResponse,
  UpdateTeamRequest,
  UpdateTeamResponse,
} from "./dto";

@ApiTags("team")
@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOkResponse({ type: CreateTeamResponse })
  async createTeam(
    @Body() body: CreateTeamRequest
  ): Promise<CreateTeamResponse> {
    return this.teamService.createTeam(body);
  }

  @Get()
  @ApiOkResponse({ type: GetTeamListResponse })
  async getTeamList(): Promise<GetTeamListResponse> {
    return this.teamService.getTeamList();
  }

  @Patch("/:teamId")
  async updateTeam(
    @Param("teamId", ParseIntPipe) teamId: number,
    @Body() body: UpdateTeamRequest
  ): Promise<UpdateTeamResponse> {
    return this.teamService.updateTeam(teamId, body);
  }

  @Delete("/:teamId")
  async deleteTeam(
    @Param("teamId", ParseIntPipe) teamId: number
  ): Promise<void> {
    await this.teamService.deleteTeam(teamId);

    return;
  }
}
