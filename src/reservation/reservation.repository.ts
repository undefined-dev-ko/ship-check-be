import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateReservationDto } from "./dto/reservation.dto";
import { Reservation } from "./Reservation.entity";

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
  async createReservation(
    createReservationDto: CreateReservationDto,
    user: User
  ): Promise<Reservation> {
    const { userId, seatId } = createReservationDto;

    // TODO: 날짜 형식 확인
    const today = new Date();

    const reservation = this.create({
      user,
      seatId,
      createdAt: today,
    });

    await this.save(reservation);
    return reservation;
  }
}
