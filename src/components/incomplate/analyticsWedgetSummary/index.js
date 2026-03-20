import Chart from 'react-apexcharts';
import { Box, Card, Stack, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getCustomShadows, getShadows } from '../../theme/shadows';

export default function AnalyticsWidgetSummary({ title, total, percent, color, chartData }) {
  const theme = useTheme();
  color = color ? color(theme) : theme.palette.primary.main
  const chartOptions = {
    colors: [color],
    tooltip: {
      enabled: true,
      shared: false,
      intersect: true,
      theme: theme.palette.mode,
      style: {
        fontFamily: theme.typography.fontFamily
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      marker: { show: true },
    },
    grid: {
      show: false
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
    yaxis: {
      show: false,
    },
    chart: { sparkline: { enabled: true } },
    plotOptions: {
      bar: {
        columnWidth: '62%', borderRadius: 2, borderRadiusApplication: "end", horizontal: false,
      }
    },
  };

  return (
    <Card sx={{ p: 3, width: "100%", display: 'flex', alignItems: "center" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ mb: 0 }}>{title}</Typography>
        <Typography variant="h3" mt={1.5} mb={1} fontFamily={'Barlow, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'}>{total.toLocaleString()}</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {percent > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
          <Typography variant="subtitle1" component="span">
            {percent > 0 ? `+${percent}%` : `${percent}% `}
          </Typography>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
            last 7 days
          </Typography>
        </Stack>
      </Box>
      <Box sx={{
        width: 60, height: 50,
        "& .apexcharts-canvas .apexcharts-tooltip": {
          minWidth: "80px",
          borderRadius: "10px",
          backdropFilter: "blur(6px)",
          color: "text.secondary",
          boxShadow: getCustomShadows(theme.palette).dropDown,
          background: theme.palette.background.default,
          border: "none",
          fontWeight: 700,
          fontSize: "12px",
        },
        "& .apexcharts-canvas .apexcharts-tooltip .apexcharts-tooltip-title": {
          background: theme.palette.background.alternet,
          textAlign: "center",
          color: "primary",
          border: "none"
        },
      }}>
        <Chart type="bar" series={[{ data: chartData, name: "", }]} options={chartOptions} width="100%" height="100%" />
      </Box>
    </Card>
  );
}