"use client";

import ChatContainer from "@/components/chat-container";

ChatContainer

const ChatWrapper = ({ fileId }: { fileId: string }) => {
  return (
      <div className='flex lg:flex-1/2 justify-center items-center h-full
       w-full'>
          <ChatContainer fileId={fileId} />
          <div>
          </div>
      </div>
  )
}

export default ChatWrapper