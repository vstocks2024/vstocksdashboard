"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function NewAnimationButton() {
    const router = useRouter();
  return (
    <div className='flex flex-row items-center justify-end my-2'>
      <Button asChild className='text-white bg-sky-600 hover:bg-sky-500' variant={'default'}><a target='_blank' href='http://admin.editor.vstock.in'>+ New Animation</a></Button>
    </div>
  )
}
