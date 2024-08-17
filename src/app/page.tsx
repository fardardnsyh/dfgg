

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center h-dvh max-h-dvh w-dvw bg-zinc-950 bg-[url('/grid.svg')]">
      <div className="flex flex-col gap-y-2">

        <Card className="w-[350px] border border-zinc-900 bg-zinc-300">
          <CardHeader>
            <CardTitle className="flex flex-col ">
              <p className="font-black ">Chat PDsteF</p>
            </CardTitle>
            <CardDescription className="text-zinc-700 font-medium">Talk to your PDF files using generative AI.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
              <Link href="/sign-in">
                <Button className="flex w-full ">
                  <span className="font-bold bg-gradient-to-r text-base from-emerald-400 via-emerald-500 to-lime-300 inline-block text-transparent bg-clip-text">
                    Get Started
                  </span>
                </Button>
              </Link>
              
            <div>
                <a href="https://www.instagram.com/__sstefano/" target="_blank" className="flex flex-row justify-center items-center gap-x-2" >
                  <p className="text-xs text-nowrap underline">by @stefano</p>
                </a>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </div>
    </>
    
  );
}
