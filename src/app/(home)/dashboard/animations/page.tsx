import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

import { Animation_Url, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import NewAnimationButton from "./_components/NewAnimationButton";
import { prisma } from "@/prismaClient";
export const dynamic = "force-dynamic";

async function getData(): Promise<Animation_Url[]> {
  try{
  await prisma.animations_url
    .findMany({})
    .then((dbresolve) => {
      return dbresolve;
    })
    .catch((dbreject) => {
      console.log(dbreject);
    });
  }
  catch(error){
    console.log(error);
  }
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
