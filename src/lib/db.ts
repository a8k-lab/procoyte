import { getXataClient } from "@/xata";
import type { DatabaseSchema } from "@/xata";
import { type Model, XataDialect } from "@xata.io/kysely";
import { Kysely } from "kysely";
const xata = getXataClient();
export const db = xata.db;

export const dbKys = new Kysely<Model<DatabaseSchema>>({
  dialect: new XataDialect({ xata }),
});
