import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReservationController } from "./controllers/reservation.controller";

@Module({
  imports: [],
  controllers: [AppController, ReservationController],
  providers: [AppService],
})
export class AppModule {}
