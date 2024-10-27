"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";


const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/svg"];

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember", disable: true },
  { label: "Gatsby", value: "gatsby", disable: true },
  { label: "Astro", value: "astro" },
];

const categoryoptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const tagoptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum characters must be 3" })
    .max(50, { message: "Maximum characters must be 50" }),
  description: z
    .string()
    .min(2, { message: "Minimum characters must be 2" })
    .max(500, { message: "Maximum characters must be 500" }),
  category_id: z.array(categoryoptionSchema).min(1, {
    message:
      "Minimum 1 category has to be there if no category is showing add category first then add a vector",
  }),
  tag_id: z.array(tagoptionSchema).min(1, {
    message:
      "Minimum 1 tag has to be there if no tag is showing add tag first then add a vector",
  }),
  vectorfile: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine((file: File) => {
      return !file || ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a SVG or JPEG"),
});

const CategorySchema = z.object({
  id: z.string().min(1, { message: "Id must be of min 1 character" }),
  name: z.string().min(1, { message: "Name should be  of min 2 character" }),
});

const TagSchema = z.object({
  id: z.string().min(1, { message: "Id must be of min 1 character" }),
  name: z.string().min(1, { message: "Name should be  of min 2 character" }),
});

async function getCategorysData(): Promise<z.infer<typeof CategorySchema>[]> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/categories/listidname`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (resp.status === 200 && resp.statusText === "OK") return resp.json();
  return [];
 
}

async function getTagsData(): Promise<z.infer<typeof TagSchema>[]> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/tags/listidname`, {
    method: "GET",
    cache: "no-store",
  });
  if (resp.status === 200 && resp.statusText === "OK") return resp.json();
  return [];
}
export default function NewVectorsPage2() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setLoading(true);
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/vectors/new3`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (resp.status === 201 && resp.statusText === "Created") {
      console.log(resp);
      (()=>handleFormReset())();
      setLoading(false);
      (()=>form.reset())();
      toast({
        title: "Success",
        description: `Vector Successfully Submitted`,
      });
    } else {
      console.log(resp);
      setLoading(false);
      toast({
        title: "Failure",
        description:
          "Vector doesn't get added please fill the details carefully",
        variant: "destructive",
      });
    }
  }

  function handleFormReset(){
    form.resetField("name");
    form.resetField("description");
    form.resetField("category_id");
    form.resetField("tag_id");
    form.resetField("vectorfile");
  }

  const [category, setCategory] = useState<z.infer<typeof CategorySchema>[]>(
    []
  );

  const [tag, setTag] = useState<z.infer<typeof TagSchema>[]>([]);

  const [categoryOption, setCategoryOption] = useState<Option[]>([]);
  const [tagOption, setTagOption] = useState<Option[]>([]);

  useEffect(() => {
    (async () => {
      setCategory(await getCategorysData());
      setTag(await getTagsData());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      category.map((item) => {
        setCategoryOption((prev) => [
          ...prev,
          { label: item.name, value: item.id},
        ]);
      });
    })();
  }, [category]);

  useEffect(() => {
    (async () => {
      tag.map((item) => {
        setTagOption((prev) => [
          ...prev,
          { label: item.name, value: item.id},
        ]);
      });
    })();
  }, [tag]);

  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="New Vector" />
          <Form {...form}>
            <form
              encType="multipart/form-data"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vector Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Vector Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Write a name of vector image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vector Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a brief description about the category"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a brief description about this vector image word
                      limit is upto(500 words).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {categoryOption && categoryOption.length > 0 ? (
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vector Category</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={categoryOption}
                          placeholder="Select Category for Vector"
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Select atleast one category for the vector
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <></>
              )}
              {tagOption && tagOption.length > 0 ? (
                <FormField
                  control={form.control}
                  name="tag_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vector Tags</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={tagOption}
                          placeholder="Select Tags for Vector"
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Select at atleast one tag  for the vector
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <></>
              )}
              <FormField
                control={form.control}
                name="vectorfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Vector</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={undefined}
                        className="text-white bg-gray-800 hover:bg-gray-700"
                        type="file"
                        placeholder="shadcn"
                        accept="image/jpeg, image/svg"
                        onChange={(event) =>
                          field.onChange(
                            event.target.files && event.target.files[0]
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Upload the vector image file in jpeg or svg format
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="inline-flex flex-row items-center justify-between gap-x-2"> */}
              <LoadingButton
                loading={loading}
                className="bg-sky-600 hover:bg-sky-500 text-white"
                variant={"default"}
                type="submit"
              >
                Submit
              </LoadingButton>
              &nbsp;&nbsp;
              <Button
                variant={"outline"}
                className="border border-sky-600 hover:border-sky-500"
                onClick={() => form.reset()}
                type="reset"
              >
                Reset
              </Button>
              {/* </div> */}
            </form>
          </Form>
        </main>
      </DefaultLayout>
    </>
  );
}
