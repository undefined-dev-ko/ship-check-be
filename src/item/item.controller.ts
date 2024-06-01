import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  CreateItemRequest,
  CreateItemResponse,
  UpdateItemRequest,
  UpdateItemResponse,
} from "./dto";

@ApiTags("item")
@Controller("item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOkResponse({ type: CreateItemResponse })
  async createItem(
    @Body() body: CreateItemRequest
  ): Promise<CreateItemResponse> {
    return this.itemService.createItem(body);
  }

  @Patch("/:itemId")
  async updateItem(
    @Param("itemId", ParseIntPipe) itemId: number,
    @Body() body: UpdateItemRequest
  ): Promise<UpdateItemResponse> {
    return this.itemService.updateItem(itemId, body);
  }

  @Delete("/:itemId")
  async deleteItem(
    @Param("itemId", ParseIntPipe) itemId: number
  ): Promise<void> {
    await this.itemService.deleteItem(itemId);

    return;
  }
}
