import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { GetRankResponse } from "./dto";
import { Rank } from "./rank.entity";
import { Reservation } from "../reservation/reservation.entity";

@Injectable()
export class RankService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getRankList(): Promise<GetRankResponse> {
    return {
      attendance: undefined,
      ghost: undefined,
      cancel: undefined,
    };
  }
}
