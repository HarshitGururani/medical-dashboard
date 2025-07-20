"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query';

interface Appointment {
  patientName: string;
  appointmentTime: string;
  doctorName: string;
  department: string;
  status: string;
}

interface Column {
  id: keyof Appointment;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: string | number) => string;
}

const columns: readonly Column[] = [
  { id: 'patientName', label: 'Patient Name', minWidth: 150 },
  { id: 'doctorName', label: 'Doctor Name', minWidth: 150 },
  { id: 'department', label: 'Department', minWidth: 120 },
  { id: 'appointmentTime', label: 'Time', minWidth: 100, align: 'center' },
  { 
    id: 'status', 
    label: 'Status', 
    minWidth: 120, 
    align: 'center',
    format: (value: string | number) => {
      return String(value);
    }
  },
];

// Fetch function for React Query
const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await fetch('https://json-server-hpku.onrender.com/appointments?_limit=4');
  if (!response.ok) {
    throw new Error('Failed to fetch appointments');
  }
  return response.json();
};

export default function DashboardAppointmentsTable() {
  // Use React Query for data fetching
  const { data: appointments = [], isLoading, error } = useQuery({
    queryKey: ['dashboard-appointments'],
    queryFn: fetchAppointments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'var(--primary)';
      case 'Confirmed':
        return 'var(--chart-2)';
      case 'Cancelled':
        return 'var(--destructive)';
      default:
        return 'var(--muted-foreground)';
    }
  };

  if (isLoading) {
    return (
      <div className='border border-border rounded-lg p-4'>
        <h1 className="text-2xl font-bold mb-4">Recent Appointments</h1>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress className="text-primary" />
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className='border border-border rounded-lg p-4'>
        <h1 className="text-2xl font-bold mb-4">Recent Appointments</h1>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Paper sx={{ p: 2, textAlign: 'center' }} className="bg-card text-card-foreground">
            Error: {error instanceof Error ? error.message : 'An error occurred'}
          </Paper>
        </Box>
      </div>
    );
  }

  return (
    <div className='border border-border rounded-lg p-4'>
      <h1 className="text-2xl font-bold mb-4">Recent Appointments</h1>
      <Paper 
        sx={{ width: '100%', overflow: 'hidden' }} 
        className="bg-card border border-border"
      >
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="recent appointments table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="bg-card text-card-foreground border-border font-medium"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment, index) => {
                return (
                  <TableRow 
                    hover 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={index}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((column) => {
                      const value = appointment[column.id];
                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align}
                          className="text-card-foreground border-border"
                        >
                          {column.id === 'status' ? (
                            <Box
                              component="span"
                              sx={{
                                px: 2,
                                py: 0.5,
                                borderRadius: 'var(--radius)',
                                backgroundColor: getStatusColor(value as string),
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 'medium',
                                display: 'inline-block',
                              }}
                            >
                              {value}
                            </Box>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
} 