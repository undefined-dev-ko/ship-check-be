import { ApiProperty } from "@nestjs/swagger";

import { Rank } from "./rank.entity";

export class GetRankResponse {
  @ApiProperty({ description: "출석왕 3명 배열로" })
  attendance?: Rank[];

  @ApiProperty({ description: "결석왕 1명" })
  ghost?: Rank;

  @ApiProperty({ description: "취소왕 1명" })
  cancel?: Rank;
}
