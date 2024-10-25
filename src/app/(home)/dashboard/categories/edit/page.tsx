"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { set, z } from "zod";
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
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { Category } from "../_components/columns";
import { useState } from "react";

const FormSchema = z.object({
  id: z.string().min(1, { message: "Category Id is required to update" }),
  name: z
    .string()
    .min(2, { message: "Minimum characters must be 3" })
    .max(50, { message: "Maximum characters must be 50" }),
  description: z
    .string()
    .min(2, { message: "Minimum characters must be 2" })
    .max(500, { message: "Maximum characters must be 500" }),
});

export default function EditCategoryPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category_id = searchParams.get("category") as string;
  if (!category_id) {
    router.push("/categories");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: category_id,
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    console.log(data);
    const resp = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}/categories/update`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.status === 200 && resp.statusText === "OK") {
      setLoading(false);
      form.reset();
      console.log(resp);
      toast({
        title: "Success",
        description: `Category Description Updated Successfully`,
      });

    } else {
      console.log(resp);
      setLoading(false);
      toast({
        title: "Failure",
        description: "Category Description can't be updated",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="Edit Category" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Id</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormDescription>
                      Category Id is unique and can not be changed.
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
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="Enter an updated name" /> */}
                      <Input placeholder="Category Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can change the category name but keep it unique.
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
                    <FormLabel>Category Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a brief description about the category"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can change the category description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="inline-flex flex-row items-center justify-between gap-x-2"> */}
              <LoadingButton variant={'default'} className="bg-sky-600 hover:bg-sky-500 text-white" loading={loading} type="submit">
                Submit
              </LoadingButton>
              &nbsp;&nbsp;
              <Button className="border text-white border-sky-600" variant={'outline'} onClick={() => router.back()}>Back</Button>
              {/* </div> */}
            </form>
          </Form>
        </main>
      </DefaultLayout>
    </>
  );
}
