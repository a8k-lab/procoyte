"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";

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
import { toast } from "@/hooks/use-toast";
import { type AdminBrandSchema, adminBrandSchema } from "@/lib/schema";
import { UploadButton } from "@/lib/uploadthings";
import {
  getBrandsAction,
  getLocationsAction,
  patchBrandAction,
  postBrandAction,
} from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";

export default function BrandFormPage({
  defaultValues,
  editId,
}: {
  defaultValues?: AdminBrandSchema;
  editId?: string;
}) {
  const form = useForm<AdminBrandSchema>({
    resolver: zodResolver(adminBrandSchema),
    defaultValues: defaultValues,
  });

  const edit = !!editId;

  const getPayloadFromData = (data: AdminBrandSchema) => {
    return {
      imageUrl: data.imageUrl ?? "",
      name: data.name ?? "",
      price: data.price ?? 0,
      marked: data?.marked ? +data.marked : 0,
      mark_reason: data.markReason ?? "",
      location: data.location?.value
        ? {
            id: data.location?.value,
          }
        : undefined,
      owned_by: data.ownedBy?.value
        ? {
            id: data.ownedBy.value,
          }
        : undefined,
    };
  };

  const handleSubmit = form.handleSubmit(async data => {
    if (edit) {
      await patchBrandAction({
        id: editId,
        ...getPayloadFromData(data),
      });

      toast({
        variant: "default",

        title: "Sukses!",
        description: "Brand berhasil diubah",
      });
    } else {
      await postBrandAction(getPayloadFromData(data));
      toast({
        variant: "default",
        title: "Sukses!",
        description: "Brand berhasil ditambahkan",
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="[&>div]:mb-4">
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
              <TextEditor
                onChange={value => field.onChange(value?.editor?.getHTML())}
                value={field.value ?? ""}
              />
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
  field: ControllerRenderProps<AdminBrandSchema, "location">;
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

  console.log(field.value, "TEST");
  return (
    <FormItem>
      <FormLabel className="block">Lokasi</FormLabel>
      <Combobox
        async
        inputValue={inputValue}
        onChange={value =>
          field.onChange({
            label: value?.label ?? "",
            value: value?.value ?? "",
          })
        }
        value={field.value}
        clearable
        options={options}
        setInputValue={value => setInputValue(value)}
      />
    </FormItem>
  );
}

function OwnerBrandCombobox({
  field,
}: {
  field: ControllerRenderProps<AdminBrandSchema, "ownedBy">;
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
        creatable
        onChange={value =>
          field.onChange({
            label: value?.label ?? "",
            value: value?.value ?? "",
          })
        }
        value={field.value}
        async
        inputValue={inputValue}
        clearable
        options={options}
        setInputValue={value => setInputValue(value)}
      />
    </FormItem>
  );
}

function ImageUpload({
  field,
}: {
  field: ControllerRenderProps<AdminBrandSchema, "imageUrl">;
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
