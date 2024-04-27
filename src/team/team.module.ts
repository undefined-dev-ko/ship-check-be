import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { DatabaseModule } from "../database/database.module";

import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
