import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ReservationService } from "./reservation.service";

import {
  CancelReservationRequest,
  CreateReservationRequest,
  CreateReservationResponse,
  GetReservationListResponse,
} from "./dto";
import { AuthGuard } from "../common/authGuard";
import { AuthPayload, JwtPayload } from "../common/authUtil";

@ApiTags("reservation")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("reservation")
export class ReservationController {
  private logger = new Logger("Reservations");

  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOkResponse({ type: CreateReservationResponse })
  async createReservation(
    @AuthPayload() user: JwtPayload,
    @Body() body: CreateReservationRequest
  ): Promise<CreateReservationResponse> {
    return this.reservationService.createReservation(body, user.id);
  }

  @Get("/:reservedAt")
  @ApiOkResponse({ type: GetReservationListResponse })
  async getReservationList(
    @AuthPayload() user: JwtPayload,
    @Param("reservedAt") reservedAt: string
  ): Promise<GetReservationListResponse> {
    return this.reservationService.getReservationList(reservedAt);
  }

  @Delete()
  async cancelReservation(
    @AuthPayload() user: JwtPayload,
    @Body() body: CancelReservationRequest
  ): Promise<void> {
    await this.reservationService.cancelReservation(body);

    return;
  }
}
