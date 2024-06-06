import { ApiProperty } from "@nestjs/swagger";
import { Item, ItemCategory } from "./item.entity";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateItemRequest implements Partial<Item> {
  @ApiProperty({ description: "장비의 종류" })
  @IsEnum(ItemCategory)
  category: ItemCategory;

  @ApiProperty({ description: "참고 사항" })
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiProperty({ description: "해당 자리 ID" })
  @IsOptional()
  @IsNumber()
  seatId?: number;
}

export class CreateItemResponse extends Item {}

export class UpdateItemRequest {
  @ApiProperty({ description: "장비의 종류" })
  @IsOptional()
  @IsEnum(ItemCategory)
  category?: ItemCategory;

  @ApiProperty({ description: "참고 사항" })
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiProperty({ description: "해당 자리 ID" })
  @IsOptional()
  @IsNumber()
  seatId?: number;
}

export class UpdateItemResponse extends Item {}
