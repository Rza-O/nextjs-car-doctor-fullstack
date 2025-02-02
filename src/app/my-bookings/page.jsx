// "use client"
import MyAllBookings from '@/components/tables/MyBookingTables';
import { headers } from 'next/headers';

const fetchMyBookings = async () => {
   const res = await fetch('http://localhost:3000/api/service', {
      headers: await headers(),
   })
   const d = await res.json();
   console.log(d)
   return d;
};

const MyBookingsPage = async () => {
   const data = await fetchMyBookings();
   console.log(data)
   return (
      <div>
         <MyAllBookings data={data}></MyAllBookings>
      </div>
   );
};

export default MyBookingsPage;