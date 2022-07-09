import { DataSource } from "typeorm";
import { URL } from "url";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const dbUrl = new URL(process.env.DATABASE_URL)
const routingId = dbUrl.searchParams.get("options")
dbUrl.searchParams.delete("options")

export const AppDataSource = new DataSource({
  type: "cockroachdb",
  url: dbUrl.toString(),
  ssl: true,
  extra: {
    options: routingId
  },
})