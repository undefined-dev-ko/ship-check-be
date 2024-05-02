import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Reservation } from "./reservation.entity";
import {
  CancelReservationRequest,
  CreateReservationRequest,
  GetReservationListResponse,
} from "./dto";
import { DataSource } from "typeorm";
import { Seat } from "../seat/seat.entity";

@Injectable()
export class ReservationService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}

  async getReservationList(reservedAt): Promise<GetReservationListResponse> {
    const reservationList = await this.dataSource.manager.find(Reservation, {
      relations: ["seat", "user"],
      where: { reservedAt },
    });

    return { list: reservationList };
  }

  async createReservation(
    payload: CreateReservationRequest,
    userId: number
  ): Promise<Reservation> {
    const seat = await this.dataSource.manager.findOne(Seat, {
      where: { id: payload.seatId },
    });
    if (!seat) {
      throw new NotFoundException("좌석이 존재하지않습니다.");
    }

    const reservation = this.dataSource.manager.create<
      Reservation,
      Partial<Reservation>
    >(Reservation, {
      ...payload,
      userId,
    });

    return await this.dataSource.manager.save(reservation);
  }

  async cancelReservation(payload: CancelReservationRequest): Promise<void> {
    const reservation = this.dataSource.manager.findOne(Reservation, {
      where: { seatId: payload.seatId, reservedAt: payload.reservedAt },
    });

    if (!reservation) {
      throw new NotFoundException("해당 예약이 존재하지 않습니다.");
    }

    await this.dataSource.manager.softDelete(Reservation, {
      seatId: payload.seatId,
      reservedAt: payload.reservedAt,
    });
  }
}
