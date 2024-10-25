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
import { useRef, useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum characters must be 2" })
    .max(50, { message: "Maximum characters must be 50" }),
  description: z
    .string()
    .min(2, { message: "Minimum characters must be 2" })
    .max(500, { message: "Maximum characters must be 500" }),
});

export default function NewTagsPage() {
const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    //console.log(data);
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/tags/new`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.status === 201 && resp.statusText === "Created") {
      form.reset();
      setLoading(false);
      console.log(resp);
      toast({
        title: "Success",
        description: `Tag Successfully Created`,
      });
    } else {
      console.log(resp);
      toast({
        title: "Failure",
        description:
          "Tag doesn't get created please provide a unique tag name and a valid description",
        variant: "destructive",
      });
    }
  }
  
  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full">
          <Breadcrumb pageName="New Tag" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Name</FormLabel>
                    <FormControl>
                      <Input  placeholder="Enter Tag Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a unique tag name
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
                    <FormLabel>Tag Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write the description about tag"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                        Enter a description for the tag
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="inline-flex flex-row items-center justify-between gap-x-2"> */}
              <LoadingButton loading={loading} className="bg-sky-600 hover:bg-sky-500 text-white" variant={"default"} type="submit">Submit</LoadingButton>&nbsp;&nbsp;
              <Button variant={"outline"} className="border border-sky-600 hover:border-sky-500" onClick={()=>form.reset()} type="reset">Reset</Button>
              {/* </div> */}
            </form>
          </Form>
        </main>
      </DefaultLayout>
    </>
  );
}
