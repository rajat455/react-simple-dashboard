import { Drawer, Stack, Typography, Box, alpha, Button, Chip, Tooltip, Paper, Grid, IconButton, Badge } from '@mui/material';
import AntSwitch from '../../components/antSwitch';
import CustomeSlider from '../../components/customeSlider';
import { useSettings } from '../../context/settingContext';
import { colorPresets as C, fonts as F } from '../../theme/themeUtils';
import { Icons } from '../../theme/icons';
import { SettingsValueProps, ThemeOptions } from '../../theme/types';
import { useEffect } from 'react';


interface Props {
    open: boolean;
    onClose: () => void;
    themeOptions: ThemeOptions;
    onChangeSettings?: (settings: SettingsValueProps) => void
}

let initialSettings: SettingsValueProps | null = null
export default function SettingsDrawer({ open, onClose, onChangeSettings, themeOptions }: Props) {
    useEffect(() => {
        if (!initialSettings) initialSettings = settings
    }, [])
    const { settings, onChangeColor, toggleContrast, toggleFullScreen, toggleReverseLayout, onChangeFont, onChangeLayout, onChangeMode, onResetSettings, onResizeFont } = useSettings()
    onChangeSettings = onChangeSettings || function () { }

    const fonts = themeOptions?.fonts || F
    const colorPresets = themeOptions?.colorPresets || C
    const { reverseLayout, isContrast, isFullScreen, themeColorPresets, themeFont, themeFontSize, themeLayout, themeMode } = settings



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



    const bgEffect1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzNykiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzNyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K"
    const bgEffect2 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCkiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="

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
                    backgroundImage: `url(${bgEffect1}),url(${bgEffect2})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "50%, 50%",
                    padding: 0,
                    scrollbarGutter: "auto",
                    backgroundColor: "transparent",
                    paddingRight: 0,
                    overflowY: "hidden",
                    backgroundPositionX: "left, right",
                    backgroundPositionY: "bottom, top",
                    width: 360,
                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.9),
                    backdropFilter: 'blur(20px)',
                    boxShadow: (theme) => theme.shadows[8],
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
                        }} sx={{ color: 'text.secondary' }}>
                            {Icons.reset}
                        </IconButton>
                    </Badge>
                    <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
                        {Icons.close}
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
                    '::-webkit-scrollbar': { width: 8, display: open ? "block" : "none" },
                    "&::-webkit-scrollbar-thumb": { backgroundColor: "transparent" },
                    "&:hover": {
                        "&::-webkit-scrollbar-thumb": { backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.39) }
                    },

                }}>

                <Stack direction={"row"} spacing={2} mb={2}>
                    <Button onClick={handelModeChange} variant='outlined' color='secondary' sx={{ py: 2.1, px: 2.3, flex: 1, alignItems: 'start', flexDirection: "column" }}>
                        <Stack mb={2.7} width={"100%"} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                            {Icons.nightMode}
                            <AntSwitch color="secondary" checked={themeMode === "dark"} inputProps={{ 'aria-label': 'ant design' }} />
                        </Stack>
                        <Typography variant="caption" >Mode</Typography>
                    </Button>
                    <Button color='secondary' onClick={() => {
                        toggleContrast()

                    }} variant='outlined' sx={{ py: 2.1, px: 2.3, flex: 1, alignItems: 'start', flexDirection: "column" }}>
                        <Stack mb={2.7} width={"100%"} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                            {Icons.contrast}
                            <AntSwitch color='secondary' checked={isContrast ? true : false} inputProps={{ 'aria-label': 'ant design' }} />
                        </Stack>
                        <Typography variant="caption" >Contrast</Typography>
                    </Button>
                </Stack>
                <Stack direction={"row"} spacing={2} mb={4}>
                    <Button onClick={() => {
                        toggleReverseLayout()

                    }} color='secondary' variant='outlined' sx={{ py: 2.1, px: 2.3, flex: 1, alignItems: 'start', flexDirection: "column" }}>
                        <Stack mb={2.7} width={"100%"} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                            {Icons.rightToLeft}
                            <AntSwitch checked={reverseLayout ? true : false} color='secondary' inputProps={{ 'aria-label': 'ant design' }} />
                        </Stack>
                        <Typography variant="caption" >Right to left</Typography>
                    </Button>
                    <Button onClick={() => {
                        toggleFullScreen()
                    }} color='secondary' variant='outlined' sx={{
                        py: 2.1, px: 2.3, flex: 1, alignItems: 'start', flexDirection: "column"
                    }}>
                        <Stack mb={2.7} width={"100%"} alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                            {!isFullScreen ? Icons.fullScreen : Icons.windowScreen}
                            <AntSwitch color='secondary' checked={isFullScreen} inputProps={{ 'aria-label': 'ant design' }} />
                        </Stack>
                        <Typography variant="caption" >{!isFullScreen ? "Full Screen" : "Windowed"}</Typography>
                    </Button>
                </Stack>



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
                                        <Typography component={"span"} color={x.name === themeFont ? "primary.main" : "text.secondary"}>
                                            {Icons.fonts}
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
                    <Chip label="Nav" variant='filled' color='secondary' size='small' sx={{ width: "auto", flexDirection: "row-reverse", position: 'absolute', top: "-12px", left: "15px", fontSize: (theme) => theme.typography.caption, fontWeight: 600 }} icon={<Tooltip title="Dashboard only"><span style={{ marginLeft: 0, lineHeight: 0, marginRight: 2 }}>{Icons.info}</span></Tooltip>} />
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
                            <Typography color={themeLayout === "vertical" ? 'primary.main' : "text.secondary"}>
                                {Icons.layout1}
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
                            <Typography color={themeLayout === "mini" ? 'primary.main' : "text.secondary"}>
                                {Icons.layout2}
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
                            <Typography color={themeLayout === "horizontal" ? 'primary.main' : "text.secondary"}>
                                {Icons.layout3}
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
                                    py: 2.25,
                                    background: x.name === themeColorPresets ? alpha(x.main, 0.08) : "none",
                                    overflow: "hidden",
                                    border: "none",
                                    color: x.main
                                }}>
                                    {Icons.colorPresets}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

            </Box>
        </Drawer >
    );
}