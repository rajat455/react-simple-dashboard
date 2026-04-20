import { Drawer, Stack, Typography, Box, alpha, Button, Chip, Tooltip, Paper, Grid, IconButton, Badge, useTheme } from '@mui/material';
import AntSwitch from '../../components/antSwitch';
import CustomeSlider from '../../components/customeSlider';
import { useSettings } from '../../context/settingContext';
import { colorPresets as C, fonts as F } from '../../theme/themeUtils';
import { CloseIcon, ColorPresetsIcon, ContrastIcon, FontsIcon, FullScreenIcon, InfoIcon, Layout1Icon, Layout2Icon, Layout3Icon, NightModeIcon, ResetIcon, RightToLeftIcon, WindowScreenIcon } from '../../theme/icons';
import { SettingsValueProps } from '../../theme/types';
import { useEffect } from 'react';
import { defaultImages } from '../../theme/images';
import { useThemeOptions } from '../../theme';


interface Props {
    open: boolean;
    onClose: () => void;
    onChangeSettings?: (settings: SettingsValueProps) => void
}

let initialSettings: SettingsValueProps | null = null
export default function SettingsDrawer({ open, onClose, onChangeSettings }: Props) {
    const theme = useTheme()
    useEffect(() => {
        if (!initialSettings) initialSettings = settings
    }, [])
    const { settings, onChangeColor, toggleContrast, toggleFullScreen, toggleReverseLayout, onChangeFont, onChangeLayout, onChangeMode, onResetSettings, onResizeFont } = useSettings()
    onChangeSettings = onChangeSettings || function () { }
    const { fonts, colorPresets } = useThemeOptions()
    const { reverseLayout, isContrast, isFullScreen, themeColorPresets, themeFont, themeFontSize, themeLayout, themeMode } = settings


    // console.log(colorPresets);

    const handelModeChange = () => {
        onChangeMode(themeMode === "light" ? "dark" : "light")
    }
    const handelFontChange = (fontName: string) => {
        onChangeFont(fontName)
    }

    const handelResizeFont = (value: number) => {
        onResizeFont(value)
    }

    const handelColorChange = (color: string) => {
        onChangeColor(color)
    }

    useEffect(() => {
        onChangeSettings(settings)
    }, [settings])


    return (
        <Drawer
            anchor={reverseLayout ? "left" : "right"}
            open={open}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    sx: { bgcolor: 'transparent', }
                },
            }}
            PaperProps={{
                sx: {
                    padding: 0,
                    scrollbarGutter: "auto",
                    paddingRight: 0,
                    overflowY: "hidden",
                    width: 360,
                    bgcolor: alpha(theme.palette.background.default, 0.9),
                    borderLeft: "1px thin",
                },
            }}
        >
            {/* --- HEADER --- */}
            <Stack direction={reverseLayout ? "row-reverse" : "row"} alignItems="center" justifyContent="space-between" sx={{ py: 2.4, pr: 1, pl: 2.4 }}>
                <Typography variant="h6">Settings</Typography>
                <Stack direction={reverseLayout ? "row-reverse" : "row"} spacing={0.5}>
                    <Badge badgeContent="" sx={{
                        "& .css-35907w-MuiBadge-badge": {
                            top: "5px",
                            right: "5px"
                        }
                    }} color='error' variant='dot'>
                        <IconButton size="small" onClick={() => {
                            onResetSettings(initialSettings || settings)
                        }} sx={{ fontSize: 20, color: 'text.secondary' }}>
                            <ResetIcon />
                        </IconButton>
                    </Badge>
                    <IconButton size="small" onClick={onClose} sx={{ fontSize: 20, color: 'text.secondary' }}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </Stack>
            <Box
                className="setting_scroll_box"
                sx={{
                    p: 2.5, pt: 0, overflowY: "auto",
                    scrollbarGutter: "stable",
                    paddingRight: "0.6rem",
                    marginRight: "2px",
                    '::-webkit-scrollbar-thumb': { backgroundColor: "transparent" },
                    "&:hover": {
                        "&::-webkit-scrollbar-thumb": { backgroundColor: alpha(theme.palette.grey[500], 0.39) }
                    },

                }}>

                <Stack direction={"row"} spacing={2} mb={2}>
                    <Button onClick={handelModeChange} variant='outlined' color='secondary' sx={{ fontSize: theme.typography.h4, py: 2.1, px: 2.3, flex: 1, alignItems: 'start', flexDirection: "column" }}>
                        <Stack mb={2.7} width={"100%"} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                            <NightModeIcon />
                            <AntSwitch color="secondary" checked={themeMode === "dark"} inputProps={{ 'aria-label': 'ant design' }} />
                        </Stack>
                        <Typography variant="caption" >Mode</Typography>
                    </Button>
                    <Button color='secondary' onClick={() => {
                        toggleContrast()

                    }} variant='outlined' sx={{ fontSize: theme.typography.h4, py: 2.1, px: 2.3, flex: 1, alignItems: 'start', flexDirection: "column" }}>
                        <Stack mb={2.7} width={"100%"} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                            <ContrastIcon />
                            <AntSwitch color='secondary' checked={isContrast ? true : false} inputProps={{ 'aria-label': 'ant design' }} />
                        </Stack>
                        <Typography variant="caption" >Contrast</Typography>
                    </Button>
                </Stack>
                <Stack direction={"row"} spacing={2} mb={4}>
                    <Button onClick={() => {
                        toggleReverseLayout()

                    }} color='secondary' variant='outlined' sx={{ fontSize: theme.typography.h4, py: 2.1, px: 2.3, flex: 1, alignItems: 'start', flexDirection: "column" }}>
                        <Stack mb={2.7} width={"100%"} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                            <RightToLeftIcon />
                            <AntSwitch checked={reverseLayout ? true : false} color='secondary' inputProps={{ 'aria-label': 'ant design' }} />
                        </Stack>
                        <Typography variant="caption" >Right to left</Typography>
                    </Button>
                    <Button onClick={() => {
                        toggleFullScreen()
                    }} color='secondary' variant='outlined' sx={{
                        fontSize: theme.typography.h4,
                        py: 2.1, px: 2.3, flex: 1, alignItems: 'start', flexDirection: "column"
                    }}>
                        <Stack mb={2.7} width={"100%"} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                            {!isFullScreen ? <FullScreenIcon /> : <WindowScreenIcon />}
                            <AntSwitch color='secondary' checked={isFullScreen} inputProps={{ 'aria-label': 'ant design' }} />
                        </Stack>
                        <Typography variant="caption" >{!isFullScreen ? "Full Screen" : "Windowed"}</Typography>
                    </Button>
                </Stack>

                <Paper sx={{
                    mb: 4,
                    boxShadow: "none",
                    padding: 2,
                    position: "relative",
                    top: 0,
                    left: 0,
                    border: "1px solid",
                    borderColor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    background: "transparent",
                }}  >
                    <Chip label="Nav" variant='filled' color='secondary' size='small' sx={{ width: "auto", flexDirection: "row-reverse", position: 'absolute', top: "-12px", left: "15px", fontSize: (theme) => theme.typography.caption, fontWeight: 600 }} icon={<Tooltip title="Dashboard only"><span style={{ marginLeft: 0, lineHeight: 0, marginRight: 2 }}>{<InfoIcon />}</span></Tooltip>} />
                    <Typography variant='subtitle2' mb={1} color='text.secondary' textTransform={"none"}>Layout</Typography>
                    <Stack direction={"row"} gap={0.6} justifyContent={"space-between"} width={"100%"}>
                        <Button disableRipple size='small' variant='outlined'
                            onClick={() => {
                                onChangeLayout("vertical")

                            }}
                            sx={{
                                p: 0,
                                borderWidth: "1px",
                                "& .MuiTypography-root": {
                                    lineHeight: "0px",
                                }
                            }}>
                            <Typography sx={{ fontSize: 86 }} color={themeLayout === "vertical" ? 'primary.main' : "text.secondary"}>
                                <Layout1Icon />
                            </Typography>
                        </Button>
                        <Button disableRipple size='small'
                            variant='outlined'
                            onClick={() => {
                                onChangeLayout("mini")

                            }}
                            sx={{
                                p: 0,
                                borderWidth: "1px",
                                "& .MuiTypography-root": {
                                    lineHeight: "0px",
                                }
                            }}>
                            <Typography sx={{ fontSize: 86 }} color={themeLayout === "mini" ? 'primary.main' : "text.secondary"}>
                                <Layout2Icon />
                            </Typography>
                        </Button>
                        <Button disableRipple
                            onClick={() => {
                                onChangeLayout("horizontal")

                            }}
                            size='small' variant='outlined' sx={{
                                p: 0,
                                borderWidth: "1px",
                                "& .MuiTypography-root": {
                                    lineHeight: "0px",
                                }
                            }}>
                            <Typography sx={{ fontSize: 86 }} color={themeLayout === "horizontal" ? 'primary.main' : "text.secondary"}>
                                <Layout3Icon />
                            </Typography>
                        </Button>

                    </Stack>
                </Paper>

                <Paper sx={{
                    boxShadow: "none",
                    mb: 4,
                    px: 2,
                    py: 4,
                    pb: 2,
                    position: "relative",
                    top: 0,
                    left: 0,
                    border: "1px solid",
                    borderColor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    background: "transparent",
                }}  >
                    <Chip label="Presets" variant='filled' color='secondary' size='small' sx={{ fontSize: (theme) => theme.typography.caption, fontWeight: 600, position: 'absolute', top: "-12px", left: "15px", }} />
                    <Grid container justifyContent={"center"} rowGap={2} gap={1.45}>
                        {colorPresets.map((x) => (
                            <Grid key={x.name}>
                                <Button onClick={() => handelColorChange(x.name)} disableRipple fullWidth sx={{
                                    px: 3.72,
                                    fontSize: 28,
                                    py: 2.25,
                                    background: x.name === themeColorPresets ? alpha(x.main, 0.08) : "none",
                                    overflow: "hidden",
                                    border: "none",
                                    color: x.main
                                }}>
                                    <ColorPresetsIcon />
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                <Paper sx={{
                    boxShadow: "none",
                    px: 2,
                    py: 2,
                    mb: 4,
                    position: "relative",
                    top: 0,
                    left: 0,
                    border: "1px solid",
                    borderColor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    background: "transparent",
                }}  >
                    <Chip label="Fonts" variant='filled' color='secondary' size='small' sx={{ fontSize: (theme) => theme.typography.caption, fontWeight: 600, position: 'absolute', top: "-12px", left: "15px", }} />
                    <Typography variant='subtitle2' mb={1} color='text.secondary' textTransform={"none"}> Font family</Typography>
                    <Grid container spacing={2} mb={2}>
                        {fonts.map((x) => (
                            <Grid size={6} key={x.name}>
                                <Button variant='outlined' color='secondary' onClick={() => handelFontChange(x.name)} sx={{ flexDirection: 'column', gap: 0.5, paddingY: 2 }} disableRipple={true} fullWidth={true}>
                                    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} gap={1}>
                                        <Typography sx={{ fontSize: 28 }} component={"span"} color={x.name === themeFont ? "primary.main" : "text.secondary"}>
                                            <FontsIcon />
                                        </Typography>
                                        <Typography variant='caption'>{x.name}</Typography>
                                    </Stack>
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant='subtitle2' textTransform={"none"} color='text.secondary'>Size</Typography>
                    <br />
                    <br />
                    <Box px={1} py={2}>
                        <CustomeSlider marks={[
                            { value: 12, label: "12px" },
                            { value: 13 },
                            { value: 14 },
                            { value: 15 },
                            { value: 16 },
                            { value: 17 },
                            { value: 18 },
                            { value: 19 },
                            { value: 20 },
                        ]} value={themeFontSize} min={12} max={20} onChange={(_: any, value: number) => handelResizeFont(value)} />
                    </Box>

                </Paper>





            </Box>
        </Drawer >
    );
}