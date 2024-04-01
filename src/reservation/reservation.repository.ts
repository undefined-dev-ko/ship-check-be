import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateReservationDto } from "./dto/reservation.dto";
import { Reservation } from "./Reservation.entity";

// 커넥션 가져다 써야함
// 데이터소스
@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
  async createReservation(
    createReservationDto: CreateReservationDto,
    user: User
  ): Promise<Reservation> {
    const { userId, seatId } = createReservationDto;

    const reservation = this.create({
      user,
      seatId,
    });

    await this.save(reservation);
    return reservation;
  }
}
