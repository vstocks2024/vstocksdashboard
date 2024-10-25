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
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum characters must be 3" })
    .max(50, { message: "Maximum characters must be 50" }),
  description: z
    .string()
    .min(2, { message: "Minimum characters must be 2" })
    .max(500, { message: "Maximum characters must be 500" }),
});

export default function NewCategoryPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router=useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    //console.log(data);
    setLoading(true);
    const resp=await axios.post(`${process.env.NEXT_PUBLIC_URL}/categories/new`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(resp.status===201 && resp.statusText==="Created"){
        setLoading(false);
        form.reset();
        console.log(resp);
        router.refresh();
        toast({
          title:"Success",
         description:`Category Successfully Created`
        })
      }
      else{
        console.log(resp);
        setLoading(false);
        router.refresh();
        toast({
          title:"Failure",
          description:"Category doesn't get created please provide a unique category name and valid description",
          variant:"destructive"
        })
      }
    
  }
  
  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="New Category" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category Name" {...field} />
                    </FormControl>
                    <FormDescription>
                   Write a unique name for category
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
                     Write a brief description about the category
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
