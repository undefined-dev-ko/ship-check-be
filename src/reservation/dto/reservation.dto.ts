import { IsNotEmpty } from "class-validator";

export class CreateReservationDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  seatId: number;
}

export class DeleteReservationDto {
  @IsNotEmpty()
  id: number;
}
