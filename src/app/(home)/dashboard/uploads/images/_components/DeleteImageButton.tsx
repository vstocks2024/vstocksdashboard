"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteImageButton({ image_id }: { image_id: string }) {
  const router = useRouter();
  const handleDeleteImage = async (id: string) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/images/delete/${id}`
      );
      if (resp.status === 200 && resp.statusText === "OK") {
        console.log(resp);
        router.refresh();
        toast({
          title: "Success",
          description: `Image Successfully Deleted`,
        });
      } else {
        console.log(resp);
        toast({
          title: "Failure",
          description: "Image doesn't get delete",
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
      <Button
        className="w-full"
        variant={"destructive"}
        onClick={() => handleDeleteImage(image_id)}
      >
        Delete
      </Button>
    </>
  );
}
