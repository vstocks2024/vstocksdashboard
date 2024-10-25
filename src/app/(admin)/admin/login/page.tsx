"use client";
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
import { useEffect, useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminAuthContext } from "@/context/AdminAuthContext";
import { redirect, useRouter } from "next/navigation";

const FormSchema = z.object({
  adminname: z
    .string()
    .min(3, { message: "Minimum characters must be 3" })
    .max(50, { message: "Maximum characters must be 50" }),
  password: z
    .string()
    .min(6, { message: "Minimum alpha numeric characters must be 6" }),
});

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const adminauthcontext = useAdminAuthContext();
  console.log(adminauthcontext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      adminname: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const resp = await fetch(
      `/api/admin/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(data),
      }
    );
    const respData = await resp.json();
    console.log(respData);
    if (respData.error) {
      console.log(respData.error);
    } else {
      
      localStorage.setItem("dashboard-admin", JSON.stringify(respData));
      adminauthcontext.setAuthAdmin(respData);
      router.push("/dashboard/customers");
      // redirect("/dashboard/vectors");
    }

    setLoading(false);
  }

 
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                encType="multipart/form-data"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="adminname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Admin Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the admin name for login
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the password for login
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
          </CardContent>
        </Card>
      </div>
    </>
  );
}
