'use client';

import React, { useContext, useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FaAngleLeft } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { SidePanelContext } from '@/app/context/SidePanelProvider';
import Link from 'next/link';
import { getFileFromDb } from '@/prisma/actions/files';

// NavigationBar Component
interface NavigationBarProps {
  file: {
    name: string;
    url: string;
  }
}

const NavigationBar = ({file}: NavigationBarProps) => {
  const context = useContext(SidePanelContext);
  const [selectedFile, setSelectedFile] = useState<{
    id: string;
    name: string;
    uploadStatus: string;
    url: string;
    key: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  } | null>(null);


  if (!context) {
    throw new Error('SidePanel must be used within a SidePanelProvider');
  }

  const { isOpen, togglePanel } = context;


  return (
    <div className={`transition-all duration-300 px-4 flex flex-row justify-between items-center bg-zinc-800 text-zinc-200 text-sm mx-auto h-[48px] rounded-lg w-full`}>
      <Link href="/dashboard">
        <div className='flex flex-row items-center gap-2'>
          <FaAngleLeft />
          <p>Dashboard</p>
        </div>
      </Link>
      <div>
        {file ? file.name : 'File not found'}
      </div>
      <div>
        <BsThreeDots />
      </div>
    </div>
  );
};

export default NavigationBar;
