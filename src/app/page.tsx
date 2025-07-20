"use client"
import Charts from '@/components/charts/Charts'
import MetricCards from '@/components/metric-cards/MetricCards'
import RecentPatients from '@/components/RecentPatients'
import DashboardAppointmentsTable from '@/components/DashboardAppointmentsTable'

const Page = () => {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <MetricCards />
      <Charts/>
      <DashboardAppointmentsTable/>
      <RecentPatients/>
    </div>
  )
}

export default Page