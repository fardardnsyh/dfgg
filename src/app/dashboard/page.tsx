import React from 'react'
import FileCard from './files-card'
import Header from './header'
import { columns } from './columns'
import { DataTable } from './data-table'
import { getAllFilesFromDb, getFileFromDb } from '@/prisma/actions/files'
import ProgressBar from '@/components/progress-bar'

const Dashboard = async () => {
  const retrievedFiles = await getAllFilesFromDb();

  return (
    <div className='flex flex-col justify-center items-center gap-4 bg-zinc-950 h-screen w-screen'>
      <Header/>
      {/*<FileCard/>*/}
      <DataTable columns={columns} data={retrievedFiles}/>
  
      
    </div>
  )
}

export default Dashboard