import { DataSource } from "typeorm"
import Todo from "./entity/Todo";

export default new DataSource({
   type: 'mssql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Todo],
    subscribers: [],
    migrations: [],
});

