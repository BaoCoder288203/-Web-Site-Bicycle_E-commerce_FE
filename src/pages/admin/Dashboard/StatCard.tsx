import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string;
  progress: number;
  color: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  showProgress?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  progress, 
  color, 
  trend, 
  trendValue,
  showProgress = true
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" component="div" fontWeight="medium" sx={{ flexGrow: 1 }}>
          {value}
        </Typography>
        {trend && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: trend === 'up' ? 'success.main' : 'error.main',
            bgcolor: trend === 'up' ? 'success.light' : 'error.light',
            borderRadius: '16px',
            px: 1,
            py: 0.5
          }}>
            {trend === 'up' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {trendValue}
            </Typography>
          </Box>
        )}
      </Box>
      
      {showProgress && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                  borderRadius: 4,
                }
              }} 
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {progress}/100
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StatCard;
