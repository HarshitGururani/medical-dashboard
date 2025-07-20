import React from 'react'

const WeeklyAppointmentsChartSkeleton = () => {
  // Generate realistic bar heights that look like actual appointment data
  const barHeights = [65, 45, 80, 55, 70, 40, 60]
  
  return (
    <div className="w-full bg-muted rounded-lg p-6">
      <div className="h-[360px] relative">
        {/* Chart title skeleton */}
        <div className="mb-6">
          <div className="h-6 bg-gray-300 rounded w-64 animate-pulse"></div>
        </div>
        
        {/* Chart container with proper positioning */}
        <div className="relative h-[280px] flex items-end justify-between gap-3">
          {/* Y-axis grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border-b border-gray-200"></div>
            ))}
          </div>
          
          {/* Bars */}
          {barHeights.map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-3 relative z-10">
              {/* Bar */}
              <div 
                className="w-full bg-gray-300 rounded-t animate-pulse"
                style={{ 
                  height: `${height}%`,
                  animationDelay: `${index * 150}ms`
                }}
              ></div>
              {/* Day label */}
              <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-8 h-[280px] flex flex-col justify-between pointer-events-none">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 rounded w-8 animate-pulse opacity-60"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeeklyAppointmentsChartSkeleton 