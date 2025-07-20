"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
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
  const response = await fetch('https://json-server-hpku.onrender.com/appointments');
  if (!response.ok) {
    throw new Error('Failed to fetch appointments');
  }
  return response.json();
};

// Custom hook for debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function Filtertable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce

  // Use React Query for data fetching
  const { data: appointments = [], isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when search changes
  };

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

  // Filter appointments based on search term
  const filteredAppointments = React.useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return appointments;
    }
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return appointments.filter(appointment => 
      appointment.patientName.toLowerCase().includes(searchLower) ||
      appointment.doctorName.toLowerCase().includes(searchLower) ||
      appointment.department.toLowerCase().includes(searchLower) ||
      appointment.appointmentTime.toLowerCase().includes(searchLower) ||
      appointment.status.toLowerCase().includes(searchLower)
    );
  }, [appointments, debouncedSearchTerm]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress className="text-primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Paper sx={{ p: 2, textAlign: 'center' }} className="bg-card text-card-foreground">
          Error: {error instanceof Error ? error.message : 'An error occurred'}
        </Paper>
      </Box>
    );
  }

  return (
    <Paper 
      sx={{ width: '100%', overflow: 'hidden' }} 
      className="bg-card border border-border"
    >
      {/* Search Bar */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }} className="border-border">
        <TextField
          fullWidth
          variant="outlined"
          className="rounded-lg"
          placeholder="Search appointments by patient, doctor, department, time, or status..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-muted-foreground" />
              </InputAdornment>
            ),
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--border)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--primary)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--primary)',
                },
              },
              '& .MuiInputBase-input': {
                color: 'var(--foreground)',
                '&::placeholder': {
                  color: 'var(--muted-foreground)',
                  opacity: 1,
                },
              },
            },
          }}
        />
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {filteredAppointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((appointment, index) => {
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredAppointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
