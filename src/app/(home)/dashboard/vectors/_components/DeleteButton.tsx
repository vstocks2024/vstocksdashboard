import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteButton({ vector_id }: { vector_id: string }) {
  const router = useRouter();
  const handleDeleteVector = async (id: string) => {
    try {
      const resp = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/vectors/delete/${id}`,
        {
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
          description: `Vector Successfully Deleted`,
        });
      } else {
        console.log(resp);
        toast({
          title: "Failure",
          description: "Vector can't be deletd",
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
        onClick={() => handleDeleteVector(vector_id)}
      >
        Delete
      </Button>
    </>
  );
}
