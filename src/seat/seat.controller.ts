import { Controller, Get, Post, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetSeatListResponse } from "./dto";
import { SeatService } from "./seat.service";
import { AuthGuard } from "../common/authGuard";
import { AuthPayload, JwtPayload } from "../common/authUtil";

@ApiTags("seat")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get()
  @ApiOkResponse({ type: GetSeatListResponse })
  async getSeatList(
    @AuthPayload() user: JwtPayload
  ): Promise<GetSeatListResponse> {
    return this.seatService.getSeatList();
  }
}
