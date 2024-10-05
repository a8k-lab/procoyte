import { Icon } from "@iconify/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export default function FAQsPage() {
  return (
    <>
      <title>Procoyte | Frequently Asked Questions</title>

      <section>
        <div className="flex items-center justify-center gap-1.5">
          <Icon icon="streamline:star-2-solid" />
          <h1 className="font-semibold text-lg">Frequently Asked Questions</h1>
        </div>
        <p className="mt-2.5 text-muted-foreground text-sm text-balance">
          Pertanyaan yang sering ditanyakan mengenai Procoyte, temukan jawaban
          anda!
        </p>
      </section>

      <Accordion type="single" collapsible className="mt-3">
        {faqs.map((faq, idx) => (
          // biome-ignore lint: `faqs` is a static data
          <AccordionItem key={idx} value={`item-${idx}`} className="text-sm">
            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-left">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
