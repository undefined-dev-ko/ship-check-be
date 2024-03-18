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
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { CreateReservationDto } from "./dto/reservation.dto";
import { Reservation } from "./Reservation.entity";
import { ReservationService } from "./reservation.service";

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

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createReservationDto: CreateReservationDto,
    @GetUser() user: User
  ): Promise<Reservation> {
    this.logger.verbose(`User ${user.name} creating a new reservation. 
      Payload: ${JSON.stringify(createReservationDto)} `);
    return this.reservationService.createReservation(
      createReservationDto,
      user
    );
  }
}
