import Chart from 'react-apexcharts';
import { Card, CardActions, CardHeader, Divider, Stack, Typography, useTheme } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { getCustomShadows } from '../../theme/shadows';
const CHART_HEIGHT = 260;


const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(2),
    '& .apexcharts-canvas .apexcharts-svg': { height: CHART_HEIGHT + 8 },
    '& .apexcharts-legend': {
        display: "none"
    },
    "& .apexcharts-canvas .apexcharts-tooltip": {
        borderRadius: "10px",
        backdropFilter: "blur(6px)",
        color: theme.palette.text.primary,
        boxShadow: getCustomShadows(theme.palette).dropDown,
        background: theme.palette.background.default,
        border: "none",
        fontWeight: 700,
        fontSize: "12px",
    },

}));



export default function AnalyticsPiChart({ chartData }) {

    const theme = useTheme();
    const chartColors = [alpha(theme.palette.primary.main, 0.2), theme.palette.primary.main, theme.palette.primary.light, theme.palette.primary.dark]
    const chartLabels = chartData.map((i) => i.label);
    const chartSeries = chartData.map((i) => i.value);

    const chartOptions = {
        colors: chartColors,
        labels: chartLabels,
        stroke: { show: false, width: 0 },
        legend: { floating: true, horizontalAlign: 'center', },
        dataLabels: { enabled: false },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (val) => val.toLocaleString(),
                title: { formatter: (seriesName) => `${seriesName}` },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        value: {

                            color: theme.palette.text.primary,
                            fontSize: theme.typography.h4.fontSize,
                            fontWeight: theme.typography.h4.fontWeight,
                            fontFamily: 'Barlow, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: theme.palette.text.secondary,
                            fontSize: theme.typography.subtitle1.fontSize,
                            fontWeight: theme.typography.h6.fontWeight,
                            formatter: function (w) {
                                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return total.toLocaleString('');
                            },
                        },
                    },
                },
            },
        },
    };

    return (
        <Card>
            <CardHeader sx={{ paddingX: 3, paddingY: 3, paddingBottom: 0, mb: 5 }} title="Current Download" subheader="Downloaded by operating system" slotProps={{
                title: { sx: { mb: 1 } },
                subheader: { sx: { color: "text.secondary" } }
            }} />
            <ChartWrapperStyle dir="ltr" sx={{
                width: "auto", margin: "auto", height: "fit-content", display: "flex", alignItems: "flex-end", justifyContent: 'center',
                marginTop: 4
            }}>
                <Chart type="donut" series={chartSeries} options={chartOptions} width={325} />
            </ChartWrapperStyle>
            <Divider sx={{
                borderColor: theme.palette.text.secondary,
                background:"none",
                borderWidth: "0px 0px thin",
                height: 0,
                mt:3,
                opacity: 0.1,
                borderStyle: "dashed"
            }} />
            <CardActions sx={{ display: "flex",paddingY:3.5, alignItems:'center',justifyContent:"center" }}>
                {
                    chartColors.map((x,key) => (
                        <Stack key={key} direction={"row"} alignItems={"center"} spacing={1} justifyContent={"center"} lineHeight={0}>
                            <span style={{ background: x, borderRadius: "50%", display: "inline-block", width: 12, height: 12 }} />
                            <Typography textTransform={"capitalize"} variant='subtitle1' color='text.primary'>
                                {chartData[key]?.label}
                            </Typography>
                        </Stack>
                    ))
                }

            </CardActions>
        </Card>

    );
}


