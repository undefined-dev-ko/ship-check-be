import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Reservation, Seat } from "./Reservation.entity";
import { CreateReservationDto } from "./dto/reservation.dto";
import { DataSource } from "typeorm";
import { User } from "src/user/user.entity";

@Injectable()
export class ReservationService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  async getAllReservations(): Promise<Seat[]> {
    return;
  }

  async createReservation(
    createReservationDto: CreateReservationDto,
    user: User
  ): Promise<Reservation> {
    const reservation = this.dataSource.manager.create<
      Reservation,
      Partial<Reservation>
    >(Reservation, {
      ...createReservationDto,
    });

    return await this.dataSource.manager.save(reservation);
  }
}
