"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Combobox } from "@/components/ui/combobox";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getLocationsAction } from "@/server/actions";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().min(1).optional(),
  marked: z.number().min(0).max(1).optional(),
  imageUrl: z.string().optional(),
  location: z.string().optional(),
  markReason: z.string().optional(),
  ownedBy: z.string().optional(),
});

export default function BrandFormPage({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof FormSchema>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <Input {...field} placeholder="Masukkan nama brand" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <Input {...field} placeholder="Masukkan harga" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="marked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ditandai?</FormLabel>
              <Input {...field} placeholder="Masukkan harga" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <Input {...field} placeholder="Masukkan URL gambar" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => <LocationCombobox />}
        />
        <FormField
          control={form.control}
          name="markReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alasan di tandai</FormLabel>
              <Input {...field} placeholder="Masukkan alasan" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pemilik</FormLabel>
              <Input {...field} placeholder="Masukkan nama pemilik" />
            </FormItem>
          )}
        />

        <button type="submit">Simpan</button>
      </form>
    </Form>
  );
}

function LocationCombobox() {
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

  useEffect(() => {
    fetchData(inputValue);
  }, [inputValue, fetchData]);

  return (
    <FormItem>
      <FormLabel>Lokasi</FormLabel>
      <Combobox
        options={options}
        setInputValue={value => setInputValue(value)}
      />
    </FormItem>
  );
}
