import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Employee } from "../entities/Employee";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Employee],
    synchronize: true, // Auto-migration (for dev)
});
