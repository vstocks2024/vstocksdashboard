import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Tag, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import NewTagButton from "./_components/NewTagButton";
import { toast } from "@/components/ui/use-toast";
import { prisma } from "@/prismaClient";
export const dynamic = "force-dynamic";

async function getData(): Promise<Tag[]> {
  const resp=await fetch(`${process.env.NEXT_PUBLIC_URL}/tags/list_tags`,{
    method:"GET",
    cache:"no-store",
  });
  if(!resp.ok){
    throw new Error("Failed to fetch data");
  }
  return resp.json();
}


export default async function TagsPage() {
  const data = await getData();
  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full">
          <Breadcrumb pageName="Tags" />
          <div className="container mx-auto py-2">
            <NewTagButton />
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
