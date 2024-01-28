import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("reservation")
@Controller("reservation")
export class ReservationController {
  @Get()
  @ApiOperation({ summary: "사무실 자리 예약 현황 조회" })
  findAll(): string {
    return "This action returns all reservations";
  }
}
