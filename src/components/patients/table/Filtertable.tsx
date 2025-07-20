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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useQuery } from '@tanstack/react-query';

interface Patient {
  id: number;
  patientName: string;
  gender: string;
  age: number;
  contact: string;
  admissionDate: string;
  roomNumber: string;
  appointmentStatus: string;
}

interface Column {
  id: keyof Patient;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: string | number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 60, align: 'center' },
  { id: 'patientName', label: 'Patient Name', minWidth: 150 },
  { id: 'gender', label: 'Gender', minWidth: 80, align: 'center' },
  { id: 'age', label: 'Age', minWidth: 60, align: 'center' },
  { id: 'contact', label: 'Contact', minWidth: 140 },
  { 
    id: 'admissionDate', 
    label: 'Admission Date', 
    minWidth: 120, 
    align: 'center',
    format: (value: string | number) => {
      if (typeof value === 'string') {
        const date = new Date(value);
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
      }
      return String(value);
    }
  },
  { id: 'roomNumber', label: 'Room Number', minWidth: 100, align: 'center' },
  { 
    id: 'appointmentStatus', 
    label: 'Status', 
    minWidth: 120, 
    align: 'center',
    format: (value: string | number) => {
      return String(value);
    }
  },
];

// Fetch function for React Query
const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch('https://json-server-hpku.onrender.com/patients');
  if (!response.ok) {
    throw new Error('Failed to fetch patients');
  }
  return response.json();
};

export default function Filtertable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [statusFilter, setStatusFilter] = React.useState<string>('All');

  // Use React Query for data fetching
  const { data: patients = [], isLoading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
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

  const handleStatusFilterChange = (event: React.SyntheticEvent, newValue: string) => {
    setStatusFilter(newValue);
    setPage(0); // Reset to first page when filter changes
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'var(--primary)';
      case 'Completed':
        return 'var(--chart-2)';
      case 'Cancelled':
        return 'var(--destructive)';
      default:
        return 'var(--muted-foreground)';
    }
  };

  // Filter patients based on status
    const filteredPatients = React.useMemo(() => {
    if (statusFilter === 'All') {
      return patients;
    }
    return patients.filter(patient => patient.appointmentStatus === statusFilter);
  }, [patients, statusFilter]);

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
      {/* Status Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="border-border">
        <Tabs 
          value={statusFilter} 
          onChange={handleStatusFilterChange}
          aria-label="status filter tabs"
          className="bg-card"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              color: 'var(--muted-foreground)',
              minWidth: 'auto',
              padding: '12px 16px',
              '&.Mui-selected': {
                color: 'var(--primary)',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--primary)',
            },
            '& .MuiTabs-scrollButtons': {
              color: 'var(--muted-foreground)',
              '&.Mui-disabled': {
                opacity: 0.3,
              },
            },
          }}
        >
          <Tab label="All" value="All" />
          <Tab label="Scheduled" value="Scheduled" />
          <Tab label="Completed" value="Completed" />
          <Tab label="Cancelled" value="Cancelled" />
        </Tabs>
      </Box>

      <TableContainer sx={{ maxHeight: 600, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
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
            {filteredPatients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((patient) => {
                return (
                  <TableRow 
                    hover 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={patient.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((column) => {
                      const value = patient[column.id];
                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align}
                          className="text-card-foreground border-border"
                        >
                          {column.id === 'appointmentStatus' ? (
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
                              {column.format ? column.format(value) : value}
                            </Box>
                          ) : (
                            column.format ? column.format(value) : value
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
        count={filteredPatients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
