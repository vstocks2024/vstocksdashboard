import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Customers, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
export const dynamic = 'force-dynamic'

async function getData(): Promise<Customers[]> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/customers/listall`, {
    method: "GET",
    cache: "no-store",
  });
  if (resp.status===200 && resp.statusText==="OK")  return resp.json();
 return [];
}
export default async function CustomersPage() {
  const data = await getData();
  ;
  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full max-w-[1000px]">
          <Breadcrumb pageName="Customers" />
          <div className="container mx-auto py-2">
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
