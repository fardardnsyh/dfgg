import { Button } from '@/components/ui/button'
import { LuSendHorizonal } from "react-icons/lu";
import React from 'react'

const Chatcard = () => {
  return (
    <div className='flex flex-col w-full h-full gap-2'>
      <div className="flex flex-grow bg-zinc-800 rounded-lg">
        <div className='flex'>
          <p className='flex text-lg px-4 mt-2 font-bold'>
          Chat
          </p>
        </div>
      </div>
      <div className='flex flex-row w-full gap-2'>
        <div className='flex items-center w-full min-h-12 h-auto px-4 bg-zinc-800 rounded-lg text-zinc-300 '>
          <input
          placeholder='Ask me something...'
          className='bg-inherit w-full'
          />
        </div>
        <div className='flex items-center px-4 w-[30%] bg-zinc-800 text-zinc-300 hover:bg-zinc-600 rounded-lg gap-2 justify-center'>
            Send
            <LuSendHorizonal/>
        </div>
        
      </div>


    </div>
    
    
  )
}

export default Chatcard