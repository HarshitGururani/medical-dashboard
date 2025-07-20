import React from 'react'

const MetricSkeleton = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
      {Array.from({length:4}).map((_,index)=>(
        <div 
          key={index} 
          className='min-h-[100px] sm:min-h-[120px] md:min-h-[126px] bg-muted rounded-lg p-3 sm:p-4 border border-border animate-pulse'
        >
          <div className='flex flex-col justify-between h-full gap-2 sm:gap-3'>
            {/* Icon and title skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <div className="h-4 bg-gray-400 rounded w-20"></div>
            </div>
            
            {/* Value skeleton */}
            <div className="flex-1 flex items-end">
              <div className="h-8 bg-gray-400 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MetricSkeleton