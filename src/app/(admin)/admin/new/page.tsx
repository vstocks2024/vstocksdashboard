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
import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const FormSchema = z
  .object({
    fullname: z.string().min(2, { message: "Minimum  characters must be 2" }),
    adminname: z
      .string()
      .min(3, { message: "Minimum characters must be 3" })
      .max(50, { message: "Maximum characters must be 50" }),
    email: z.string(),
    phone: z
      .string()
      .min(10, { message: "Minimum number of digits must be 10" }).regex(phoneRegex,"Invalid Mobile Number"),
    password: z
      .string()
      .min(6, { message: "Minimum alpha numeric characters must be 6" }),
    confirmpassword: z
      .string()
      .min(6, { message: "Minimum alpha numeric characters must be 6" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmpassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmpassword"],
    }
  );

export default function NewAdminPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      adminname: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setLoading(true);
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/admin/auth/newadmin`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    try {
      if (resp.status === 201) {
        const respData = await resp.json();
        console.log(respData);
        toast({
          title: "Success",
          description: respData.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className="mx-auto  flex flex-col items-center justify-center my-10">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Add New Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                encType="multipart/form-data"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="true"
                          type="text"
                          placeholder="Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the full name of admin
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="adminname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="true"
                          type="text"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the adminname for login
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="true"
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the Email of Admin
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact No</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="true"
                          type="text"
                          placeholder="Contact No"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the contact number of admin
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
                <FormField
                  control={form.control}
                  name="confirmpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the confirm password for login
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
      </main>
    </>
  );
}
