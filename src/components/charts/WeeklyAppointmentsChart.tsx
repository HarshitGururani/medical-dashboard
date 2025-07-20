"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import WeeklyAppointmentsChartSkeleton from './WeeklyAppointmentsChartSkeleton'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface WeeklyAppointment {
  day: string
  appointments: number
}

interface WeeklyAppointmentsChartProps {
  data: WeeklyAppointment[]
  isLoading?: boolean
}

const WeeklyAppointmentsChart: React.FC<WeeklyAppointmentsChartProps> = React.memo(({ 
  data, 
  isLoading = false 
}) => {
  const { theme } = useTheme()
  
  // Theme-responsive colors
  const isDark = theme === 'dark'
  const textColor = isDark ? '#D1D5DB' : '#6B7280'
  const gridColor = isDark ? 'rgba(156, 163, 175, 0.1)' : 'rgba(156, 163, 175, 0.2)'
  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        label: 'Appointments',
        data: data.map(item => item.appointments),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800, // Reduced animation duration
      easing: 'easeOutQuart' as const, // Smoother easing
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: { y: number } }) {
            return `Appointments: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
          display: false,
        },
        ticks: {
          color: textColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          beginAtZero: true,
        },
      },
    },
    // Performance optimizations
    elements: {
      bar: {
        borderSkipped: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  }

  if (isLoading) {
    return <WeeklyAppointmentsChartSkeleton />
  }

  return (
    <div className="w-full bg-muted rounded-lg">
      <div className="h-[360px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
})

WeeklyAppointmentsChart.displayName = 'WeeklyAppointmentsChart'

export default WeeklyAppointmentsChart