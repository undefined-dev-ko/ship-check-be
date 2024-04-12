import { User } from "src/auth/user.entity";
import { DataSource, Repository } from "typeorm";
import { CreateReservationDto } from "./dto/reservation.dto";
import { Reservation } from "./Reservation.entity";

// 커넥션 가져다 써야함 Database Connection
// 데이터소스 DataSource

export const reservationRepository = [
  {
    provide: "RESERVATION_REPOSITORY",
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Reservation),
    inject: ["DATA_SOURCE"],
  },
];

// export class ReservationRepository extends Repository<Reservation> {
//   async createReservation(
//     createReservationDto: CreateReservationDto,
//     user: User
//   ): Promise<Reservation> {
//     const { userId, seatId } = createReservationDto;

//     const reservation = this.create({
//       // user,
//       seatId,
//     });

//     await this.save(reservation);
//     return reservation;
//   }
// }
