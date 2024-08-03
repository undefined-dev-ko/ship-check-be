import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { DatabaseModule } from "../database/database.module";
import { RankService } from "./rank.service";
import { RankController } from "./rank.controller";

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [RankService],
  controllers: [RankController],
})
export class RankModule {}
