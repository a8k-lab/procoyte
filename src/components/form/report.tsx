"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type ReportSchema, reportSchema } from "@/lib/schema";

export const ReportForm = () => {
  const form = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      name: "",
      purpose: "0",
      imageUrl: "",
      reason: "",
      proofUrl: "",
      alternative: "",
    },
  });

  const onSubmit = (values: ReportSchema) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("submitted:", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-left"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Nama</FormLabel>
              <Input {...field} placeholder="Masukkan nama Brand atau Produk" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Tujuan Lapor</FormLabel>
              {/* Radio */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name="purpose"
                  className="flex gap-6"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      False Information
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Lapor Brand/Produk
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar/Logo</FormLabel>
              <Input {...field} type="file" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Komentar/Penjelasan</FormLabel>
              <Input {...field} placeholder="Masukkan Penjelasan" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="proofUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Link Bukti</FormLabel>
              <Input {...field} placeholder="Masukkan Bukti" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alternative"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternative</FormLabel>
              <Input
                {...field}
                placeholder="Masukkan Brand atau Produk alternative"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
