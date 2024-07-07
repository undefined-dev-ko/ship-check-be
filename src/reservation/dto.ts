import { IsNumber, IsString } from "class-validator";
import { Reservation } from "./reservation.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationRequest {
  @IsNumber()
  @ApiProperty({ description: "자리 번호" })
  seatId: number;

  @IsString()
  @ApiProperty({ description: "예약할 날짜 YYYY-MM-DD 형식" })
  reservedAt: string;
}

export class CreateReservationResponse {
  @ApiProperty({ description: "예약 id" })
  id: number;
  @ApiProperty({ description: "예약할 날짜 YYYY-MM-DD 형식" })
  reservedAt: string;
  @ApiProperty({ description: "예약을 넣은 날짜" })
  createdAt: Date;
  @ApiProperty({ description: "유저 id" })
  userId: number;
  @ApiProperty({ description: "자리 번호" })
  seatId: number;

  constructor(reservation: Reservation) {
    this.id = reservation.id;
    this.reservedAt = reservation.reservedAt;
    this.createdAt = reservation.createdAt;
    this.userId = reservation.userId;
    this.seatId = reservation.seatId;
  }
}

export class GetReservationListResponse {
  @ApiProperty({ description: "예약 리스트", isArray: true, type: Reservation })
  list: Reservation[];
}

export class CancelReservationRequest {
  @IsNumber()
  @ApiProperty({ description: "자리 번호" })
  seatId: number;

  @IsString()
  @ApiProperty({ description: "예약할 날짜 YYYY-MM-DD 형식" })
  reservedAt: string;
}

export class RetrieveReservationListRequest {
  @IsString()
  @ApiProperty({ description: "시작 예약날짜 YYYY-MM-DD 형식" })
  startReservedAt: string;
  @IsString()
  @ApiProperty({ description: "끝 예약날짜 YYYY-MM-DD 형식" })
  endReservedAt: string;
}

export class RetrieveReservationListResponse {
  @ApiProperty({ description: "예약 리스트", isArray: true, type: Reservation })
  list: Reservation[];
}
