import { defineConfig, env } from "prisma/config";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    directUrl: env("DATABASE_URL_UNPOOLED"),
    url: env("DATABASE_URL"),
  },
});
