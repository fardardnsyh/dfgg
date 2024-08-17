"use client"

import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import React, { useState } from 'react'
import { toast } from 'sonner';
import Confetti from 'react-confetti'

export default function page() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isPasswordVisible ,setIsPasswordVisible] = useState(false);

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValue = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    try {
      setIsSigningIn(true);

      const res = await signIn("credentials", {
        email: formValue.email,
        password: formValue.password,
        redirect: false,
      })

      router.refresh();

      if (res?.ok){
        router.push("/dashboard")
      }

      if (res?.error){
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      console.log(error)
      toast.error("An error has occurred")
      setIsSigningIn(false);
    }
  }
  return (
    <div className='flex w-screen h-screen justify-center items-center bg-zinc-950'>
      <div className='flex p-4 flex-col text-zinc-100 justify-center bg-zinc-800 rounded-lg w-[90%] max-w-[600px] h-[450px] gap-y-4 my-8'>
        <form className='flex flex-col gap-4 mx-4' onSubmit={handleSignIn}>
          <h2 className='text-2xl font-semibold'>Sign in to your account</h2>
          <label>
            Email
          <input 
                name="email"
                type="email"
                placeholder='Enter username' 
                className='flex w-full p-4 bg-zinc-700 text-white h-[3rem] rounded-md'
                required
                />
          </label>
          <label className="font-medium">
            Password
          <div className='relative'>
          <input 
                name="password"
                type={isPasswordVisible ? "text": "password"}
                placeholder='Enter password' 
                className='flex w-full p-4 bg-zinc-700 text-white h-[3rem] rounded-md'
                required
                />
          
          <button 
                type="button"
                className="absolute right-4 top-4"
                onClick={() => setIsPasswordVisible((prevState) => !prevState) }
                >
              {isPasswordVisible ? <FaRegEye/> : <FaRegEyeSlash/>}
          </button>
          </div>
          </label>
          

          <button
            type="submit"
            className='flex w-full bg-emerald-500 text-white justify-center items-center rounded-md hover:bg-emerald-600 h-[3rem]'
            disabled={isSigningIn}
          >
          {isSigningIn ? "Signing in...": "Sign in"}
          </button>

          <p className="text-center">Don't have an account? <Link href='sign-up'><span className='text-emerald-600 font-bold'>Sign up</span></Link></p>
         
        </form>
      </div>

      {isSigningIn && <Confetti/>}
      
    </div>
  )
}
