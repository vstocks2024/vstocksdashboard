import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Vectors, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import NewVectorButton from "./_components/NewVectorButton";



async function getVectorsData():Promise<Vectors[]>{
 
const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/vectors/listall`,{
  method:"GET",
  cache:"no-store"
});

  if (resp.status === 200 && resp.statusText === "OK") return resp.json();
  return [];

}


export default async function VectorPage() {

  const data = await getVectorsData();
  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full ">
          <Breadcrumb pageName="Vectors" />
          <div className="container mx-auto py-2">
            <NewVectorButton />
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
