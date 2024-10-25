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
import { useRouter, useSearchParams } from "next/navigation";

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
  id:z.string(),
  name: z
    .string()
    .min(2, { message: "Minimum characters must be 3" })
    .max(50, { message: "Maximum characters must be 50" }),
  description: z
    .string()
    .min(2, { message: "Minimum characters must be 2" })
    .max(500, { message: "Maximum characters must be 500" }),
  category_id: z.array(categoryoptionSchema).min(1),
  tag_id: z.array(tagoptionSchema).min(1),
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
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/categories/listidname`
  );
  if (resp.status === 200 && resp.statusText === "OK") return resp.data;
  return [];
}

async function getTagsData(): Promise<z.infer<typeof TagSchema>[]> {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/tags/listidname`
  );
  if (resp.status === 200 && resp.statusText === "OK") return resp.data;
  return [];
}
export default function EditVectorsPage() {
  const [id,setId]=useState<string>("");
  const [name,setName]=useState<string>("");
  const [description,setDescription]=useState<string>("");
  ////////////////////////////////////////////////////////
  
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const vector_id=searchParams.get("vector") as string;
  if (!vector_id) {
    router.push("/vectors");
  } 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: vector_id,
      name: "",
      description: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
     setLoading(true);
    const resp = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}/vectors/update`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (resp.status === 200 && resp.statusText === "OK") {
      console.log(resp);
      setLoading(false);
      toast({
        title: "Success",
        description: `Vector Successfully Updated`,
      });
    } else {
      console.log(resp);
      setLoading(false);
      toast({
        title: "Failure",
        description:
          "Vector doesn't get updated please fill the details carefully",
        variant: "destructive",
      });
    }
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
          { label: item.name, value: item.id, disable: false },
        ]);
      });
    })();
  }, [category]);

  useEffect(() => {
    (async () => {
      tag.map((item) => {
        setTagOption((prev) => [
          ...prev,
          { label: item.name, value: item.id, disable: false },
        ]);
      });
    })();
  }, [tag]);

  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="Edit Vector" />
          <Form {...form}>
            <form
              encType="multipart/form-data"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
                    <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vector Id</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormDescription>
                      Vector Id is unique and can not be changed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              { (categoryOption && categoryOption.length > 0) ? (
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
                      <FormMessage />
                    </FormItem>
                  )}
                />) : (<></>)}
             { (tagOption && tagOption.length>0) ? <FormField
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
                    <FormMessage />
                  </FormItem>
                )}/>:(<></>)}
              <FormField
                control={form.control}
                name="vectorfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={undefined}
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
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="inline-flex flex-row items-center justify-between gap-x-2"> */}
              <LoadingButton loading={loading} type="submit">
                Submit
              </LoadingButton>
              &nbsp;&nbsp;
              <Button onClick={()=>router.back()} type="reset">Back</Button>
              {/* </div> */}
            </form>
          </Form>
        </main>
      </DefaultLayout>
    </>
  );
}
