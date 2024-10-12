import type { RecommendationResponse } from "@/lib/type";

const recommenderBaseUrl = process.env.RECOMMENDER_API_BASE_URL;

export async function getBrandRecommendations({
  id,
  limit = 10,
}: {
  id: string;
  limit?: number;
}) {
  if (!recommenderBaseUrl) {
    throw new Error("RECOMMENDER_API_BASE_URL env is not set");
  }

  const res = await fetch(`${recommenderBaseUrl}/brands/${id}?limit=${limit}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<RecommendationResponse>;
}
