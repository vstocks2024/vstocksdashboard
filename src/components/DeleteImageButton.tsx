"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { revalidatePath } from 'next/cache';






export const DeleteImageButton = ({id}:{id:any}) => {

  
  
const  deleteImageWithId =async()=>{

  console.log(id);
    try {
     const response= await axios.delete(`${process.env.NEXT_PUBLIC_URL}/image/delete/${id}`);
     console.log(response);
     revalidatePath("/uploads/images");
     
     
       //return { message: 'Image Image' };
     } catch (error) {
       //return { message: 'Database Error: Failed to Delete Invoice.' };
       console.log(error);
     }
     }
     
  return (
<> 
      <button onClick={deleteImageWithId} className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <FaRegTrashAlt className="w-4" />
      </button>
    </>
  )
}
