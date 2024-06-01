import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "./config/config.module";
import { UserModule } from "./user/user.module";
import { TeamModule } from "./team/team.module";
import { ReservationModule } from "./reservation/reservation.module";
import { SeatModule } from "./seat/seat.module";
import { ItemModule } from "./item/item.module";

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    TeamModule,
    ReservationModule,
    SeatModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
