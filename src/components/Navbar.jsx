'use client'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
   const { data: session, status } = useSession();

   const navMenu =
      <>
         <li><Link href={'/'}>Home</Link></li>
         <li><Link href={'/about'}>About</Link></li>
         <li><Link href={'/services'}>Services</Link></li>
         <li><Link href={'/blogs'}>Blog</Link></li>
         <li><Link href={'/my-bookings'}>My Bookings</Link></li>
      </>


   return (
      <div className="navbar bg-base-100 container mx-auto">
         <div className="navbar-start">
            <div className="dropdown">
               <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  {navMenu}
               </ul>
            </div>
            <Link className=" text-xl" href={'/'}>
               <Image src={'/assets/logo.svg'} width={107} height={87} alt='brand-logo'/>
            </Link>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
               {navMenu}
            </ul>
         </div>
         <div className="navbar-end space-x-3">
            {status == 'authenticated' ? (
               <ul className='flex gap-3 items-center justify-center'>
                  <li><Image className='rounded-full' src={session?.user?.image} width={50} height={20} alt='profile-image'></Image></li>
                  <li><button onClick={() => signOut()}>logout</button></li>
               </ul>
            ) : (
               <>
                  <Link href={'/register'}><button>Register</button></Link>
                  <Link href={'/login'}><button>Login</button></Link>
               </>
            )}
            
            <a className="btn btn-outline">Appointment</a>
         </div>
      </div>
   );
};

export default Navbar;