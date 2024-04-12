import { Module } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { DatabaseModule } from "src/database/database.module";
import { ReservationController } from "./reservation.controller";
import { reservationRepository } from "./reservation.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationController],
  providers: [...reservationRepository, ReservationService],
})
export class ReservationModule {}
