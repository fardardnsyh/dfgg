"use client";

import { FaBars, FaCommentAlt, FaUser, FaCog } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import React, { useContext, useState, useEffect } from 'react';
import { SidePanelContext } from '@/app/context/SidePanelProvider';
import { UploadDropzone } from '@/utils/uploadthing';
import { getAllFilesFromDb } from '@/prisma/actions/files';

interface File {
  id: string;
  name: string;
  uploadStatus: string; // Adjust this type if needed
  url: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const SidePanel = () => {
  const context = useContext(SidePanelContext);
  const [retrievedFiles, setRetrievedFiles] = useState<File[]>([]); // Adjusted type

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await getAllFilesFromDb();
        setRetrievedFiles(files); // Files are now of type File[]
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  if (!context) {
    throw new Error('SidePanel must be used within a SidePanelProvider');
  }

  const { isOpen, togglePanel, profileUrl, setProfileUrl } = context;

  return (
    <div className="relative z-10">
      <div className={`fixed top-0 left-0 h-full bg-zinc-800 text-zinc-300 transition-all duration-300 flex flex-col justify-between ${isOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 flex-grow">
          <Button
            variant="ghost"
            onClick={togglePanel}
            className="rounded-full p-2 top-4 left-4 z-50 transition-all duration-300 hover:none "
          >
            <FaBars />
          </Button>

          {isOpen && (
            <UploadDropzone
              endpoint='profilePicture'
              appearance={{
                container: {
                  border: '1px dotted white',
                  borderRadius: '1rem'
                },
                button: {
                  background: 'gray'
                },
                label: {
                  color: 'white'
                }
              }}
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert(`Upload Completed: ${res[0].url}`);
                setProfileUrl(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}

          <div className={`pt-[60px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <p className="font-bold text-sm mb-2">Recent Convos</p>
          </div>

          <ul className="space-y-2">
            {retrievedFiles.map((file) => (
              <li key={file.id} className="flex items-center">
                <FaCommentAlt className="mr-2" />
                <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{file.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaUser className="mr-2" />
              <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Profile</span>
            </li>
            <li className="flex items-center">
              <FaCog className="mr-2" />
              <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Settings</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
