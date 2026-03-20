import { styled, useTheme, alpha, Theme, CSSObject } from '@mui/material/styles';
import {
  Box,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer,
  Typography,
  useMediaQuery,
  Button
} from '@mui/material';

// ગ્લોબલ કમ્પોનન્ટ્સ અને કોન્ફિગ
import { HEADER, NAV } from './config-layout';
import CustomeAvatar from '../../components/avatar';

// Mixins with TypeScript Types
const openMixin = (theme: Theme): CSSObject => ({
  width: NAV.WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: NAV.WIDTH_MIN,
});
const bgEffect1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzNykiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzNyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K"
const bgEffect2 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCkiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="

const defaultAvtar = "data:image/webp;base64,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"
// Styled Component
const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(
  ({ theme, open }) => {
    const paperStyle = {
      overflow: "visible",
      position: 'reletive',
      boxShadow: "none",
      borderRight: `1px solid ${theme.palette.divider}`,
      scrollbarGutter: "auto",
      background: theme.palette.background.default,

    };

    return {
      width: NAV.WIDTH,
      overflowX: "visible",
      ...(open && {
        ...openMixin(theme),
        '& .MuiDrawer-paper': { ...openMixin(theme), ...paperStyle },
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': { ...closedMixin(theme), ...paperStyle },
      }),
    };
  }
);

import MuiDrawer from '@mui/material/Drawer';
import { useSettings } from '../../context/settingContext';
import { NavigationList, SettingsValueProps, ThemeOptions } from '../../theme/types';
import { navConfig } from './nav-config';
import { Icons } from '../../theme/icons';
import { useCallback, useEffect } from 'react';

interface Props {
  themeOptions: ThemeOptions;
}
const list = (item: NavigationList, theme: any, settings: SettingsValueProps) => {
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
}

