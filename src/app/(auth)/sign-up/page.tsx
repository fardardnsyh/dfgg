"use client"; // This directive indicates that this file is a client-side component in Next.js.

import Link from "next/link"; // Importing Link from Next.js for client-side navigation.
import React, { useState } from "react"; // Importing React and useState hook for state management.
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"; // Importing eye icons for password visibility toggle.
import { signIn } from "next-auth/react"; // Importing signIn function from next-auth for authentication.
import { useRouter } from "next/navigation"; // Importing useRouter for client-side routing.
import { toast } from "sonner"; // Importing toast for displaying notifications.
import bcrypt from "bcrypt"

export default function Page() { // Define a React functional component named Page.
  const router = useRouter(); // Initialize Next.js router for navigation.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility.
  const [isConfirmPasswordVisible, setISConfirmPasswordVisible] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false); // State to indicate if sign-up process is ongoing.

  // Function to handle form submission for signing up.
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission behavior.

    // Retrieve form data using FormData API.
    const formData = new FormData(e.currentTarget);
    const formValue = {
      email: formData.get("email") as string, // Get email value from form data.
      password: formData.get("password") as string, // Get password value from form data.
      confirmPassword: formData.get("confirmPassword") as string, // Get confirmPassword value from form data.
    };

    console.log(formValue.email, formValue.password);

    try {
      setIsSigningUp(true); // Set signing-up state to true to indicate loading.

      const res = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        toast.error('Sign-up failed: ' + errorData.error); // Show error toast notification.
        return;
      }
      // Attempt to sign in with the provided credentials.
    
        toast.success("Signed in successfully!"); // Show success toast notification.
        router.push("/dashboard"); // Redirect to dashboard on successful sign-in.

    } finally {
      setIsSigningUp(false); // Reset signing-up state to false after operation.
    }
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-zinc-950">
      <div className="flex flex-col text-zinc-100 justify-center bg-zinc-800 rounded-lg w-[90%] max-w-[600px] h-[500px] gap-y-4 my-8">
        <form className="flex flex-col gap-4 mx-4" onSubmit={handleSignUp}>
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <label>
            Email
            <input
              name="email" // Name attribute used to retrieve value from FormData.
              type="email" // Input type for email.
              placeholder="Enter username"
              className="flex w-full p-4 bg-zinc-700 text-white h-[3rem] rounded-md"
              required // Input is required for form submission.
            />
          </label>
          <label>
            <p>Password</p>
            <div className="relative">
              <input
                name="password" // Name attribute used to retrieve value from FormData.
                type={isPasswordVisible ? "text" : "password"} // Conditional input type based on visibility state.
                placeholder="Enter password"
                className="flex w-full p-4 bg-zinc-700 text-white h-[3rem] rounded-md"
                required // Input is required for form submission.
              />
              <button
                type="button" // Button to toggle password visibility.
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
              >
                {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </label>
          <label>
            <div className="relative">
            <p>Confirm Password</p>
            <input
              name="confirmPassword" // Name attribute used to retrieve value from FormData.
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm password"
              className="flex w-full p-4 bg-zinc-700 text-white h-[3rem] rounded-md"
              required // Input is required for form submission.
            />
            <button 
              type="button"
              className="absolute right-4 top-4 transform -translate-y-1/2"
              onClick={()=> setISConfirmPasswordVisible((prevState) => !prevState) }
              >
                {isConfirmPasswordVisible ? <FaRegEye/> : <FaRegEyeSlash/>}

            </button>
            </div>
          </label>
          
          <button
            type="submit" // Submit button for the form.
            className="flex w-full bg-emerald-500 text-white justify-center items-center rounded-md hover:bg-emerald-600 h-[3rem]"
          >
            {isSigningUp ? "Signing Up..." : "Sign Up"} // Conditional button text based on signing-up state.
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="text-emerald-600 font-bold">Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
