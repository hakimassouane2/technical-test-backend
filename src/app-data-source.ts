import { DataSource } from "typeorm";
import { Product } from "./entity/Product";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  entities: [Product],
  logging: true,
  synchronize: true,
});
