import { Icon } from "@iconify/react";
import { cva } from "class-variance-authority";

import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const productMarkCardVariants = cva(
  "p-6 text-left text-sm text-muted-foreground bg-white border rounded-lg",
  {
    variants: {
      variant: {
        unmarked: "border-secondary",
        marked: "border-destructive/50",
      },
    },
    defaultVariants: {
      variant: "marked",
    },
  },
);

type ProductMarkCardProps =
  | {
      variant?: "unmarked";
    }
  | {
      variant: "marked";
      sources: Array<{
        name: string;
        url: string;
      }>;
    };

export const ProductMarkCard = ({ variant }: ProductMarkCardProps) => {
  return (
    <article className={cn(productMarkCardVariants({ variant }))}>
      <h1
        className={cn(
          "mb-1.5 font-semibold text-2xl",
          variant === "unmarked" ? "text-secondary" : "text-destructive",
        )}
      >
        {variant === "unmarked"
          ? "Produk ini tidak diboikot"
          : "Produk ini masuk ke daftar boikot!"}
      </h1>

      {variant === "unmarked" ? (
        <p>Produk ini tidak masuk ke daftar boikot.</p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div>
            <h2>24s dimiliki oleh LVMH</h2>

            <p className="my-5">
              Bernard Arnault, the chairman CEO of LMHV Moet Hennesy-Louis
              Vuitton, and the world’s richest man according to Forbes, has
              invested in cybersecurity firm, Wiz, the israeli maker of cloud
              security solutions fir enterprises
            </p>

            <div className="font-bold">
              <h2>Source:</h2>
              <ul className="">
                <li>
                  1.{" "}
                  <a
                    href="https://www.timesofisrael.com/unilever-reports-diving-sales-in-southeast-asia-amid-anti-israel-boycotts/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline"
                  >
                    Link 1
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <LinkButton href="#" variant="destructive">
            <Icon icon="majesticons:open-line" className="size-6" />
            Open Proof
          </LinkButton>
        </div>
      )}
    </article>
  );
};
