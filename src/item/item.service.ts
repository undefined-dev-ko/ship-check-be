import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import {
  CreateItemRequest,
  CreateItemResponse,
  UpdateItemRequest,
  UpdateItemResponse,
} from "./dto";
import { Item } from "./item.entity";

@Injectable()
export class ItemService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createItem(payload: CreateItemRequest): Promise<CreateItemResponse> {
    const item = this.dataSource.manager.create(Item, {
      ...payload,
    });

    return await this.dataSource.manager.save(item);
  }

  async updateItem(
    itemId: number,
    payload: UpdateItemRequest
  ): Promise<UpdateItemResponse> {
    const item = await this.dataSource.manager.findOne(Item, {
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException("해당 장비가 존재하지 않습니다.");
    }

    item.category = payload.category ?? item.category;
    item.memo = payload.memo ?? item.memo;
    item.seatId = payload.seatId ?? item.seatId;

    return await this.dataSource.manager.save(item);
  }

  async deleteItem(itemId: number): Promise<void> {
    const item = await this.dataSource.manager.findOne(Item, {
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException("해당 장비가 존재하지 않습니다.");
    }

    await this.dataSource.manager.softDelete(Item, { id: itemId });
  }
}
