import { authOptions } from '@/lib/authOptions';
import { dbConnect, collectionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import React from 'react';

export const GET = async (req, { params }) => {
   const p = await params;
   const servicesCollection = dbConnect(collectionNameObj.servicesCollection);
   const data = await servicesCollection.findOne({ _id: new ObjectId(p.id) })
   return NextResponse.json(data);
}

export const DELETE = async (req, { params }) => {
   const p = await params;
   const bookingCollections = dbConnect(collectionNameObj.bookingCollections);
   const query = { _id: new ObjectId(p.id) }
   // validation
   const session = await getServerSession(authOptions);
   const currentBooking = await bookingCollections.findOne(query);

   const isOwnerOK = session?.user?.email == currentBooking?.email;

   if (isOwnerOK) {
      // deleting user specific bookings
      const deleteResponse = await bookingCollections.deleteOne(query);
      revalidatePath('/my-bookings')
      return NextResponse.json(deleteResponse)
   } else {
      return NextResponse.json({ success: false, message: 'forbidden access' }, { status: 401 })
   }
}
