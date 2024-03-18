import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReservationController } from "./reservation/reservation.controller";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { typeORMConfig } from "./configs/typeorm.config";
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
    ReservationModule,
  ],
  controllers: [AppController, ReservationController],
  providers: [AppService],
})
export class AppModule {}
