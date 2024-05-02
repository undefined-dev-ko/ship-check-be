import { randomUUID, createHash } from "crypto";
import * as jwt from "jsonwebtoken";
import { Team } from "src/team/team.entity";

export type JwtPayload = {
  id: number;
  name: string;
  email: string;
  team?: Team;
  photo?: string;
  refSig?: string;
};

export class AuthUtil {
  private static secret: string = process.env.SECRET || randomUUID();
  constructor() {}

  public createToken(jwtPayload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    const refreshToken = createHash("SHA-256")
      .update(randomUUID())
      .digest("base64");

    const accessToken = jwt.sign(
      Object.assign(jwtPayload, {
        refSig: createHash("SHA-256").update(refreshToken).digest("base64"),
      }),
      AuthUtil.secret,
      { expiresIn: "7d" }
    );

    const tokenPair = {
      accessToken,
      refreshToken,
    };

    return tokenPair;
  }

  public refreshToken(tokenPair: {
    accessToken: string;
    refreshToken: string;
  }) {
    const jwtPayload = this.validateAccessToken(tokenPair.accessToken);

    if (
      jwtPayload.refSig ===
      createHash("SHA-256").update(tokenPair.refreshToken).digest("base64")
    ) {
      return this.createToken({
        ...jwtPayload,
      });
    }

    throw new Error("nonono");
  }

  public validateAccessToken(accessToken: string): JwtPayload {
    const verified = jwt.verify(accessToken, AuthUtil.secret) as JwtPayload;
    return verified;
  }
}
