import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAccessTokenByGoogleRequest {
  @ApiProperty()
  @IsString()
  authorizationCode: string;
}
export class TokenPair {
  @ApiProperty()
  @IsString()
  accessToken: string;
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
