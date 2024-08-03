import { Controller, Get, Post, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetRankResponse } from "./dto";
import { RankService } from "./rank.service";
import { AuthGuard } from "../common/authGuard";
import { AuthPayload, JwtPayload } from "../common/authUtil";

@ApiTags("rank")
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
@Controller("rank")
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get()
  @ApiOkResponse({ type: GetRankResponse })
  async getRank(@AuthPayload() user: JwtPayload): Promise<GetRankResponse> {
    return this.rankService.getRankList();
  }
}
