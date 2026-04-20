import './App.css'
import { useState } from 'react'
import { navConfig, ThemeProvider, DashboardLayout, SettingsDrawer, defaultImages, WelcomeBanner } from "../dist/index"
import { Button, Chip, Container, Grid, IconButton, Typography } from '@mui/material'
import CustomeDataGrid from './components/customeDataGrid'
import { GridMoreVertIcon } from '@mui/x-data-grid'

function App() {
  const [openSettings, setOpenSettings] = useState(false)
  const settings = {
    themeMode: "light",
    themeColorPresets: "default",
    themeFont: 'Public Sans',
    themeFontSize: 17,
    themeLayout: "vertical",
    isContrast: false,
    isfullScreen: document.fullscreenElement ? true : false,
    reverseLayout: false,
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Invoice ID',
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      filterable: false,
      sortable: false
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      filterable: false,
      sortable: false
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      minWidth: 100,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <Typography variant="body2" mb={0}>${params.value}</Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 130,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const status = params.value;
        const statusConfig = {
          'Paid': { bg: (theme) => theme.palette.success.lighter, color: (theme) => theme.palette.success.dark },
          'Out of date': { bg: (theme) => theme.palette.error.lighter, color: (theme) => theme.palette.error.dark },
          'Progress': { bg: (theme) => theme.palette.warning.lighter, color: (theme) => theme.palette.warning.dark },
        };

        const config = statusConfig[status] || statusConfig['Progress'];

        return (
          <Chip
            label={status}
            size="small"
            sx={{
              fontWeight: 700,
              borderRadius: '8px',
              backgroundColor: config.bg,
              color: config.color,
              "& .MuiChip-label": {
                textTransform: "none",
                fontWeight: 700,
              },
              fontSize: (theme) => `calc(${theme.typography.subtitle2.fontSize} + 1px)`,
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      flex: 1,
      minWidth: 130,
      align: 'left',
      renderCell: (params) => (
        <IconButton
          size="small"
        // onClick={() => onActionClick && onActionClick(params.row)}
        >
          <GridMoreVertIcon fontSize="small" sx={{ color: '#919EAB' }} />
        </IconButton>
      ),
    },
  ]

  const rows = [
    { id: 'INV-1990', category: 'Android', price: 83.74, status: 'Paid' },
    { id: 'INV-1991', category: 'Mac', price: 97.14, status: 'Out of date' },
    { id: 'INV-1992', category: 'Windows', price: 68.71, status: 'Progress' },
    { id: 'INV-1993', category: 'Android', price: 85.21, status: 'Paid' },
    { id: 'INV-1994', category: 'Mac', price: 52.17, status: 'Paid' },
  ];




  return (
    <ThemeProvider fonts={[/**Include Fonts */]} colorPresets={[/**Include ColorPresets */]} settings={settings} >
      <DashboardLayout
        navigationList={navConfig}
        onHeaderAction={(action) => {
          const { id } = action.currentTarget
          switch (id) {
            case "#toggle_settings":
              return setOpenSettings(true)
            default:
              return
          }
        }
        }
        onNavigate={(item) => {
          console.log(item);
        }}>
        <Container maxWidth={"xl"} sx={{ paddingX: { lg: 5, sm: 5, md: 3, xs: 1.5 }, paddingTop: 1, paddingBottom: 8, }}>
          <Grid container={true}
            spacing={{ lg: 3, md: 1.5, sm: 2, xs: 2 }}
          >
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <WelcomeBanner bannerSubHeading="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything." color="primary" onGo={() => console.log("Click")} backgroundImage={defaultImages.backgrounds.welcomeBanner1} />
            </Grid>
            <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
              <CustomeDataGrid columns={columns} title='New Users' InnerProps={{ rows: rows, disableColumnFilter: false, columns: columns }} >
              </CustomeDataGrid>
            </Grid>
            <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
              <WelcomeBanner SvgComponent={() => {
                return <>
                  <defaultImages.svgs.Svg1 />
                </>
              }} bannerHeading='Welcome back 👋 Jayswal Rajat' bannerSubHeading='Have nice day Mr. Rajat this is an owerview of your dashboard' color='primary' >
                <WelcomeBanner.BannerAction>
                  <Button size='small' color='primary' variant='contained'>
                    Order Now
                  </Button>
                </WelcomeBanner.BannerAction>
              </WelcomeBanner>
            </Grid>
          </Grid>
        </Container>
      </DashboardLayout>
      <SettingsDrawer
        open={openSettings}
        onChangeSettings={(settings) => {
          console.log(settings);
        }}
        onClose={() => setOpenSettings(false)}
      />
    </ThemeProvider >
  )
}
export default App
