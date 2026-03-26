import './App.css'
import { useMemo, useState } from 'react'
import { navConfig, fonts, colorPresets, ThemeProvider, DashboardLayout, CustomeAvatar, SettingsDrawer, SettingsIcon, NotificationIcon, ContactIcon, defaultImages, WelcomeBanner, LogoIcon } from "./index"
import { Badge, Box, Button, Container, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'

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
      title: "Dashboard"
    },
    isfullScreen: document.fullscreenElement ? true : false,
    reverseLayout: false,
  }
  /** @type {import('react-easy-dashboard').ThemeOptions} */
  const ThemeOptions = useMemo(() => {
    return {
      navigationList: [...navConfig],
      fonts: [...fonts],
      colorPresets: colorPresets,
      renderLogo: (theme) => {
        return <LogoIcon />
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
      header: {
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
        <Container maxWidth={"xl"} sx={{ paddingTop: 1, paddingBottom: 8, }}>
          <Grid container={true}
            spacing={{ lg: 3, md: 1.5, sm: 2, xs: 2 }}
          >
            <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
              <WelcomeBanner bannerHeading='Welcome back 👋 Jaydon Frankie' sortDescription="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything." color="info" onGo={() => console.log("Click")} backgroundImage={defaultImages.backgrounds.welcomeBanner1} />
            </Grid>
            <Grid size={{ lg: 6, md: 12, sm: 12, xs: 12 }}>
              <WelcomeBanner bannerHeading='Welcome back 👋 Jaydon Frankie' sortDescription="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything." color="info" onGo={() => console.log("Click")} backgroundImage={defaultImages.backgrounds.welcomeBanner1} />
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
