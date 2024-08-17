"use client";

import React, { useContext } from 'react';
import SidePanel from '@/components/sidepanel';
import ChatCard from '@/app/main/[id]/chatcard';
import NavigationBar from '@/components/navbar';
import { SidePanelProvider, SidePanelContext } from '@/app/context/SidePanelProvider';
import PdfRenderPage from './pdf-render';
import { getFileFromDb } from '@/prisma/actions/files';
import ChatWrapper from './chat-wrapper';


interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const file = await getFileFromDb(id);

  return (
    <SidePanelProvider>
      <PageContent id = {id} file={file} />
    </SidePanelProvider>
  );
};

interface PageContentProps {
  id : string;
  file: { url: string; name: string; id:string } | null;
}

const PageContent: React.FC<PageContentProps> = ({ id, file }) => {
  const context = useContext(SidePanelContext);
  if (!context) {
    return null; // or some fallback UI
  }

  if (!file) {
    console.error("File not found");
    return <div className="text-white">File not found</div>; // Fallback UI if file is null
  }

  const { isOpen } = context;

  console.log("PDF URL:", file.url); // Debugging log

  return (
    <div className={`flex flex-col lg:flex-row h-screen max-h-screen max-w-screen bg-zinc-950 transition-all duration-300 ${!isOpen ? 'gap-14' : 'gap-64'} justify-center`}>
      <div>
        <SidePanel />
      </div>
      <div className={`flex flex-col justify-center w-[80%] gap-2`}>
        <div className='flex'>
          <NavigationBar file={file} />
        </div>
        <div className='flex flex-row w-full h-[600px] gap-4 justify-between'>
          <PdfRenderPage pdfUrl={file.url} />
          {/*<ChatCard />*/}
          <ChatWrapper fileId={file.id}/>

        </div>
      </div>
    </div>
  );
};

export default Page;
