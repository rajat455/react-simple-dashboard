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
import { ArrowLeftIcon, ArrowRightIcon } from '../../theme/icons';
import { useCallback, useEffect } from 'react';
import { defaultImages } from '../../theme/images';

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
        fontSize:24,
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
      <CustomeAvatar src={images} border={3} width={48} height={48} />
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
              open ? (reverseLayout ? <ArrowRightIcon/> : <ArrowLeftIcon/>) : (!reverseLayout ? <ArrowRightIcon/> : <ArrowLeftIcon/>)
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
          style={{zIndex:open ? 1200 : -1, width:280}}
          PaperProps={{
            sx: {
              width: 280,
              bgcolor: 'background.default',
              backgroundImage: `url(${defaultImages.backgrounds.deemBg1}), url(${defaultImages.backgrounds.deemBg2})`,
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