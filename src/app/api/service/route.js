import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server"

export const POST = async (req) => {
   const body = await req.json();
   const bookingsCollections = dbConnect(collectionNameObj.bookingCollections);
   const result = await bookingsCollections.insertOne(body);
   return NextResponse.json(result)
}