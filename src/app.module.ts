import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "./config/config.module";
import { UserModule } from "./user/user.module";
import { TeamModule } from "./team/team.module";

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
