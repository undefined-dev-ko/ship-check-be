import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateReservationDto } from "./dto/reservation.dto";
import { Reservation } from "./Reservation.entity";
import { ReservationService } from "./reservation.service";
import { User } from "src/user/user.entity";

@ApiTags("reservation")
@Controller("reservation")
export class ReservationController {
  private logger = new Logger("Reservations");

  constructor(private reservationService: ReservationService) {}

  @Get()
  @ApiOperation({ summary: "사무실 자리 예약 현황 조회" })
  findAll(): string {
    return "This action returns all reservations";
  }
}
