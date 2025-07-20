"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';

interface Patient {
  id: number;
  patientName: string;
  age: number;
  gender: string;
  contact: string;
  admissionDate: string;
  roomNumber: string;
  appointmentStatus: string;
}

const RecentPatientAdmissions = () => {
   const {data, isLoading} = useQuery({
    queryKey: ["recentPatients"],
    queryFn: () => fetch("https://json-server-hpku.onrender.com/patients?_limit=4").then((res) => res.json()),
    staleTime:5 * 60 * 1000, // 5 minutes
   })

   // Loading skeleton component
   const PatientSkeleton = () => (
     <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
       {Array.from({length: 4}).map((_, index) => (
         <div 
           key={index} 
           className='min-h-[120px] bg-muted rounded-lg p-4 border border-border animate-pulse'
         >
           <div className='flex flex-col justify-between h-full gap-3'>
             {/* Avatar skeleton */}
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
               <div className="flex-1">
                 <div className="h-4 bg-gray-400 rounded w-20 mb-2"></div>
                 <div className="h-3 bg-gray-400 rounded w-16"></div>
               </div>
             </div>
             
             {/* Status skeleton */}
             <div className="flex justify-between items-center">
               <div className="h-3 bg-gray-400 rounded w-12"></div>
               <div className="h-6 bg-gray-400 rounded w-16"></div>
             </div>
           </div>
         </div>
       ))}
     </div>
   );

  return (
    <div className='border border-border rounded-lg p-4 mt-15'>
        <h1 className="text-2xl font-bold mb-4">Recent Patient Admissions</h1>
        
        {isLoading ? (
          <PatientSkeleton />
        ) : (
          <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
            {data?.map((patient: Patient, index: number) => (
              <div 
                key={patient.id || index} 
                className='min-h-[120px] bg-card rounded-lg p-4 border border-border hover:shadow-md transition-shadow'
              >
                <div className='flex flex-col justify-between h-full gap-3'>
                  {/* Patient info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {patient.patientName?.charAt(0) || 'P'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-md truncate">
                        {patient.patientName || 'Unknown Patient'}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {patient.age} yrs • {patient.gender}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Room {patient.roomNumber}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.appointmentStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                      patient.appointmentStatus === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {patient.appointmentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default RecentPatientAdmissions