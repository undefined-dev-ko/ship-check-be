import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateAccessTokenByGoogleRequest, TokenPair } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login/google")
  @ApiOperation({
    summary: "구글 토큰으로 JWT 토큰 생성",
    description: "구글 로그인 토큰으로 JWT 토큰 생성한다",
  })
  async createAccessTokenByGoogleToken(
    @Body() payload: CreateAccessTokenByGoogleRequest
  ): Promise<TokenPair> {
    return this.authService.createAccessTokenByGoogleAuthorizationCode(
      payload.authorizationCode
    );
  }

  @Post("refresh")
  @ApiOperation({
    summary: "JWT 토큰 리프레시",
    description: "JWT 토큰을 리프레시 한다",
  })
  async refreshToken(@Body() payload: TokenPair): Promise<TokenPair> {
    return this.authService.refreshAccessToken(payload);
  }
}
