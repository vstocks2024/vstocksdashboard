import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteButton({ tag_id }: { tag_id: string }) {
  const router = useRouter();
  const handleDeleteTag = async (id: string) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/tags/delete/${id}`
      );
      if (resp.status === 200 && resp.statusText === "OK") {
        console.log(resp);
        router.refresh();
        toast({
          title: "Success",
          description: `Tag Successfully Deleted`,
        });
      } else {
        console.log(resp);
        toast({
          title: "Failure",
          description: "Tag doesn't get delete",
          variant: "destructive",
        });
      }
    } catch (error) {
      throw new Error("Exception is raised please contact admin");
    }
  };
  return (
    <>
      <Button variant={"destructive"} onClick={() => handleDeleteTag(tag_id)}>
        Delete
      </Button>
    </>
  );
}
