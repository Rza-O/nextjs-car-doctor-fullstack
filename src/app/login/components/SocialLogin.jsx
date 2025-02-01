"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";

export default function SocialLogin() {


   const handleSocialLogin = (providerName) => {
   };


   return (
      <div className="flex justify-center gap-8">
         <p
            onClick={() => handleSocialLogin("google")}
            className="bg-slate-200 rounded-full p-3"
         >
            <FaGoogle type="button" />
         </p>
         <p
            onClick={() => handleSocialLogin("github")}
            className="bg-slate-200 rounded-full p-3"
         >
            <FaGithub type="button" />
         </p>
      </div>
   );
}