const logo = (theme: any) => {
  return <svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="_r_4_-1" x1="152" y1="167.79" x2="65.523" y2="259.624" gradientUnits="userSpaceOnUse"><stop stopColor={theme.palette.primary.dark}></stop><stop offset="1" stopColor={theme.palette.primary.main}></stop></linearGradient><linearGradient id="_r_4_-2" x1="86" y1="128" x2="86" y2="384" gradientUnits="userSpaceOnUse"><stop stopColor={theme.palette.primary.light}></stop><stop offset="1" stopColor={theme.palette.primary.main}></stop></linearGradient><linearGradient id="_r_4_-3" x1="402" y1="288" x2="402" y2="384" gradientUnits="userSpaceOnUse"><stop stopColor={theme.palette.primary.light}></stop><stop offset="1" stopColor={theme.palette.primary.main}></stop></linearGradient></defs><path fill="url(#_r_4_-1)" d="M86.352 246.358C137.511 214.183 161.836 245.017 183.168 285.573C165.515 317.716 153.837 337.331 148.132 344.418C137.373 357.788 125.636 367.911 111.202 373.752C80.856 388.014 43.132 388.681 14 371.048L86.352 246.358Z"></path><path fill="url(#_r_4_-2)" fillRule="evenodd" clipRule="evenodd" d="M444.31 229.726C398.04 148.77 350.21 72.498 295.267 184.382C287.751 198.766 282.272 226.719 270 226.719V226.577C257.728 226.577 252.251 198.624 244.735 184.24C189.79 72.356 141.96 148.628 95.689 229.584C92.207 235.69 88.862 241.516 86 246.58C192.038 179.453 183.11 382.247 270 383.858V384C356.891 382.389 347.962 179.595 454 246.72C451.139 241.658 447.794 235.832 444.31 229.726Z"></path><path fill="url(#_r_4_-3)" fillRule="evenodd" clipRule="evenodd" d="M450 384C476.509 384 498 362.509 498 336C498 309.491 476.509 288 450 288C423.491 288 402 309.491 402 336C402 362.509 423.491 384 450 384Z"></path></svg>
}
const Footer = (theme: any) => {
  return <Box sx={{ px: 2, py: 5, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
    <IconButton size="small"
      disableRipple
      sx={{ "&:hover": { transform: "scale(1.04)" } }}
      className="p-0">
      <CustomeAvatar src={defaultAvtar} border={3} width={48} height={48} />
    </IconButton>
    <Typography variant='subtitle1' mt={1}>Rajat Jayswal</Typography>
    <Typography variant='body2' sx={{ color: 'text.disabled', mb: 2 }}>rajatjayswal80@mail.com</Typography>
    <Button variant='contained' color='secondary' sx={{ borderRadius: theme.shape.borderRadius + "px" }}>
      Sign Out
    </Button>
  </Box>
}


export default function NavVertical({ themeOptions }: Props) {
  const theme = useTheme();
  const navigationList = themeOptions?.navigationList || navConfig
  const renderNavItem = themeOptions?.renderNavItem || list
  const renderLogo = themeOptions?.renderLogo || logo
  const renderFooter = themeOptions?.renderFooter || Footer

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const isDashktop = useMediaQuery(theme.breakpoints.down("lg"));
  const { settings, onChangeLayout } = useSettings();
  const { reverseLayout } = settings
  const open = (settings.themeLayout === "vertical") || (settings.themeLayout === "horizontal")

  const renderList = (
    <>
      {/* LOGO & TOGGLE BUTTON SECTION */}
      <Box sx={{
        display: 'flex',
        flexDirection: reverseLayout ? "row-reverse" : "row",
        paddingLeft: open ? (!reverseLayout ? 3.5 : 0) : 0,
        paddingRight: open ? (reverseLayout ? 3.5 : 0) : 0,
        paddingTop: 2.5,
        paddingBottom: open ? 2 : 2.5,
        position: "relative",
        zIndex: 1200,
        alignItems: 'center',
        justifyContent: open ? "space-between" : "center"
      }}>
        <Box width="40px" height="40px">
          {renderLogo(theme, settings)}
        </Box>

        {!isMobile && (
          <IconButton
            disabled={isTab}
            onClick={() => onChangeLayout(settings.themeLayout === "mini" ? "vertical" : "mini")}
            size='small'
            sx={{
              border: "1px solid",
              bgcolor: theme.palette.background.default,
              left: !reverseLayout ? (open ? NAV.WIDTH : NAV.WIDTH_MIN) : 0,
              top: HEADER.H_DESKTOP / 2,
              transform: `translate(-50% ,-50%)`,
              position: "absolute",
              fontSize: "1rem",
              color: "text.secondary",
              zIndex: theme.zIndex.drawer + 1,
              borderColor: theme.palette.divider,
              "&:hover": {
                bgcolor: (theme.palette.background as any)["neutral"],
                color: "text.primary"
              },
            }}
          >
            {
              open ? (reverseLayout ? Icons.arrowRight : Icons.arrowLeft) : (!reverseLayout ? Icons.arrowRight : Icons.arrowLeft)
            }
          </IconButton>
        )}
      </Box>

      {/* NAVIGATION ITEMS SECTION */}

      <Box sx={{
        paddingX: 0,
        overflowY: "auto",
        overflowX: "hidden",
        height: '100%',
        maxWidth: "100% !important",
        '::-webkit-scrollbar': { display: open ? "block" : "none", width: 2 },
        "&::-webkit-scrollbar-thumb": { backgroundColor: "transparent" },
        "&:hover": {
          "&::-webkit-scrollbar-thumb": { backgroundColor: alpha(theme.palette.grey[500], 0.39) }
        },
      }}>
        <List sx={{ py: 0, px: open ? 2 : 0.7 }}>
          <Box sx={{
            width: "100%",
            position: "relative",
            msOverflowStyle: "none",
            flexDirection: reverseLayout ? "row-reverse" : "row",
            px: reverseLayout ? 1 : 1.5, py: 1,
            display: open ? "flex" : "none",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: theme.transitions.create(['color', 'padding-left'], { duration: 300, easing: theme.transitions.easing.easeInOut }),
          }}>
            <Typography color='text.primary' variant='subtitle2' sx={{ textTransform: 'uppercase' }}>
              overview
            </Typography>
          </Box>

          <Collapse in={true} timeout="auto" unmountOnExit>
            <List sx={{ py: 0 }}>
              {navigationList.map((item) => {
                return renderNavItem(item, theme, settings);
              })}
            </List>
          </Collapse>
        </List>

        {open && renderFooter(theme, settings)}
      </Box>

    </>
  );

  useEffect(useCallback(() => {
    if (isTab) onChangeLayout("mini")
  }, [isTab, isDashktop]), [isTab, isDashktop])

  return (
    <Box component="nav" sx={{ flex: 0, flexShrink: { lg: 0 }, width: { lg: open ? NAV.WIDTH : NAV.WIDTH_MIN } }}>
      {isMobile ? (
        <Drawer
          anchor={!reverseLayout ? "left" : "right"}
          open={open}
          onClose={() => onChangeLayout("mini")}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 280,
              bgcolor: 'background.default',
              backgroundImage: `url(${bgEffect1}), url(${bgEffect2})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "50%, 50%",
              backgroundPosition: "left bottom, right top"
            }
          }}
        >
          {renderList}
        </Drawer>
      ) : (
        <StyledDrawer anchor={!reverseLayout ? 'left' : 'right'} variant="permanent" open={open}>
          {renderList}
        </StyledDrawer>
      )}
    </Box>
  );
}