import { ConflictException } from "@nestjs/common";

export class AlreadyBookedException extends ConflictException {
  constructor() {
    super({
      message: "이미 같은 날짜에 예약되어 있습니다.",
      errorCode: "ALREADY_BOOKED",
    });
  }
}

export class SeatAlreadyBookedException extends ConflictException {
  constructor() {
    super({
      message: "이미 예약된 좌석입니다.",
      errorCode: "SEAT_ALREADY_BOOKED",
    });
  }
}
