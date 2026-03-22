import { Box, AppBar, IconButton, Container, Typography, useMediaQuery, useScrollTrigger, List, ListItem, ListItemButton, ListItemText, Divider, ListItemIcon, Stack, Badge, Icon } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { HEADER } from "./config-layout";
import { useSettings } from "../../context/settingContext";
import { ContactIcon, MenuIcon, NotificationIcon, SettingsIcon } from "../../theme/icons";
import { NavigationList, SettingsValueProps, ThemeOptions } from "../../theme/types";
import { navConfig } from "./nav-config";
import CustomeAvatar from "../../components/avatar";
import { defaultImages } from "../../theme/images";

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
const title = () => "Dashboard"

const icons = (theme: any, settings: SettingsValueProps) => {
    return <Stack direction={settings.reverseLayout ? "row-reverse" : "row"} alignItems="center" gap={0.75}>
        <IconButton
            sx={{ color: "text.secondary", fontSize: 24, "&:hover": { transform: "scale(1.04)" } }}
        >
            <Badge badgeContent={4} color="error">
                <NotificationIcon />
            </Badge>
        </IconButton>
        <IconButton size="small"
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
            sx={{ color: "text.secondary", fontSize: 24, "&:hover": { transform: "scale(1.04)" } }}
        >
            <ContactIcon />
        </IconButton>
        <IconButton size="small"
            disableRipple
            sx={{ "&:hover": { transform: "scale(1.04)" } }}
            className="p-0"
        >
            <CustomeAvatar src={defaultImages.avatars.avatar1} width={34} height={34} border={3} />
        </IconButton>
    </Stack>
}
export default function Header({ themeOptions }: Props) {
    const { onChangeLayout } = useSettings()
    const theme = useTheme()

    const rendertitle = themeOptions?.sideBarHeader?.renderTitle || title
    const renderIcons = themeOptions.sideBarHeader?.renderIcons || icons
    const navigationList = themeOptions?.navigationList || navConfig
    const renderNavItem = themeOptions?.renderNavItem || list
    const renderLogo = themeOptions?.renderLogo || logo
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



    return <>

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
                },
            }}>
            <Container maxWidth={"xl"} sx={{ paddingX: { sm: 5, md: 3 }, display: 'flex', flexDirection: reverseLayout ? "row-reverse" : "row", margin: 0, alignItems: "center", minHeight: isMobile || settings.themeLayout === "horizontal" ? HEADER.H_MOBILE : HEADER.H_DESKTOP }}>

                {
                    settings.themeLayout === "horizontal" && <Box mr={{ xs: reverseLayout ? 0 : 1.5 }} ml={{ xs: reverseLayout ? 5 : 0 }} width="40px" height="40px">
                        {renderLogo(theme, settings)}
                    </Box>
                }

                {settings.themeLayout !== "horizontal" && <IconButton

                    onClick={() => onChangeLayout("vertical")}
                    sx={{ mr: 1, color: "text.secondary", display: { sm: 'none' }, fontSize: 24 }}
                >
                    <Icon>
                        <MenuIcon />
                    </Icon>
                </IconButton>}
                <Typography variant="h6" color="text.primary" mb={0}>
                    {rendertitle(theme, settings)}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />
                {
                    typeof renderIcons !== "undefined" ? renderIcons(theme, settings) : ""
                }
            </Container>
            {settings.themeLayout === "horizontal" && <Container maxWidth="xl" sx={{ paddingLeft: "12px !important", paddingRight: "12px !important" }}>
                <Divider sx={{ borderStyle: "dashed", borderWidth: "1px" }} />
                <List sx={{
                    padding: 0, paddingY: 2, display: "flex", gap: 0.7, maxWidth: "calc(100vw - 24px) !important", overflowX: "scroll",
                    paddingBottom: 0.7,

                    borderBottom: "1px solid",
                    borderColor: theme.palette.divider,
                    scrollbarGutter: "stable",
                    '::-webkit-scrollbar': { height: 7, display: settings?.themeLayout === "horizontal" ? "block" : "none" },
                    "&::-webkit-scrollbar-thumb": { backgroundColor: "transparent" },
                    "&:hover": {
                        "&::-webkit-scrollbar-thumb": { backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.39) }
                    },
                }}>
                    {
                        navigationList.map((x) => {
                            return renderNavItem(x, theme, settings)
                        })
                    }
                </List>
            </Container>}
        </AppBar >
    </>
}