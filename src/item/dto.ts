import { ApiProperty } from "@nestjs/swagger";
import { Item, ItemCategory } from "./item.entity";

export class CreateItemRequest implements Partial<Item> {
  @ApiProperty({ description: "장비의 종류" })
  category: ItemCategory;
  @ApiProperty({ description: "참고 사항" })
  memo?: string;
  @ApiProperty({ description: "해당 자리 ID" })
  seatId?: number;
}

export class CreateItemResponse extends Item {}

export class UpdateItemRequest {
  @ApiProperty({ description: "장비의 종류" })
  category?: ItemCategory;
  @ApiProperty({ description: "참고 사항" })
  memo?: string;
  @ApiProperty({ description: "해당 자리 ID" })
  seatId?: number;
}

export class UpdateItemResponse extends Item {}
