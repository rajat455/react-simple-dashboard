import './App.css'
import { useMemo, useState } from 'react'
import { navConfig, fonts, colorPresets, ThemeProvider, DashboardLayout, CustomeAvatar, SettingsDrawer, SettingsIcon, NotificationIcon, ContactIcon, defaultImages } from "./index"
import { Badge, Box, Button, Container, Grid, Icon, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import WelcomeBanner from './components/incomplate/welcomeBenner'


function App() {
  const [openSettings, setOpenSettings] = useState(false)
  const settings = {
    themeMode: "light",
    themeColorPresets: "default",
    themeFont: 'Public Sans',
    themeFontSize: 17,
    themeLayout: "vertical",
    isContrast: false,
    state: {
      title: "App"
    },
    isfullScreen: document.fullscreenElement ? true : false,
    reverseLayout: false,
  }
  const ThemeOptions = useMemo(() => {
    return {
      navigationList: [...navConfig],
      fonts: [...fonts],
      colorPresets: colorPresets,
      renderLogo: (theme) => {
        return <svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="_r_4_-1" x1="152" y1="167.79" x2="65.523" y2="259.624" gradientUnits="userSpaceOnUse"><stop stopColor={theme.palette.primary.dark}></stop><stop offset="1" stopColor={theme.palette.primary.main}></stop></linearGradient><linearGradient id="_r_4_-2" x1="86" y1="128" x2="86" y2="384" gradientUnits="userSpaceOnUse"><stop stopColor={theme.palette.primary.light}></stop><stop offset="1" stopColor={theme.palette.primary.main}></stop></linearGradient><linearGradient id="_r_4_-3" x1="402" y1="288" x2="402" y2="384" gradientUnits="userSpaceOnUse"><stop stopColor={theme.palette.primary.light}></stop><stop offset="1" stopColor={theme.palette.primary.main}></stop></linearGradient></defs><path fill="url(#_r_4_-1)" d="M86.352 246.358C137.511 214.183 161.836 245.017 183.168 285.573C165.515 317.716 153.837 337.331 148.132 344.418C137.373 357.788 125.636 367.911 111.202 373.752C80.856 388.014 43.132 388.681 14 371.048L86.352 246.358Z"></path><path fill="url(#_r_4_-2)" fillRule="evenodd" clipRule="evenodd" d="M444.31 229.726C398.04 148.77 350.21 72.498 295.267 184.382C287.751 198.766 282.272 226.719 270 226.719V226.577C257.728 226.577 252.251 198.624 244.735 184.24C189.79 72.356 141.96 148.628 95.689 229.584C92.207 235.69 88.862 241.516 86 246.58C192.038 179.453 183.11 382.247 270 383.858V384C356.891 382.389 347.962 179.595 454 246.72C451.139 241.658 447.794 235.832 444.31 229.726Z"></path><path fill="url(#_r_4_-3)" fillRule="evenodd" clipRule="evenodd" d="M450 384C476.509 384 498 362.509 498 336C498 309.491 476.509 288 450 288C423.491 288 402 309.491 402 336C402 362.509 423.491 384 450 384Z"></path></svg>
      },
      renderNavItem: (item, theme, settings) => {
        const vertical = settings.themeLayout === "vertical"
        const mini = settings.themeLayout === "mini"
        const horizontal = settings.themeLayout === "horizontal"
        const { reverseLayout } = settings

        return <ListItem key={item.heading} disablePadding sx={{ display: 'block', mb: 0.5 }}>
          <ListItemButton
            selected={item.selected}
            sx={{
              minHeight: horizontal ? 32 : 44,
              borderRadius: 1,
              display: 'flex',
              maxWidth: "100%",
              flexDirection: !mini ? (reverseLayout ? "row-reverse" : "row") : "column",
              justifyContent: !mini ? (reverseLayout ? "end" : 'start') : 'center',
              alignItems: 'center',
              paddingY: horizontal ? 0 : 0.5,
              gap: (!mini && !reverseLayout && !horizontal ? 0.7 : !mini && reverseLayout && !horizontal ? 1.5 : 0.7),
              paddingLeft: !mini && !horizontal ? (reverseLayout ? 1 : 1.5) : 1,
              paddingRight: !mini && !horizontal ? (reverseLayout ? 1.5 : 1) : 1,
              paddingTop: horizontal ? 0 : (!mini ? 0.5 : 1)
            }}
          >
            <ListItemIcon sx={{
              minWidth: 0,
              mr: (!mini && !horizontal && vertical) ? (!reverseLayout ? 0.8 : 0) : 0,
              justifyContent: 'center',
              alignItems: "center",
              color: item.selected ? (theme.palette.mode === "light" ? "primary.main" : "primary.light") : "text.secondary",
              fontSize: 24
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText style={{ marginTop: 0, marginBottom: 3, flex: "unset" }} primary={item.heading} primaryTypographyProps={{ minWidth: "max-content", fontWeight: item.selected ? (!mini ? 600 : 700) : (!mini ? 500 : 600), color: item.selected ? (theme.palette.mode === "light" ? "primary.main" : "primary.light") : "text.secondary", sx: { lineHeight: "16px", fontSize: !mini ? theme.typography.body2.fontSize : `calc(${theme.typography.subtitle2.fontSize} - 1px)` } }} />
          </ListItemButton>
        </ListItem>
      },
      renderFooter: (theme) => {
        return <Box sx={{ px: 2, py: 5, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
          <IconButton size="small"
            onClick={() => setOpenSettings(true)}
            disableRipple
            sx={{ "&:hover": { transform: "scale(1.04)" } }}
            className="p-0">
            <CustomeAvatar src={defaultImages.avatars.avatar1} border={3} width={48} height={48} />
          </IconButton>
          <Typography variant='subtitle1' mt={1}>Rajat Jayswal</Typography>
          <Typography variant='body2' sx={{ color: 'text.disabled', mb: 2 }}>rajatjayswal80@mail.com</Typography>
          <Button variant='contained' color='secondary' sx={{ borderRadius: theme.shape.borderRadius + "px" }}>
            Sign Out
          </Button>
        </Box>
      },
      sideBarHeader: {
        renderTitle: (_theme, settings) => {
          return settings?.state?.title
        },
        renderIcons: (_theme, settings) => {
          return <Stack direction={settings.reverseLayout ? "row-reverse" : "row"} alignItems="center" gap={0.75}>
            <IconButton
              onClick={() => setOpenSettings(true)}
              sx={{ fontSize: 24, color: "text.secondary", "&:hover": { transform: "scale(1.04)" } }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationIcon />
              </Badge>
            </IconButton>
            <IconButton size="small"
              onClick={() => setOpenSettings(true)}
              sx={{ fontSize: 24, color: "text.secondary", "&:hover": { transform: "scale(1.04)" } }}
            >
              <Badge badgeContent="" color={"error"} variant="dot">
                <Box component={"span"} sx={{
                  transition: "transform 0.4s ease-in-out",
                  animation: "spin 9s linear infinite",
                  "@keyframes spin": {
                    "0%": {
                      transform: "rotate(0deg)",
                    },
                    "100%": {
                      transform: "rotate(360deg)",
                    },
                  },
                }}>
                  <SettingsIcon />
                </Box>
              </Badge>
            </IconButton>
            <IconButton size="small"
              onClick={() => setOpenSettings(true)}
              sx={{ color: "text.secondary", fontSize: 24, "&:hover": { transform: "scale(1.04)" } }}
            >
              <ContactIcon />
            </IconButton>
            <IconButton size="small"
              onClick={() => setOpenSettings(true)}
              disableRipple
              sx={{ "&:hover": { transform: "scale(1.04)" } }}
              className="p-0"
            >
              <CustomeAvatar src={defaultImages.avatars.avatar1} width={34} height={34} border={3} />
            </IconButton>
          </Stack>
        }
      }
    }
  }, [])


  return (

    <ThemeProvider themeOptions={ThemeOptions} settings={settings} >
      <DashboardLayout themeOptions={ThemeOptions}>
        <Container sx={{ paddingX: { sm: 5 }, paddingTop: 1, paddingBottom: 8,minWidth:"100%", maxWidth: "calc(100vw - 40px)"}}>
          <Grid container={true} spacing={2}>
            <Grid size={8}>
              <WelcomeBanner />
            </Grid>
            <Grid size={4}>
              {/* <WelcomeBanner /> */}
            </Grid>
          </Grid>
        </Container>


      </DashboardLayout>
      <SettingsDrawer
        themeOptions={ThemeOptions}
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
