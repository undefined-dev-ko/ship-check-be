import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getAllUser(): Promise<Array<Pick<User, "id" | "email">>> {
    const result = await this.dataSource.manager.find(User);
    return result.map((v) => ({ id: v.id, email: v.email }));
  }

  async getOneUserByEmail(email: string): Promise<User> {
    return await this.dataSource.manager.findOne(User, {
      relations: ["team"],
      where: { email },
    });
  }

  async getUser({ userId }): Promise<User> {
    const result = await this.dataSource.manager.findOne(User, {
      where: { id: userId },
    });

    return result;
  }

  async createUser(
    userPayload: Pick<User, "email" | "name" | "photo">
  ): Promise<User> {
    const user = this.dataSource.manager.create<User, Partial<User>>(User, {
      ...userPayload,
    });

    return await this.dataSource.manager.save(user);
  }
}
