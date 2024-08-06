import { Controller, Get, Param } from "@nestjs/common";

import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetRankRequest, GetRankResponse } from "./dto";
import { RankService } from "./rank.service";

@ApiTags("rank")
@Controller("rank")
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get("/:reservedMonth")
  @ApiOkResponse({ type: GetRankResponse })
  async getRank(
    @Param("reservedMonth") reservedMonth: string
  ): Promise<GetRankResponse> {
    return this.rankService.getRankList({ reservedMonth });
  }
}
