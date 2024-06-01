import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { DatabaseModule } from "../database/database.module";

import { ItemService } from "./item.service";
import { ItemController } from "./item.controller";

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
