import { fetchFilteredImages } from '@/lib/data';
import React from 'react'
import { DeleteImageButton } from '../DeleteImageButton';


export const TableImages = async ({query,currentPage}:{query:string;currentPage:number;}) => {
console.log(query);
console.log(currentPage);
const fetchedimages=await fetchFilteredImages(query,currentPage);
const fields_name=Object.keys(fetchedimages.data[0]);
const rows=fetchedimages.data;

  return (

<>
<section className="bg-gray-50 dark:bg-gray-900 my-4 w-full hidden md:flex">
        <div className="px-4 mx-auto max-w-screen-2xl lg:px-[1px] w-full">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                    <div className="flex items-center flex-1 space-x-4">
                        <h5 className=' inline-flex flex-row  items-center justify-between space-x-1'>
                            <span className="text-gray-500">Total Images:</span>
                            <span className="dark:text-white">{rows.length}</span>
                        </h5>
                        <h5 className='inline-flex flex-row  items-center justify-between space-x-1'>
                            <span className="text-gray-500">Total sales:</span>
                            <span className="dark:text-white">₹88.4k</span>
                        </h5>
                    </div>
                    <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                 
                        <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primaryfb-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            Export
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full text-sm  text-center text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>{
                fields_name && fields_name.map((val,ind,oa)=>{
                return (<th key={`${val}_${ind}`} scope="col" className="px-4 py-3  font-medium sm:pl-6">
                  {`${val}`.toUpperCase()}
                </th>);
                })
              }
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row:any)=>{
                    return (<tr key={row.id}  className="px-1 text-left border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="whitespace-nowrap px-1 py-3">
                    {row.id}
                  </td>
                  <td className=" px-1 py-3">
                    {row.image_name}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3">
                    {row.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3">
                    {row.updatedAt}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                  <DeleteImageButton  id={row.id}/>
                  </td>
                    </tr>);
                })
              }
            </tbody>
            </table>
          </div>
          </div>
          </div>
          
          </section>
 </>
  )
}


