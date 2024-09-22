import { getXataClient } from "@/xata";

const xata = getXataClient();

export const db = xata.db;
