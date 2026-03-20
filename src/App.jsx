import './App.css'
import { useMemo, useState } from 'react'
import { navConfig, fonts, colorPresets, ThemeProvider, DashboardLayout, CustomeAvatar, Icons, SettingsDrawer } from "react-simple-dashboard"
import { Badge, Box, Button, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'


const defaultAvatar = "data:image/webp;base64,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"
function App() {
  const [openSettings, setOpenSettings] = useState(false)
  const settings = {
    themeMode: "light",
    themeColorPresets: "default",
    themeFont: 'Public Sans',
    themeFontSize: 17,
    themeLayout: "vertical",
    isContrast: false,
    state:{
      title:"App"
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
            <CustomeAvatar src={defaultAvatar} border={3} width={48} height={48} />
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
              sx={{ fontSize: "1.5rem", color: "text.secondary", "&:hover": { transform: "scale(1.04)" } }}
            >
              <Badge badgeContent={4} color="error">
                {Icons.notification}
              </Badge>
            </IconButton>
            <IconButton size="small"
              onClick={() => setOpenSettings(true)}
              sx={{ fontSize: "1.5rem", color: "text.secondary", "&:hover": { transform: "scale(1.04)" } }}
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
                  {Icons.settings}
                </Box>
              </Badge>
            </IconButton>
            <IconButton size="small"
              onClick={() => setOpenSettings(true)}
              sx={{ color: "text.secondary", fontSize: "1.5rem", "&:hover": { transform: "scale(1.04)" } }}
            >
              {Icons.contact}
            </IconButton>
            <IconButton size="small"
              onClick={() => setOpenSettings(true)}
              disableRipple
              sx={{ "&:hover": { transform: "scale(1.04)" } }}
              className="p-0"
            >
              <CustomeAvatar src={defaultAvatar} width={34} height={34} border={3} />
            </IconButton>
          </Stack>
        }
      }
    }
  }, [])


  return (

    <ThemeProvider themeOptions={ThemeOptions} settings={settings} >
      <DashboardLayout themeOptions={ThemeOptions}>
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
