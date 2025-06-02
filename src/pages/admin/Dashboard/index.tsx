import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, ToggleButtonGroup, ToggleButton, CircularProgress, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getDashboardSalesData, getDashboardStatCards, getDashboardMonthlyData, getDashboardYearData } from '@/services/Dashboard.service';
import SalesChart from './SalesChart';
import MonthlyStatistics from './MonthlyStatistics';
import StatCard from './StatCard';


const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('monthly');
  const [salesData, setSalesData] = useState<any[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);
  const [statCards, setStatCards] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [yearData, setYearData] = useState<any[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const fetchYearlyRevenue = async (year: number) => {
    try {
      setLoading(true);
      const response = await getDashboardYearData(year);
      
      if (response.success && response.data) {
        const chartData = Object.entries(response.data.data).map(([month, value]) => ({
  name: month,
  value: value
}));
        
        setSalesData(chartData);
      } else {
        setSalesData([]);
        setSnackbarMessage('Không có dữ liệu doanh thu');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error fetching yearly revenue:", error);
      setSalesData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    fetchYearlyRevenue(year);
  };

  useEffect(() => {
      fetchYearlyRevenue(selectedYear);
  }, [timeRange, selectedYear]);

  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeRange: string,
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </DashboardContainer>
    )
  }

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {/* Total Sales Chart */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">Tổng doanh thu</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {timeRange === 'yearly' && (
                  <TextField
                    label="Năm"
                    type="number"
                    value={selectedYear}
                    onChange={handleYearChange}
                    size="small"
                    sx={{ width: 100, mr: 2 }}
                    InputProps={{ inputProps: { min: 2000, max: 2100 } }}
                  />
                )}
                <ToggleButtonGroup
                  size="small"
                  value={timeRange}
                  exclusive
                  onChange={handleTimeRangeChange}
                  aria-label="time range"
                >
                  <ToggleButton value="7days" aria-label="7 days">
                    7 Ngày
                  </ToggleButton>
                  <ToggleButton
                    value="monthly"
                    aria-label="monthly"
                    sx={{
                      bgcolor: timeRange === 'monthly' ? 'warning.main' : 'inherit',
                      color: timeRange === 'monthly' ? 'white' : 'inherit',
                      '&.Mui-selected': {
                        bgcolor: 'warning.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'warning.dark',
                        }
                      }
                    }}
                  >
                    Tháng
                  </ToggleButton>
                  <ToggleButton value="yearly" aria-label="yearly">
                    Năm
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <SalesChart data={salesData} />
          </StyledPaper>
        </Grid>

        {/* Monthly Statistics */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">Monthly Statistics</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'warning.main', mr: 1 }}></Box>
                  <Typography variant="body2">Profit</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main', mr: 1 }}></Box>
                  <Typography variant="body2">Revenue</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main', mr: 1 }}></Box>
                  <Typography variant="body2">Expenses</Typography>
                </Box>
              </Box>
            </Box>
            <MonthlyStatistics data={monthlyStats} />
          </StyledPaper>
        </Grid>

        {/* Stat Cards */}
        {statCards.onlineOrders && (
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper>
              <StatCard
                title="Online Orders"
                value="116,490,340"
                progress={60}
                color="#FFD700"
                trend="up"
                trendValue="8.5%"
              />
            </StyledPaper>
          </Grid>
        )}

        {statCards.revenueOrder && (
          <Grid item xs={12} sm={6} md={3}>
            <StyledPaper>
              <StatCard
                title="Revenue Order"
                value="1,195,345,345"
                progress={60}
                color="#4CAF50"
                trend="up"
                trendValue="12.3%"
              />
            </StyledPaper>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <StatCard
              title="Share"
              value="share.vn"
              progress={60}
              color="#2196F3"
              showProgress={false}
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <StatCard
              title="Another Stat"
              value="60/100"
              progress={60}
              color="#9C27B0"
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
