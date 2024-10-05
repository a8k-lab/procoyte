"use client";
import { type ControllerRenderProps, useForm } from "react-hook-form";

import TextEditor from "@/components/shared/text-editor";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
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
import { UploadButton } from "@/lib/uploadthings";
import { getBrandsAction, getLocationsAction } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().min(0).max(5).optional(),
  marked: z.enum(["0", "1"]).optional(),
  imageUrl: z.string().optional(),
  location: z.object({ value: z.string(), label: z.string() }).optional(),
  markReason: z.string().optional(),
  ownedBy: z.object({ value: z.string(), label: z.string() }).optional(),
});

type FormSchemaData = z.infer<typeof FormSchema>;

export default function BrandFormPage({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof FormSchema>;
}) {
  const form = useForm<FormSchemaData>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="[&>div]:mb-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <Input {...field} placeholder="Masukkan nama brand" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <Input
                {...field}
                type="number"
                onChange={e => field.onChange(Number(e.target.value))}
                placeholder="Masukkan harga"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="marked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ditandai?</FormLabel>
              {/* Radio */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name="marked"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Tidak Ditandai
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">Ditandai</FormLabel>
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
          name="location"
          render={({ field }) => <LocationCombobox field={field} />}
        />
        <FormField
          control={form.control}
          name="markReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alasan di tandai</FormLabel>
              <TextEditor />
              {/* <Input {...field} placeholder="Masukkan alasan" /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownedBy"
          render={({ field }) => <OwnerBrandCombobox field={field} />}
        />

        <Button className="ml-auto" type="submit">
          Simpan
        </Button>
      </form>
    </Form>
  );
}

function LocationCombobox({
  field,
}: {
  field: ControllerRenderProps<FormSchemaData, "location">;
}) {
  const [inputValue, setInputValue] = useState("");

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );

  const fetchData = useCallback(async (inputValue: string) => {
    const response = await getLocationsAction({
      size: 10,
      search: inputValue,
    });

    setOptions(
      response.map(location => ({
        value: location.id,
        label: location.name,
      })),
    );
  }, []);

  const [debouncedInputValue] = useDebounceValue(inputValue, 500);

  useEffect(() => {
    fetchData(debouncedInputValue);
  }, [debouncedInputValue, fetchData]);

  return (
    <FormItem>
      <FormLabel className="block">Lokasi</FormLabel>
      <Combobox
        async
        inputValue={inputValue}
        onCreate={value =>
          field.onChange({
            label: value,
            value: "__new__",
          })
        }
        options={options}
        setInputValue={value => setInputValue(value)}
      />
    </FormItem>
  );
}

function OwnerBrandCombobox({
  field,
}: {
  field: ControllerRenderProps<FormSchemaData, "ownedBy">;
}) {
  const [inputValue, setInputValue] = useState("");

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );

  const fetchData = useCallback(async (inputValue: string) => {
    const response = await getBrandsAction({
      size: 10,
      search: inputValue,
    });

    setOptions(
      response.map(brand => ({
        value: brand.id ?? "",
        label: brand.name ?? "",
      })),
    );
  }, []);

  const [debouncedInputValue] = useDebounceValue(inputValue, 500);

  useEffect(() => {
    fetchData(debouncedInputValue);
  }, [debouncedInputValue, fetchData]);

  return (
    <FormItem>
      <FormLabel className="block">Pemilik brand</FormLabel>
      <Combobox
        async
        inputValue={inputValue}
        onCreate={value =>
          field.onChange({
            label: value,
            value: "__new__",
          })
        }
        options={options}
        setInputValue={value => setInputValue(value)}
      />
    </FormItem>
  );
}

function ImageUpload({
  field,
}: {
  field: ControllerRenderProps<FormSchemaData, "imageUrl">;
}) {
  return (
    <FormItem>
      <FormLabel>Gambar</FormLabel>
      <Image src={field.value || ""} alt="Gambar" width={200} height={200} />
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
}
