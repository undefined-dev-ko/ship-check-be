import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";

export class GetAllUserResponse implements Partial<User> {
  @ApiProperty({ name: "유저 id" })
  id: number;
  @ApiProperty({ name: "유저 이메일", description: "아마 구글 이메일" })
  email: string;
}

export class GetUserResponse extends User {}
