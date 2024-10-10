import { Icon } from "@iconify/react";
import sanitizeHtml from "sanitize-html";

import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductMarkCardProps =
  | {
      isMarked?: false;
    }
  | {
      isMarked: true;
      name: string;
      owner: string;
      content: string;
      sources: Array<{
        name: string;
        url: string;
      }>;
      proofUrl: string;
    };

export const ProductMarkCard = (props: ProductMarkCardProps) => {
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
          ? "Produk ini masuk ke daftar boikot!"
          : "Produk ini tidak diboikot"}
      </h1>

      {props.isMarked ? (
        <div className="flex flex-col items-center gap-6">
          <div>
            <h2>
              {props.name} dimiliki oleh <strong>{props.owner}</strong>.
            </h2>

            <p
              className="my-5"
              // biome-ignore lint: This is a sanitized string
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.content) }}
            />

            <div className="font-bold">
              <h2>Source:</h2>
              <ul>
                {props.sources?.map((source, idx) => (
                  <li key={source.name}>
                    {idx + 1}.{" "}
                    <a
                      href={source.url}
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

          <LinkButton href={props.proofUrl} variant="destructive">
            <Icon icon="majesticons:open-line" className="size-6" />
            Open Proof
          </LinkButton>
        </div>
      ) : (
        <p>Produk ini tidak masuk ke daftar boikot.</p>
      )}
    </article>
  );
};
