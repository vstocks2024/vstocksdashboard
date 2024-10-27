import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

import { Animation_Url, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import NewAnimationButton from "./_components/NewAnimationButton";

async function getData(): Promise<Animation_Url[]> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/animations/listall`,{
    method:"GET",
    cache:"no-store"
  });
  
    if (resp.status === 200 && resp.statusText === "OK") return resp.json();
    return [];
  
}

export default async function AnimationPage() {
  const data = await getData();
  return (
    <>
      <DefaultLayout>
        <main className="mx-auto w-full ">
          <Breadcrumb pageName="Animations" />
          <div className="container mx-auto py-2">
            <NewAnimationButton/>
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
