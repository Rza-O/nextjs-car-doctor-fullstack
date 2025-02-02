import { authOptions } from "@/lib/authOptions";
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

export const GET = async (req) => {
   const session = await getServerSession(authOptions);
   if (session) {
      const email = session?.user?.email;
      const bookingCollections = dbConnect(collectionNameObj.bookingCollections);
      const result = await bookingCollections.find({ email }).toArray();
      return NextResponse.json(result)
   }
   return NextResponse.json({})
}

export const POST = async (req) => {
   const body = await req.json();
   const bookingsCollections = dbConnect(collectionNameObj.bookingCollections);
   const result = await bookingsCollections.insertOne(body);
   return NextResponse.json(result)
}