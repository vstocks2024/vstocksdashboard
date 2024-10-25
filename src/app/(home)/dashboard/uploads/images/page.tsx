import { toast } from "@/components/ui/use-toast";
import { Image, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import NewImageButton from "./_components/NewImageButton";
export const dynamic = "force-dynamic";

async function getData(): Promise<Image[]> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/images/listall`, {
    method: "GET",
    cache: "no-store",
  });
  if (resp.status===200 && resp.statusText==="OK") return resp.json(); 
  return [];
} 


export default async function ImagePage() {
  const data = await getData();
  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full">
          <Breadcrumb pageName="Images" />
          <div className="container mx-auto py-2">
            <NewImageButton />
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
