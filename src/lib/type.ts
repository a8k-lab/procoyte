export interface RecommendationResponse {
  target: Target;
  recommendations: Top4[];
}

export interface Target {
  boosted: boolean;
  id: string;
  marked: number;
  name: string;
  price: number;
  imageUrl: string;
  mark_reason: string;
  location: string;
  owned_by: string;
  tag: string;
  xata: Xata;
  tags: Tag[];
}

export interface Xata {
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Top4 {
  id: string;
  name: string;
  price: number;
  tag: string;
  boosted: boolean;
  tags: Tag[];
  price_similarity: number;
  name_similarity: number;
  tag_similarity: number;
  similarity_score: number;
  location: string;
  imageUrl: string;
}

export interface Tag {
  tag_id: string;
  tag_name: string;
}
