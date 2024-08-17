'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UploadButton, UploadDropzone } from '@/utils/uploadthing';
import { FaSignOutAlt } from "react-icons/fa";




const FileCard= () => {
  
  

  const files = [
    {
      fileName: "Software Engineering 1",
      status: "Uploaded",
      fileSize: 2.7,
    },
    {
      fileName: "Cloud Computing Module 3",
      status: "Uploaded",
      fileSize: 3.4,
    },
    {
      fileName: "Software Engineering 2",
      status: "Uploaded",
      fileSize: 2.4,
    },
    {
      fileName: "Trigonometry",
      status: "Uploaded",
      fileSize: 1.3,
    },
  ]

  const calculateFileSize = () => {
      const sum = files.reduce((accumulator, file) => accumulator + file.fileSize, 0 );
      return sum;
  }

  const totalFileSize = calculateFileSize();
  return (
   <div className='h-[480px] bg-zinc-800 px-8 py-8 rounded-xl w-[80%] text-zinc-300'>
    <div className='flex flex-row justify-between'>
      <div>
        <input
        className='text-white border border-zinc-500 bg-zinc-800 rounded-md px-2 py-2'
        placeholder='Search Pdf File...'
        />
      </div>
      <div>
      <UploadButton
        endpoint="pdfUploader"
        appearance={{
          button: {
            background: 'gray'
          }
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />    
      </div>
    </div>
    <div className='mt-4'>
    <Table className='border r justify-evenly'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">File Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">File Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.fileName}>
            <TableCell className="font-medium">{file.fileName}</TableCell>
            <TableCell>{file.status}</TableCell>
            <TableCell className='text-right'>{file.fileSize} mb</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{totalFileSize } mb</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>

   </div>
  )
}

export default FileCard