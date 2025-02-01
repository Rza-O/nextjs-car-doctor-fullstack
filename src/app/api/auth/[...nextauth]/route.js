import { loginUser } from "@/app/actions/auth/loginUser";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
   // Configure one or more authentication providers
   providers: [
      CredentialsProvider({
         // The name to display on the sign in form (e.g. 'Sign in with...')
         name: 'Credentials',
         // The credentials is used to generate a suitable form on the sign in page.
         // You can specify whatever fields you are expecting to be submitted.
         // e.g. domain, username, password, 2FA token, etc.
         // You can pass any HTML attribute to the <input> tag through the object.
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
      })
   ],
   pages: {
      signIn: '/login',
   }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }