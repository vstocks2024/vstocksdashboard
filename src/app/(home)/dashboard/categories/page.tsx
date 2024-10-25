import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Category, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import NewCategoryButton from "./_components/NewCategoryButton";
export const dynamic = "force-dynamic";

async function getData(): Promise<Category[]> {
  const resp=await fetch(`${process.env.NEXT_PUBLIC_URL}/categories/list_categories`,{
    method:"GET",
    cache:"no-store",
  });
  if(!resp.ok){
    throw new Error("Failed to fetch data");
  }
  return resp.json();
}


export default async function CategoryPage() {
  const data = await getData();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />
      <div className="container mx-auto py-2">
        <NewCategoryButton />
        <DataTable columns={columns} data={data} />
      </div>
    </DefaultLayout>
  );
}
