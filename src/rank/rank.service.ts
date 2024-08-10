import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Like } from "typeorm";
import { GetRankRequest, GetRankResponse } from "./dto";
import { Reservation } from "../reservation/reservation.entity";
import { User } from "../user/user.entity";
import { countByUserId, selectRandomItem } from "./utils";

@Injectable()
export class RankService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getRankList({
    reservedMonth,
  }: GetRankRequest): Promise<GetRankResponse> {
    if (!reservedMonth) return;

    const reservationTotalList = await this.dataSource.manager.find(
      Reservation,
      {
        where: { reservedAt: Like(`${reservedMonth}%`) },
        withDeleted: true,
      }
    );

    const reservationList = reservationTotalList.filter(
      ({ deletedAt }) => !deletedAt
    );

    const cancelList = reservationTotalList.filter(
      ({ deletedAt }) => deletedAt
    );

    const reservationCountMap = countByUserId(reservationList);

    const reservationRankList = Array.from(reservationCountMap).sort(
      (a, b) => b[1] - a[1] // [userId, count] count를 기준으로 내림차순 정렬
    );

    const userList = await this.dataSource.manager.find(User);

    const findUser = (userId: number) => {
      return userList.find((user) => user.id === userId);
    };

    const top3AttendanceList = reservationRankList
      .slice(0, 3)
      .map(([userId, count], i) => ({
        id: i,
        user: findUser(userId),
        count,
      }));

    const cancelCountMap = countByUserId(cancelList);

    const cancelRankList = Array.from(cancelCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1)
      .map(([userId, count]) => ({
        id: 4,
        user: findUser(userId),
        count,
      }));

    const reservationUserIdList = reservationRankList.map(
      ([userId, _]) => userId
    );

    // 한 번도 출석하지 않은 유저 리스트
    const ghostUserList = userList.filter(
      ({ id }) => !reservationUserIdList.includes(id)
    );

    // 예약횟수가 가장 적은 유저
    const leastReservationRank = reservationRankList.reverse()[0];

    const ghostRank = (() => {
      // 한 번도 출석하지 않은 유저가 있다면 랜덤으로 선정
      if (ghostUserList.length) {
        const ghostUser = selectRandomItem(ghostUserList);

        return {
          id: 5,
          user: ghostUser,
          count: 0,
        };
      }

      // 모두 출석했다면 예약횟수가 가장 적은 유저를 선정
      return {
        id: 5,
        user: findUser(leastReservationRank[0]),
        count: leastReservationRank[1],
      };
    })();

    return {
      attendance: top3AttendanceList,
      cancel: cancelRankList[0],
      ghost: ghostRank,
    };
  }
}
