import { Module } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { DatabaseModule } from "../database/database.module";
import { ReservationController } from "./reservation.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
