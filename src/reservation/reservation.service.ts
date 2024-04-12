import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { reservationRepository } from "./reservation.repository";
import { Reservation, Seat } from "./Reservation.entity";
import { User } from "src/auth/user.entity";
import { CreateReservationDto } from "./dto/reservation.dto";

@Injectable()
export class ReservationService {
  // constructor(
  //   @InjectRepository(...reservationRepository)
  //   private reservationRepository: ReservationRepository
  // ) {}
  // async getAllReservations(): Promise<Seat[]> {
  //   return;
  // }
  // createReservation(
  //   createReservationDto: CreateReservationDto,
  //   user: User
  // ): Promise<Reservation> {
  //   return this.reservationRepository.createReservation(
  //     createReservationDto,
  //     user
  //   );
  // }
}
