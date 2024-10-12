"use server";
import type { MarkSourcesRecord, ReportsRecord } from "@/xata";
import {
  type PatchBrandParams,
  type PostBrandParams,
  getBrandTags,
  getBrands,
  getLocations,
  getTags,
  patchBrand,
  postBrand,
  postLocation,
  postReport,
  postTag,
  replaceTags,
  upsertBrandMarkSources,
} from "./queries";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getLocationsAction({
  size = 10,
  search,
}: {
  size?: number;
  search?: string;
}) {
  return getLocations({
    size,
    search,
  });
}

export async function getBrandsAction({
  size = 10,
  search,
}: {
  size?: number;
  search?: string;
}) {
  return getBrands({
    size,
    search,
  });
}

export async function postBrandAction(params: PostBrandParams) {
  return postBrand(params);
}

export async function patchBrandAction(params: PatchBrandParams) {
  return patchBrand(params);
}

export async function getTagsAction({
  size = 10,
  search,
}: {
  size?: number;
  search?: string;
}) {
  return getTags({
    size,
    search,
  });
}

export async function postLocationAction({
  name,
}: {
  name: string;
}) {
  return postLocation({
    name,
  });
}

export async function postTagAction({
  name,
}: {
  name: string;
}) {
  return postTag({
    name,
  });
}

export async function replaceTagsAction({
  brandId,
  tagIds,
}: {
  brandId: string;
  tagIds: string[];
}) {
  return replaceTags({
    brandId,
    tagIds,
  });
}

export async function getBrandTagsAction({
  id,
}: {
  id: string;
}) {
  return getBrandTags({
    id,
  });
}

export async function postReportAction(
  data: Partial<Omit<ReportsRecord, "id">>,
) {
  return postReport(data);
}

export async function generateSummary({
  text,
  brand,
}: {
  text: string;
  brand: string;
}) {
  // Use OpenAI to generate a summary of the given content
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Berikan saya ringkasan pendek dalam indonesia dari text berikut mengenai alasan brand ${brand} diboikot : ${text}`,
      },
    ],
  });

  return res?.choices?.[0]?.message?.content;
}

export async function generateBrandDescription({
  text,
}: {
  text: string;
}) {
  // Use OpenAI to generate a summary of the given content
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Berikan saya deskripsi pendek dalam indonesia dari text berikut : ${text}`,
      },
    ],
  });

  return res?.choices?.[0]?.message?.content;
}

export async function upsertBrandMarkSourcesAction({
  brandId,
  markSources,
}: {
  brandId: string;
  markSources: Pick<MarkSourcesRecord, "name" | "url">[];
}) {
  return upsertBrandMarkSources({
    brandId,
    markSources,
  });
}
