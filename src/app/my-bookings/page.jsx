"use client"
import MyAllBookings from '@/components/tables/MyBookingTables';
import React, { useEffect, useState } from 'react';

const MyBookingsPage = () => {
   const [data, setData] = useState([]);
   useEffect(() => {
      const fetchMyBookings = async () => {
         const res = await fetch('http://localhost:3000/api/service')
         const d = await res.json();
         console.log(d)
         setData(d);
      };
      fetchMyBookings()
   }, []);
   console.log(data)
   return (
      <div>
         <MyAllBookings data={data}></MyAllBookings>
      </div>
   );
};

export default MyBookingsPage;