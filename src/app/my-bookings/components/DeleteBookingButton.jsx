"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdDelete } from 'react-icons/md'

const DeleteBookingButton = ({ id }) => {
   const router = useRouter();
   const handleDelete = async (id) => {
      const res = await fetch(`https://nextjs-car-doctor-fullstack.vercel.app/api/service/${id}`, {
         method: "DELETE"
      })
      const data = await res.json()
      console.log(data)
      router.refresh();
   };
   return (
      <>
         <MdDelete onClick={() => handleDelete(id)} className='h-8 w-8 font-bold' />
      </>
   );
};

export default DeleteBookingButton;