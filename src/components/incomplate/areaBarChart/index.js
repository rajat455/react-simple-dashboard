import Chart from 'react-apexcharts';
import { Box, Card, CardHeader, Typography, Stack, useTheme, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CHART_HEIGHT = 250;

export default function AreaBarChart({ title, subheader, chartData }) {
    const theme = useTheme();

    const chartOptions = {
        colors: chartData.map((i) => i.color),
        chart: {
            stacked: true,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
                borderRadius: 4,
                borderRadiusApplication: 'around',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: { show: false },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                style: { colors: theme.palette.text.disabled },
            },
        },
        grid: {
            strokeDashArray: 3,
            borderColor: theme.palette.divider,
        },
        legend: { show: false }, // આપણે કસ્ટમ લિજેન્ડ બનાવીશું
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (val) => `${val}k`,
            },
        },
    };

    return (
        <Card>
            <CardHeader
                sx={{ paddingX: 3, paddingY: 3, paddingBottom: 0, mb: 1 }}
                title={title}
                subheader={subheader}
                slotProps={{
                    title: { sx: { mb: 1 } },
                    subheader: { sx: { color: "text.secondary" } }
                }}
                action={
                    <TextField
                        select
                        size="small"
                        value="2023"
                        SelectProps={{ native: true }}
                        sx={{ '& .MuiNativeSelect-select': { typography: 'subtitle2' } }}
                    >
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </TextField>
                }
            />
            <Stack direction="row" spacing={3} sx={{ px: 3, py: 2 }}>
                {chartData.map((item) => (
                    <Stack key={item.label} spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                {item.label}
                            </Typography>
                        </Stack>
                        <Typography variant="h6">{item.total}</Typography>
                    </Stack>
                ))}
            </Stack>

            <Box sx={{ mt: 3, mx: 3 }}>
                <Chart
                    type="bar"
                    series={chartData.map((item) => ({ name: item.label, data: item.data }))}
                    options={chartOptions}
                    height={CHART_HEIGHT}
                />
            </Box>
        </Card>
    );
}