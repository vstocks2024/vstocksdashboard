"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteButton({ cat_id }: { cat_id: string }) {
  const router = useRouter();
  const handleDeleteCategory = async (id: string) => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/categories/delete/${id}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    router.refresh();
  };
  
  return (
    <>
      <Button
        className="w-full"
        variant={"destructive"}
        onClick={() => handleDeleteCategory(cat_id)}
      >
        Delete
      </Button>
    </>
  );
}
