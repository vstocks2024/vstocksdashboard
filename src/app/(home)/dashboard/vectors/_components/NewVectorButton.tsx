"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function NewVectorButton() {
    const router = useRouter();
  return (
    <div className='flex flex-row items-center justify-end my-2'>
      <Button onClick={()=>router.push("/dashboard/vectors/new")} className='text-white bg-sky-600 hover:bg-sky-500' variant={'default'}>+ New Vector</Button>
    </div>
  )
}
