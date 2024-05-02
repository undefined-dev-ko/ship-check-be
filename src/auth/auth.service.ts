import { ForbiddenException, Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { AuthUtil } from "../common/authUtil";
import { ConfigService } from "src/config/config.service";
import { UserService } from "src/user/user.service";

const SHIPDA_EMAIL_SIGNATURE = "@ship-da.com";
@Injectable()
export class AuthService {
  private client: OAuth2Client;
  private authUtil: AuthUtil;
  private googleAuthConfig: {
    clientId: any;
    clientSecret: any;
    redirectUri: any;
  };
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    this.googleAuthConfig = this.configService.getGoogleAuthConfig();
    this.client = new OAuth2Client(
      this.googleAuthConfig.clientId,
      this.googleAuthConfig.clientSecret,
      this.googleAuthConfig.redirectUri
    );
    this.authUtil = new AuthUtil();
  }

  public async createAccessTokenByGoogleAuthorizationCode(
    authorizationCode: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const getTokenResponse = await this.client.getToken(authorizationCode);
    const token = getTokenResponse.tokens.id_token;

    if (!token) {
      throw new ForbiddenException("token not generated");
    }

    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.googleAuthConfig.clientId,
    });

    const googlePayload = ticket.getPayload();

    if (
      googlePayload.email !== "undefineddev2024@gmail.com" &&
      !googlePayload.email.endsWith(SHIPDA_EMAIL_SIGNATURE)
    ) {
      throw new ForbiddenException("not for your service");
    }

    const user =
      (await this.userService.getOneUserByEmail(googlePayload.email)) ||
      (await this.userService.createUser({
        email: googlePayload.email,
        name: googlePayload.name || googlePayload.email,
        photo: googlePayload.picture || "",
      }));

    return this.authUtil.createToken({
      ...user,
    });
  }

  public async refreshAccessToken(tokenPair: {
    accessToken: string;
    refreshToken: string;
  }) {
    return this.authUtil.refreshToken(tokenPair);
  }
}
