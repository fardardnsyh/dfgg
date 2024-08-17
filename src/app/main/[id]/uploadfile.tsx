"use client";

import React,{ useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

const UploadFile = () => {
  const fileInputRef = useRef<HTMLInputElement| null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      const file = event.target.files[0];
      console.log('Selected file:', file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]){
      const file = event.dataTransfer.files[0];
      console.log('Dropped file', file)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div>
      <Button variant="ghost" onClick={handleButtonClick}>
      <div className='flex mt-4 justify-center items-center bg-gray-400 border border-dashed border-gray-100 border-spacing-1 h-16 rounded-lg w-full px-2'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      >
      <span>+ New Chat</span><br />
      <span className='opacity-40'> Drop PDF here</span>
    </div>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{display: 'none'}}
        onChange={handleFileSelect}
        accept=".pdf"
        multiple
      />
      
    </div>
  )
}

export default UploadFile;
