"use client";
import { type ControllerRenderProps, useForm } from "react-hook-form";

import TextEditor from "@/components/shared/text-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import SelectBox from "@/components/ui/selectbox";
import { toast } from "@/hooks/use-toast";
import { type AdminBrandSchema, adminBrandSchema } from "@/lib/schema";
import { UploadButton } from "@/lib/uploadthings";
import {
  generateBrandDescription,
  generateSummary,
  getBrandsAction,
  getLocationsAction,
  getTagsAction,
  patchBrandAction,
  postBrandAction,
  postLocationAction,
  postTagAction,
  replaceTagsAction,
  upsertBrandMarkSourcesAction,
} from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

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
  async function getLocationPayloadFromData(data: AdminBrandSchema) {
    if (!data?.location?.value) return null;
    if (data?.location?.value === "__new__") {
      const resp = await postLocationAction({
        name: data.location?.label ?? "",
      });
      return {
        id: resp.id,
      };
    }

    return {
      id: data.location?.value,
    };
  }

  async function getTagPayloadFromData(data: AdminBrandSchema) {
    if (data?.tags?.length === 0) {
      return [];
    }

    const tagsPayload: {
      label: string;
      value: string;
    }[] = [];

    for (const tag of data?.tags ?? []) {
      if (tag.value === "__new__") {
        const resp = await postTagAction({
          name: tag.label ?? "",
        });

        tagsPayload.push({
          value: resp.id,
          label: resp.name ?? "-",
        });
      } else {
        tagsPayload.push({
          value: tag.value,
          label: tag.label,
        });
      }
    }

    return tagsPayload;
  }

  async function getPayloadFromData(data: AdminBrandSchema) {
    return {
      brand_description: data.brandDescription ?? "",
      imageUrl: data.imageUrl ?? "",
      name: data.name ?? "",
      price: data.price ?? 0,
      marked: data?.marked ? +data.marked : 0,
      mark_reason: data.markReason ?? "",
      location: await getLocationPayloadFromData(data),
      boosted: data.boosted ?? false,
      owned_by: data.ownedBy?.value
        ? {
            id: data.ownedBy.value,
          }
        : null,
    };
  }

  const handleSubmit = form.handleSubmit(async data => {
    if (edit) {
      const res = await patchBrandAction({
        id: editId,
        ...(await getPayloadFromData(data)),
      });

      const tagsPayload = await getTagPayloadFromData(data);
      await replaceTagsAction({
        brandId: res?.id,
        tagIds: tagsPayload?.map(tag => tag.value) ?? [],
      });

      await upsertBrandMarkSourcesAction({
        brandId: res?.id,
        markSources:
          data?.markSources?.map(markSource => ({
            name: markSource.name,
            url: markSource.url,
          })) ?? [],
      });

      toast({
        variant: "default",

        title: "Sukses!",
        description: "Brand berhasil diubah",
      });
    } else {
      const payload = await getPayloadFromData(data);
      const res = await postBrandAction(payload);

      const tagsPayload = await getTagPayloadFromData(data);
      await replaceTagsAction({
        brandId: res?.id,
        tagIds: tagsPayload?.map(tag => tag.value) ?? [],
      });
      await upsertBrandMarkSourcesAction({
        brandId: res?.id,
        markSources:
          data?.markSources?.map(markSource => ({
            name: markSource.name,
            url: markSource.url,
          })) ?? [],
      });
      toast({
        variant: "default",
        title: "Sukses!",
        description: "Brand berhasil ditambahkan",
      });
    }
  });

  const brand = form.watch("name");

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
          name="brandDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Brand</FormLabel>
              <GenerateBrandDescription />
              <TextEditor
                onChange={value => field.onChange(value?.editor?.getHTML())}
                value={field.value ?? ""}
              />
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
                  value={field.value}
                  name="marked"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" checked={field.value === "0"} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Tidak Ditandai
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem checked={field.value === "1"} value="1" />
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
              <GenerateSummary brand={brand} />

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

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => <Tags field={field} />}
        />

        <FormField
          control={form.control}
          name="markSources"
          render={({ field }) => <MarkSources field={field} />}
        />

        <FormField
          control={form.control}
          name="boosted"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Boosted</FormLabel>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <p className="text-xs text-muted-foreground">
                  Boosted akan menaikan hasil pencarian alternative
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="ml-auto" type="submit">
          Simpan
        </Button>
      </form>
    </Form>
  );
}

