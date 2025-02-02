"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SocialLogin() {


   const handleSocialLogin = async (providerName) => {
      console.log(providerName)
      const result = await signIn(providerName, { redirect: false });
      console.log(result)
   };


   return (
      <div className="flex justify-center gap-8">
         <p
            onClick={() => handleSocialLogin("google")}
            className="bg-slate-200 rounded-full p-3"
         >
            <FaGoogle type="button" className="cursor-pointer" />
         </p>
         <p
            onClick={() => handleSocialLogin("github")}
            className="bg-slate-200 rounded-full p-3"
         >
            <FaGithub type="button" className="cursor-pointer"/>
         </p>
      </div>
   );
}