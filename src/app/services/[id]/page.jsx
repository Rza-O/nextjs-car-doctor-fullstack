import { collectionNameObj, dbConnect } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ServiceDetailsPage = async ({ params }) => {
   const p = await params;
   const servicesCollection = dbConnect(collectionNameObj.servicesCollection);
   const data = await servicesCollection.findOne({_id: new ObjectId(p.id)})
   return (
      <div className='container mx-auto'>
         <section className='flex justify-center'>
            <figure className=' relative'>
               <Image src={'/assets/images/checkout/checkout.png'} alt='banner' width={1137} height={300}></Image>
               <div className='absolute border inset-0 border-red-400  transplant-layer bg-gradient-to-r from-black to-none'>
                  <div className='w-full h-full flex items-center ps-16 font-bold text-2xl'>
                     <div>
                        <h1 className='text-white'>Service Details</h1>
                     </div>
                  </div>
               </div>
            </figure>
         </section>
         <section className='container mx-auto grid grid-cols-12 gap-4 mt-4'>
            <div className="col-span-9 space-y-4">
               <Image src={data.img} width={400} height={280} alt={data.title}></Image>
               <h1 className='font-bold text-3xl'>{data.title}</h1>
               <p className="text-justify">{data?.description}</p>
            </div>
            {/* right Side */}
            <div className="col-span-3 space-y-4">
               <Link href={`/checkout/${data._id}`}>
                  <button className="w-full text-white h-9 bg-orange-500">
                     Checkout
                  </button>
               </Link>
               <p className="text-center text-xl font-bold">
                  Price: $ {data?.price}
               </p>
            </div>
         </section>
      </div>
   );
};

export default ServiceDetailsPage;