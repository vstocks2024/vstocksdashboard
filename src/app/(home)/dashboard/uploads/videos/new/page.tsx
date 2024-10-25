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
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB

const FormSchema = z.object({
  videofile: z.instanceof(File).refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, "File size must be less than 5MB"),
});

export default function NewVideoPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    form.resetField("videofile");
    console.log(data);
    setLoading(true);
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/videos/singlevideofile`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(resp);
    if (resp.status === 201 && resp.statusText === "Created") {
      setLoading(false);
      console.log(resp);
      router.refresh();
      toast({
        title: "Success",
        description: `Video successfully submitted`,
      });
    } else {
      console.log(resp);
      setLoading(false);
      router.refresh();
      toast({
        title: "Failure",
        description: "Video doesn't get submitted please upload it properly",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full">
          <Breadcrumb pageName="New Video" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="videofile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Video</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={undefined}
                        className="text-white bg-gray-800 hover:bg-gray-700 cursor-pointer"
                        type="file"
                        placeholder="upload video"
                        accept="video/*"
                        onChange={(event) =>
                          field.onChange(
                            event.target.files && event.target.files[0]
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Upload the video file of any format
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
