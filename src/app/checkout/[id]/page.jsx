import CheckoutForm from '@/components/forms/CheckoutForm';
import React from 'react';

const CheckoutPage = async ({ params }) => {
   const p = await params
   const res = await fetch(`https://nextjs-car-doctor-fullstack.vercel.app/api/service/${p.id}`);
   const data = await res.json();
   
   return (
      <div>
         <CheckoutForm data={data}></CheckoutForm>
      </div>
   );
};

export default CheckoutPage;