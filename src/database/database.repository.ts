import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mysql",
        host: process.env.DB_HOSTNAME,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: !!process.env.DB_SYNCHRONIZE,
        logging: !!process.env.DB_LOGGING,
      });

      return dataSource.initialize();
    },
  },
];
