import React from 'react'

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => {
  return (
    <div className='fixed top-0 left-0 w-full bg-slate-950 h-1'>
      <div className={`bg-green-500 h-full w-[${progress}%]`}>

      </div>

    </div>
  )
}

export default ProgressBar