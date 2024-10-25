import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteAnimationButton({
  animation_id,
}: {
  animation_id: string;
}) {
  const router = useRouter();
  const handleDeleteAnimation = async (id: string) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/animations/delete/${id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.status === 200 && resp.statusText === "OK") {
        router.refresh();
        console.log(resp);
        toast({
          title: "Success",
          description: `Animation Successfully Deleted`,
        });
      } else {
        console.log(resp);
        toast({
          title: "Failure",
          description: "Animation can't be deletd",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Exception Raised");
    }
  };
  return (
    <>
      <Button
        className="w-full"
        variant={"destructive"}
        onClick={() => handleDeleteAnimation(animation_id)}
      >
        Delete
      </Button>
    </>
  );
}
