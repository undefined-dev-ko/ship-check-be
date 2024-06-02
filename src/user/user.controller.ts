import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard, Public } from "../common/authGuard";
import { GetAllUserResponse, GetUserResponse } from "./dto";
import { UserService } from "./user.service";
import { AuthPayload, JwtPayload } from "../common/authUtil";

@Controller("user")
@ApiTags("user")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get("/")
  @ApiOperation({
    summary: "유저 리스트 조회[public 이니까 나중에 막아주세요]",
    description: "유저 리스트를 전부 조회한다[public 이니까 나중에 막아주세요]",
  })
  @ApiOkResponse({
    type: GetAllUserResponse,
    isArray: true,
    description: "결과",
  })
  async getAllUser(): Promise<GetAllUserResponse[]> {
    return this.userService.getAllUser();
  }

  @Get("/detail")
  @ApiOkResponse({ type: GetUserResponse })
  async getUser(@AuthPayload() user: JwtPayload): Promise<GetUserResponse> {
    return this.userService.getUser({ userId: user.id });
  }
}
