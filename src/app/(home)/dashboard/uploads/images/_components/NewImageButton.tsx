"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function NewImageButton() {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center justify-end my-2">
      <Button
        onClick={() => router.push("/dashboard/uploads/images/new")}
        className="bg-sky-600 text-white hover:bg-sky-500"
        variant={"default"}>
        + New Image
      </Button>
    </div>
  );
}
