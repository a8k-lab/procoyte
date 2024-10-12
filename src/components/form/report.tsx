"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { type ControllerRenderProps, useForm } from "react-hook-form";

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
import { toast } from "@/hooks/use-toast";
import { type ReportSchema, reportSchema } from "@/lib/schema";
import { UploadButton } from "@/lib/uploadthings";
import { postReportAction } from "@/server/actions";

export const ReportForm = () => {
  const form = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      name: "",
      purpose: "report-brand-product",
      imageUrl: "",
      reason: "",
      proofUrl: "",
      alternative: "",
    },
  });
  const { isSubmitting } = form.formState;

  const getPayloadFromData = (data: ReportSchema) => {
    return {
      name: data.name ?? "",
      purpose: data.purpose ?? "report-brand-product",
      imageUrl: data.imageUrl ?? "",
      reason: data.reason ?? "",
      proofUrl: data.proofUrl ?? "",
      alternative: data.alternative ?? "",
    };
  };

  const onSubmit = async (values: ReportSchema) => {
    try {
      console.log("submitted:", values);
      const payload = getPayloadFromData(values);
      await postReportAction(payload);
      toast({
        variant: "default",
        title: "Sukses!",
        description: "Laporan berhasil dikirim",
      });
      form.reset();
    } catch (error) {
      console.error("error", error);
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Laporan gagal dikirim",
      });
    }
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
                      <RadioGroupItem value="false-information" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      False Information
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="report-brand-product" />
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
          render={({ field }) => <ImageUpload field={field} />}
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

const ImageUpload = ({
  field,
}: {
  field: ControllerRenderProps<ReportSchema, "imageUrl">;
}) => {
  return (
    <FormItem>
      <FormLabel>Gambar/Logo</FormLabel>
      <Image src={field.value || ""} alt="" width={200} height={100} />
      <p className="text-xs text-muted-foreground">{field.value}</p>
      <div className="w-min p-4">
        <UploadButton
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log("Error: ", error);
            alert(`ERROR! ${error.message}`);
          }}
          onClientUploadComplete={res => {
            field.onChange(res[0].url);
          }}
          endpoint="imageUploader"
        />
      </div>
    </FormItem>
  );
};
