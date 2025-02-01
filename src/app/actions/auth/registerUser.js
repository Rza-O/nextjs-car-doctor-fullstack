"use server"
import bcrypt from "bcrypt";

import { collectionNameObj, dbConnect } from "@/lib/dbConnect"

export const registerUser = async (payload) => {
   const usersCollection = dbConnect(collectionNameObj.usersCollection);
   // validation
   const { name, email, password } = payload;
   if (!email || !password) {
      return null
   }
   const user = await usersCollection.findOne({email})
   if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10)
      payload.password = hashedPassword
      const res = await usersCollection.insertOne(payload);
      return { acknowledged: res.acknowledged, insertedId: res.insertedId.toString() };
   }
   return null;
}