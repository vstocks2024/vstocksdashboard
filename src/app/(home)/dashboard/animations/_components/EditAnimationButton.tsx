import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function EditAnimationButton({animation_id}:{animation_id:string}){
    const router=useRouter();
return <><Button variant={"default"} asChild  className="bg-sky-600 hover:bg-sky-500 text-white w-full"><a  target="_blank" href={`http://admin.editor.vstock.in`}>Edit</a></Button></>
}