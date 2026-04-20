import { Box, AppBar, IconButton, Typography, useMediaQuery, useScrollTrigger, List, Divider, Stack, Badge, ListItemIcon, ListItemButton, ListItem, ListItemText, SxProps } from "@mui/material";
import { alpha, useTheme } from "@mui/material";
import { HEADER } from "./config-layout";
import { useSettings } from "../../context/settingContext";
import { ContactIcon, LogoIcon, MenuIcon, NotificationIcon, SettingsIcon } from "../../theme/icons";
import { ButtonAction, NavigationList, } from "../../theme/types";
import CustomeAvatar from "../../components/avatar";
import { defaultImages } from "../../theme/images";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { NavigationContext, useNavigate } from "../../context/navigationContext";
import { HeaderContext, useHeader } from "../../context/headerContext";


const navItems = (item: NavigationList) => {
    const theme = useTheme()
    const { settings } = useSettings()
    const { navigateTo } = useNavigate()
    const vertical = settings.themeLayout === "vertical"
    const mini = settings.themeLayout === "mini"
    const horizontal = settings.themeLayout === "horizontal"
    const { reverseLayout } = settings
    return <ListItem key={item.href} disablePadding sx={{ display: 'block', mb: 0.5 }}>
        <ListItemButton
            selected={item.selected}
            onClick={() => navigateTo(item)}
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
}


function Header({ title :propsTitle, children, sx, navigationList, onNavigate, onIconAction, }: { children?: ReactNode, sx?: any, navigationList: NavigationList[], onIconAction: (action: ButtonAction) => void, onNavigate?: (navItem: NavigationList) => void, title?: string }) {
    const { onChangeLayout } = useSettings()
    const theme = useTheme()
    const {title} = useHeader()
    const { settings } = useSettings()
    const { reverseLayout } = settings
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 5
    });

    const AppBarEffect = {
        visibility: trigger ? "visible" : "hidden",
        opacity: trigger ? 1 : 0
    }

    const navigateTo = (item: NavigationList) => {
        if (!onNavigate) return;
        onNavigate(item)
    }

    const value = useMemo(() => {
        return { onIconAction, title: propsTitle || title, logo: <LogoIcon /> }
    }, [onIconAction, title])

    return <HeaderContext.Provider value={value}>
        <NavigationContext.Provider value={{ navigationList, navigateTo }} >
            <AppBar
                sx={{
                    '&::before': {
                        background: alpha(theme.palette.background.default, 0.8),
                        backdropFilter: "blur(6px)",
                        content: "''",
                        width: "100%",
                        height: "100%",
                        ...AppBarEffect,
                        position: "absolute",
                        zIndex: "-1",
                        top: 0,
                        left: 0,
                        transition: theme.transitions.create(["opacity", "visibility"], {
                            duration: theme.transitions.duration.standard,
                        }),
                        ...AppBarEffect,
                        ...sx,
                    },
                }}>
                {children || <>
                    <Box sx={{ maxWidth: "100%", paddingX: { sm: 5, md: 3, xs: 1.5 }, display: 'flex', flexDirection: reverseLayout ? "row-reverse" : "row", margin: 0, alignItems: "center", minHeight: isMobile || settings.themeLayout === "horizontal" ? HEADER.H_MOBILE : HEADER.H_DESKTOP }}>
                        {
                            settings.themeLayout === "horizontal" && <Header.Logo Icon={<LogoIcon />} sx={{
                                display: {
                                    sm: "block",
                                    xs: "none"
                                },
                            }} />
                        }

                        {settings.themeLayout !== "horizontal" && <IconButton
                            onClick={() => onChangeLayout("vertical")}
                            sx={{ mr: 1, color: "text.secondary", display: { sm: 'none' }, fontSize: 24 }}
                        >
                            <MenuIcon />
                        </IconButton>}
                        <Header.Title title="Dashboard" />
                        <Box sx={{ flexGrow: 1 }} />
                        <Header.Icons />

                    </Box>
                    {settings.themeLayout === "horizontal" && <Header.Nabar>
                        <Header.NavigationItems renderNavItem={navItems} />
                    </Header.Nabar>}
                </>}
            </AppBar >
        </NavigationContext.Provider>
    </HeaderContext.Provider>
}


