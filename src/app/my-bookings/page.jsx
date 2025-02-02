// "use client"
import MyAllBookings from '@/components/tables/MyBookingTables';
import { headers } from 'next/headers';

const fetchMyBookings = async () => {
   const res = await fetch('https://nextjs-car-doctor-fullstack.vercel.app/api/service', {
      headers: new Headers(await headers()),
   })
   const d = await res.json();

   return d;
};

const MyBookingsPage = async () => {
   const data = await fetchMyBookings();

   return (
      <div>
         <MyAllBookings data={data}></MyAllBookings>
      </div>
   );
};

export default MyBookingsPage;