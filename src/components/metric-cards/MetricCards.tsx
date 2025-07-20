"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FaUsers, FaCalendarCheck, FaBed, FaUserMd } from 'react-icons/fa'
import MetricSkeleton from './MetricSkeleton'

const MetricCards = () => {
  const {data, isLoading} = useQuery({
    queryKey: ["metrics"],
    queryFn: () => fetch("https://json-server-hpku.onrender.com/metrics").then((res) => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const MetricData = [
    {
      title: "Total Patients",
      value: data?.totalPatients,
      icon: FaUsers,
      color: " text-primary"
    },
    {
      title: "Appointments Today",
      value: data?.appointmentsToday,
      icon: FaCalendarCheck,
      color: " text-primary"
    },
    {
      title: "Beds Occupied",
      value: data?.bedsOccupied,
      icon: FaBed,
      color: " text-primary"
    },
    {
      title: "Doctors On Duty",
      value: data?.doctorsOnDuty,
      icon: FaUserMd,
      color: "text-primary"
    },
  ]

  return (
    <div className="w-full">
      {isLoading ? <MetricSkeleton /> : (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
          {MetricData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                className='min-h-[100px] sm:min-h-[120px] md:min-h-[126px] bg-muted rounded-lg p-3 sm:p-4 border border-border hover:shadow-md transition-shadow duration-200' 
                key={item.title}
              >
                <div className='flex flex-col justify-between h-full gap-2 sm:gap-3'>
                  {/* Mobile: Show icon on small screens */}
                  <div className="flex items-center gap-2">
                    <IconComponent className={`text-lg ${item.color}`} />
                    <h2 className='text-xs sm:text-sm md:text-base font-medium text-foreground leading-tight'>
                      {item.title}
                    </h2>
                  </div>
                  
                  {/* Value */}
                  <div className="flex-1 flex items-end">
                    <p className='text-xl sm:text-2xl md:text-2xl font-bold text-foreground'>
                      {item.value ? item.value.toLocaleString() : '0'}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default MetricCards