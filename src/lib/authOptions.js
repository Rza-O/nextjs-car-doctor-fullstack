import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { collectionNameObj, dbConnect } from "./dbConnect";

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            email: { label: "email", type: "email", placeholder: "email here" },
            password: { label: "Password", type: "password" }
         },
         async authorize(credentials, req) {
            console.log(credentials)
            const user = await loginUser(credentials)
            console.log('this is user bro-> ', user)
            if (user) {
               return user
            } else {
               return null;
            }
         }
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      GitHubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET
      })
   ],
   pages: {
      signIn: '/login',
   },
   callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         // console log this for necessary property:
         // console.log({ user, account, profile, email, credentials })
         if (account) {
            const { providerAccountId, provider } = account;
            const { email: user_email, image, name } = user;
            const usersCollection = dbConnect(collectionNameObj.usersCollection)
            const userExists = await usersCollection.findOne({ providerAccountId })
            if (!userExists) {
               const payload = { providerAccountId, provider, email:user_email, image, name };
               const res = await usersCollection.insertOne(payload);
               console.log(res)
            }
         }
         return true
      },
   }
}