import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Reservation } from "./reservation.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationRequest {
  @IsNumber()
  @ApiProperty({ description: "자리 번호" })
  seatId: number;

  @IsNotEmpty()
  @IsDateString()
  reservedAt: string;
}

export class CreateReservationResponse extends Reservation {}

export class GetReservationListResponse {
  @ApiProperty({ description: "예약 리스트", isArray: true, type: Reservation })
  list: Reservation[];
}

export class CancelReservationRequest {
  @IsNumber()
  seatId: number;

  @IsNotEmpty()
  @IsDateString()
  reservedAt: string;
}
