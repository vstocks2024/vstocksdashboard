import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteVideoButton({ video_id }: { video_id: string }) {
  const router = useRouter();
  const handleDeleteTag = async (id: string) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/videos/delete/${id}`
      );
      if (resp.status === 200 && resp.statusText === "OK") {
        console.log(resp);
        router.refresh();
        toast({
          title: "Success",
          description: `Video Successfully Deleted`,
        });
      } else {
        console.log(resp);
        toast({
          title: "Failure",
          description: "Video doesn't get delete",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Exception is raised please contact admin");
    }
  };
  return (
    <>
      <Button variant={"destructive"} className="w-full" onClick={() => handleDeleteTag(video_id)}>
        Delete
      </Button>
    </>
  );
}