function MarkSources({
  field,
}: {
  field: ControllerRenderProps<AdminBrandSchema, "markSources">;
}) {
  return (
    <FormItem>
      <FormLabel>Mark Sources</FormLabel>
      {/* Mark sources  yang telah dimasukan*/}
      {field.value?.map((markSource, index) => (
        <div key={markSource.name} className="flex items-center gap-2">
          <Input
            placeholder="Masukkan nama mark source"
            onChange={e =>
              field.onChange(
                field.value?.map((source, i) =>
                  i === index ? { ...source, name: e.target.value } : source,
                ),
              )
            }
            value={markSource.name}
            className="w-full"
          />
          <Input
            placeholder="Masukkan url mark source"
            onChange={e =>
              field.onChange(
                field.value?.map((source, i) =>
                  i === index ? { ...source, url: e.target.value } : source,
                ),
              )
            }
            value={markSource.url}
            className="w-full"
          />
          <Button
            type="button"
            onClick={() =>
              field.onChange(
                field.value?.filter((source, i) => i !== index) ?? [],
              )
            }
            className="w-fit"
          >
            Hapus
          </Button>
        </div>
      ))}
      <Button
        type="button"
        size="sm"
        variant="link"
        onClick={() =>
          field.onChange([...(field.value || []), { name: "", url: "" }])
        }
        className="w-fit"
      >
        Tambah
      </Button>
    </FormItem>
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

  return (
    <FormItem>
      <FormLabel className="block">Lokasi</FormLabel>
      <Combobox
        async
        inputValue={inputValue}
        onChange={value => {
          if (!value?.value) {
            field.onChange(null);
            return;
          }
          field.onChange({
            label: value?.label ?? "",
            value: value?.value ?? "",
          });
        }}
        creatable
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
        onChange={value => {
          if (!value?.value) {
            field.onChange(null);
            return;
          }
          field.onChange({
            label: value?.label ?? "",
            value: value?.value ?? "",
          });
        }}
        value={field.value || undefined}
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
      <Image
        src={field.value || "/images/logo.svg"}
        alt="Gambar"
        width={160}
        height={160}
      />
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

function Tags({
  field,
}: { field: ControllerRenderProps<AdminBrandSchema, "tags"> }) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );

  const fetchData = useCallback(async (inputValue: string) => {
    const response = await getTagsAction({
      size: 10,
      search: inputValue,
    });

    setOptions(
      response.map(tag => ({
        value: tag.id ?? "",
        label: tag.name ?? "",
      })),
    );
  }, []);

  const [inputValue, setInputValue] = useState("");

  const [debouncedInputValue] = useDebounceValue(inputValue, 500);

  useEffect(() => {
    fetchData(debouncedInputValue);
  }, [debouncedInputValue, fetchData]);

  return (
    <FormItem>
      <FormLabel className="block">Tags</FormLabel>

      <SelectBox
        searchTerm={inputValue}
        setSearchTerm={setInputValue}
        options={options}
        value={field.value}
        onChange={value => {
          field.onChange(value);
        }}
        creatable
      />
    </FormItem>
  );
}

function GenerateSummary({
  onGenerate,
  brand,
}: {
  onGenerate?: (value: string) => void;
  brand?: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const [summary, setSummary] = useState("");
  const [debouncedInputValue] = useDebounceValue(inputValue, 500);
  const [isLoading, setIsLoading] = useState(false);
  async function handleGenerate() {
    setIsLoading(true);
    const response = await generateSummary({
      text: debouncedInputValue,
      brand: brand || "-",
    });
    setSummary(response || "");
    onGenerate?.(response || "");
    setIsLoading(false);
  }

  return (
    <div className="p-4 bg-blue-50 rounded-md">
      <h1 className="mb-1 text-sm">Pembantu AI</h1>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Masukkan isi artikel untuk membuat ringkasan"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
          className="w-full"
        />
        <Button
          type="button"
          onClick={handleGenerate}
          className="w-fit"
          disabled={isLoading}
        >
          Buat Ringkasan
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{summary}</p>
    </div>
  );
}

function GenerateBrandDescription({
  onGenerate,
}: {
  onGenerate?: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [summary, setSummary] = useState("");
  const [debouncedInputValue] = useDebounceValue(inputValue, 500);
  const [isLoading, setIsLoading] = useState(false);
  async function handleGenerate() {
    setIsLoading(true);
    const response = await generateBrandDescription({
      text: debouncedInputValue,
    });
    setSummary(response || "");
    onGenerate?.(response || "");
    setIsLoading(false);
  }

  return (
    <div className="p-4 bg-blue-50 rounded-md">
      <h1 className="mb-1 text-sm">Pembantu AI</h1>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Masukkan isi artikel untuk membuat deskripsi"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
          className="w-full"
        />
        <Button
          type="button"
          onClick={handleGenerate}
          className="w-fit"
          disabled={isLoading}
        >
          Buat Deskripsi
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{summary}</p>
    </div>
  );
}
