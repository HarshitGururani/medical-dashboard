"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

interface DepartmentData {
  department: string
  patients: number
}

interface PatientsPerDepartmentChartProps {
  data: DepartmentData[]
  isLoading?: boolean
}

const PatientsPerDepartmentChart: React.FC<PatientsPerDepartmentChartProps> = React.memo(({ 
  data, 
  isLoading = false 
}) => {
  const { theme } = useTheme()
  
  // Theme-responsive colors
  const isDark = theme === 'dark'
  const textColor = isDark ? '#D1D5DB' : '#374151'
  const borderColor = isDark ? '#374151' : '#ffffff'
  // Extended color palette to avoid repetition
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
    '#A855F7', // Violet
    '#F43F5E', // Rose
    '#14B8A6', // Teal
    '#6366F1', // Indigo
    '#22C55E', // Emerald
    '#EAB308', // Amber
    '#DC2626', // Red Dark
  ]

  const chartData = {
    labels: data.map(item => item.department),
    datasets: [
      {
        data: data.map(item => item.patients),
        backgroundColor: colors.slice(0, data.length),
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          font: {
            size: 12,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: (context: { parsed: number }) => {
            return `Patients: ${context.parsed.toLocaleString()}`;
          }
        }
      },
    },
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="h-[400px] flex items-center justify-center">
          <div className="w-64 h-64 bg-gray-200 rounded-full animate-pulse relative">
            {/* Skeleton pie slices */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="h-[400px] flex items-center justify-center">
        <Pie data={chartData} options={options} />
      </div>
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500 italic">
          Click any department to show/hide it from the chart
        </p>
      </div>
    </div>
  )
})

PatientsPerDepartmentChart.displayName = 'PatientsPerDepartmentChart'

export default PatientsPerDepartmentChart 