
import axios from "axios";
import { unstable_noStore as noStore } from 'next/cache';



export async function fetchFilteredImages(query:string,currentPage:number){
  noStore();
    try
    {
        const response1=await axios.get(`${process.env.NEXT_PUBLIC_URL}/images/images_fields`);
        
        const response2=await axios.get(`${process.env.NEXT_PUBLIC_URL}/list_images`);
        return response2.data;
    }
    catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch images');
      }

}