Header.Logo = ({ children, sx, Icon}: { Icon: ReactNode, sx?: SxProps, children?: ReactNode }) => {
    const { settings } = useSettings()
    const {logo} = useHeader()
    const { reverseLayout } = settings
    return children || <Box sx={{ ...sx }} mr={{ xs: reverseLayout ? 0 : 1.5 }} ml={{ xs: reverseLayout ? 5 : 0 }} width="40px" height="40px">
        {Icon || logo}
    </Box>
}

Header.Title = ({ children, title:propsTitle }: { children?: ReactNode, title: string }) => {
    const {title} = useHeader()
    return children || <Typography variant="h6" color="text.primary" mb={0}>
        {propsTitle || title}
    </Typography>
}

Header.Icons = () => {
    const { settings } = useSettings()
    const { onIconAction } = useHeader()
    return <Stack direction={settings.reverseLayout ? "row-reverse" : "row"} alignItems="center" gap={0.75}>
        <IconButton id="#toggle_notifications" onClick={(e) => onIconAction(e)}
            size="small"
            sx={{ color: "text.secondary", fontSize: 24, "&:hover": { transform: "scale(1.04)" } }}
        >
            <Badge badgeContent={4} color="error">
                <NotificationIcon />
            </Badge>
        </IconButton>
        <IconButton id="#toggle_settings" onClick={(e) => onIconAction(e)}
            size="small"
            sx={{ fontSize: 24, color: "text.secondary", "&:hover": { transform: "scale(1.04)" } }}
        >
            <Badge badgeContent="" color={"error"} variant="dot">
                <Box component={"span"} sx={{
                    transition: "transform 0.4s ease-in-out",
                    lineHeight: 0,
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
        <IconButton id="#toggle_contacts" onClick={(e) => onIconAction(e)}
            size="small"
            sx={{ color: "text.secondary", fontSize: 24, "&:hover": { transform: "scale(1.04)" } }}
        >
            <ContactIcon />
        </IconButton>
        <IconButton id="#toggle_profile" onClick={(e) => onIconAction(e)} size="small"
            disableRipple
            sx={{ "&:hover": { transform: "scale(1.04)" } }}
            className="p-0"
        >
            <CustomeAvatar src={defaultImages.avatars.avatar1} width={34} height={34} border={3} />
        </IconButton>
    </Stack>
}

Header.Nabar = ({ children }: { children: ReactNode }) => {
    return <Box sx={{ paddingLeft: "12px !important", paddingRight: "12px !important" }}>
        <Divider sx={{ borderStyle: "dashed", borderWidth: "1px" }} />
        {children}
    </Box>
}

Header.NavigationItems = ({ sx, renderNavItem }: { sx?: SxProps, renderNavItem: (navItem: NavigationList,) => ReactNode }) => {
    const theme = useTheme()
    const { settings } = useSettings()
    const { navigationList } = useNavigate()
    return <List sx={{
        padding: 0, paddingY: 2, display: "flex", gap: 0.7, maxWidth: "calc(100vw - 40px) !important", overflowX: "scroll",
        paddingBottom: 0.7,
        borderBottom: "1px solid",
        borderColor: theme.palette.divider,
        scrollbarGutter: "stable",
        '::-webkit-scrollbar': { height: 7, display: settings?.themeLayout === "horizontal" ? "block" : "none" },
        "&::-webkit-scrollbar-thumb": { backgroundColor: "transparent" },
        "&:hover": {
            "&::-webkit-scrollbar-thumb": { backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.39) }
        },
        ...sx
    }}>
        {
            navigationList.map((x) => {
                return renderNavItem(x)
            })
        }
    </List>
}

export default Header