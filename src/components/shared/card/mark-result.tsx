import { Icon } from "@iconify/react";
import sanitizeHtml from "sanitize-html";

import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BrandsRecord, MarkSourcesRecord } from "@/xata";

type MarkResultCardProps = Partial<
  BrandsRecord & {
    isMarked: boolean;
    markedSources: MarkSourcesRecord[];
  }
>;

export const MarkResultCard = (props: MarkResultCardProps) => {
  console.log("card:", props);
  return (
    <article
      className={cn(
        "p-6 text-left text-sm text-muted-foreground bg-white border rounded-lg",
        props.isMarked ? "border-destructive" : "border-secondary",
      )}
    >
      <h1
        className={cn(
          "mb-1.5 font-semibold text-2xl",
          props.isMarked ? "text-destructive" : "text-secondary",
        )}
      >
        {props.isMarked
          ? `${props.name} masuk ke daftar boikot!`
          : "Produk/Brand ini tidak diboikot"}
      </h1>

      {props.isMarked ? (
        <div className="md:flex flex-col items-center">
          <div className="w-full">
            <h2>
              {props.name}
              {props.owned_by ? ` is owned by ${props.owned_by.name}` : " -"}
            </h2>

            <p
              className="my-5"
              // biome-ignore lint: This is a sanitized string
              dangerouslySetInnerHTML={{
                __html: props.mark_reason
                  ? sanitizeHtml(props.mark_reason)
                  : "-",
              }}
            />

            <div className="font-bold">
              <h2>Source:</h2>
              <ul>
                {props.markedSources?.map((source, idx) => (
                  <li key={source.name}>
                    {idx + 1}.{" "}
                    <a
                      href={source.url ?? "#"}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <LinkButton
            href={props?.markedSources?.[0].url ?? "#"}
            variant="destructive"
            className="mt-6"
          >
            <Icon icon="majesticons:open-line" className="size-6" />
            Open Proof
          </LinkButton>
        </div>
      ) : (
        <p>"{props.name}" tidak masuk ke daftar boikot.</p>
      )}
    </article>
  );
};
