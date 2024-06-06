import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { createHash, randomUUID } from "crypto";
import * as jwt from "jsonwebtoken";
import { Team } from "../team/team.entity";
import { User as UserEntity } from "../user/user.entity";

export interface JwtPayload extends Partial<UserEntity> {
  id: number;
  name: string;
  email: string;
  team?: Team;
  photo?: string;
  refSig?: string;
}

export class AuthUtil {
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
      process.env.SECRET,
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
    const jwtPayload = jwt.decode(tokenPair.accessToken) as JwtPayload;

    if (
      jwtPayload.refSig ===
      createHash("SHA-256").update(tokenPair.refreshToken).digest("base64")
    ) {
      return this.createToken({
        id: jwtPayload.id,
        name: jwtPayload.name,
        email: jwtPayload.email,
        team: jwtPayload.team,
        photo: jwtPayload.photo,
      });
    }

    return { accessToken: null, refreshToken: null };
  }

  public validateAccessToken(accessToken: string): JwtPayload {
    const verified = jwt.verify(accessToken, process.env.SECRET) as JwtPayload;
    return verified;
  }
}

export const AuthPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayload;
  }
);
