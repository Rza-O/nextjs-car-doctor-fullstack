import { authOptions } from "@/lib/authOptions";
import { collectionNameObj, dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
   const p = await params;
   const bookingCollections = dbConnect(collectionNameObj.bookingCollections);
   const query = { _id: new ObjectId(p.id) };

   const session = await getServerSession(authOptions);
   const email = session?.user?.email;
   const singleBooking = await bookingCollections.findOne(query);
   const isOwnerOK = email == singleBooking?.email;

   if (isOwnerOK) {
      return NextResponse.json(singleBooking)
   } else {
      return NextResponse.json({ message: "Forbidden GET access" }, { status: 401 })
   }

}

export const PATCH = async (req, { params }) => {
   const p = await params;
   const bookingCollections = dbConnect(collectionNameObj.bookingCollections);
   const query = { _id: new ObjectId(p.id) };

   const session = await getServerSession(authOptions);
   const email = session?.user?.email;
   const currentBookingData = await bookingCollections.findOne(query);
   const isOwnerOK = email == currentBookingData?.email;

   if (isOwnerOK) {
      const body = await req.json();
      const filter = {
         $set: { ...body },
      }
      const option = {
         upsert: true,
      }
      const updateResponse = await bookingCollections.updateOne(query, filter, option);
      revalidatePath('/my-bookings')
      return NextResponse.json(updateResponse)
   } else {
      return NextResponse.json({message: "Forbidden access"}, {status: 401})
   }
   
}