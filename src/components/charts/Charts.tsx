"use client"
import { useQuery } from "@tanstack/react-query"
import WeeklyAppointmentsChart from "./WeeklyAppointmentsChart"
import PatientsPerDepartmentChart from "./PatientsPerDepartmentChart"


const Charts = () => {
  const {data, isLoading} = useQuery({
    queryKey: ["charts"],
    queryFn: () => fetch("https://json-server-hpku.onrender.com/charts").then((res) => res.json()),
    staleTime:5 * 60 * 1000, // 5 minutes
  })

  console.log(data)
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-20">
        <div className="bg-muted rounded-lg p-4 border border-border md:col-span-3">
            <h2 className="text-lg font-medium text-foreground mb-10">Weekly Appointments</h2>
            <div className="w-full">
              <WeeklyAppointmentsChart data={data?.weeklyAppointmentsTrend || []} isLoading={isLoading} />
            </div>
        </div>
        <div className="bg-muted rounded-lg p-4 border border-border md:col-span-2">
            <h2 className="text-lg font-medium text-foreground mb-4">Patients per Department</h2>
            <div className="w-full">
              <PatientsPerDepartmentChart data={data?.departmentWisePatientDistribution || []} isLoading={isLoading} />
            </div>
        </div>
    </div>
  )
}
export default Charts