import { getXataClient } from '@/xata';

const xata = getXataClient();

export async function GET() {
  return xata.db.brands.getAll();
}
