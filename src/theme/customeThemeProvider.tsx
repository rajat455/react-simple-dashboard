import React from "react";
import { createTheme, ThemeProvider, StyledEngineProvider, alpha, CssBaseline, Palette, Shape, Theme, colors } from "@mui/material";
import { getTypography, getPalette, getCustomShadows } from "./themeUtils";
import { useSettings } from "../context/settingContext";
import { ColorPresets, ThemeMode } from "./types";
import { defaultImages } from "./images";
import { useThemeOptions } from ".";

interface Props {
    children: React.ReactNode;
};


declare module '@mui/material' {
    interface Theme {
        shadows: string[] & {
            primary: string;
            secondary: string;
            error: string;
            success: string;
            info: string;
            warning: string;
            dailog: string;
            card: string;
            dropDown: string;
        },
        palette: Palette[] & {
            mode: ThemeMode;
            primary: ColorPresets;
            secondary: ColorPresets;
            info: ColorPresets;
            error: ColorPresets;
            success: ColorPresets;
            warning: ColorPresets;
            background: { neutral: string, default: string, paper: string };
            common: { commonWhite: string, commonBlack: string };
            action: { active: string, hover: string, selected: string, disabledBackground: string, disable: string, focus: string }
            text: { primary: string, secondary: string, disabled: string };
            grey: any;
            divider: any;
        },
        shape: Shape;
        spcing: number;
    }
}

export default function CustomeThemeProvider({ children }: Props) {
    const { settings } = useSettings()
    const { fonts, colorPresets } = useThemeOptions()
    const { themeMode, themeColorPresets, themeFontSize, themeFont, isContrast } = settings;
    let fontFamily = fonts.find((x) => x.name === themeFont) || fonts[0]
    const palette = getPalette(colorPresets, themeMode, themeColorPresets, isContrast);
    const customShadows: any = getCustomShadows(palette);
    const baseTheme: any = React.useMemo(() => {

        const theme: Theme = createTheme({
            palette: palette,
            typography: getTypography(fontFamily.main, themeFontSize),
            shape: { borderRadius: 8 },
            shadows: customShadows as any,
            spacing: 8,
        });

        theme.components = {
            MuiCssBaseline: {
                styleOverrides: {
                    '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
                    "html,body": {
                        WebkitOverflowScrolling: 'touch'
                    },
                    '::-webkit-scrollbar': {
                        width: "6px !important",
                        height: "6px !important",
                        display: "block !important"
                    },
                    '::-webkit-scrollbar-track': { backgroundColor: 'transparent !important', background: 'transparent !important' },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: alpha(theme.palette.grey[500], 0.39),
                        borderRadius: "10px",
                    },
                },
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        backgroundColor: alpha(theme.palette.grey[900], 0.8),
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        '&.MuiBackdrop-invisible': {
                            background: 'transparent',
                            backdropFilter: 'none',
                        },
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        boxShadow: customShadows.dialog,
                        borderRadius: (theme.shape.borderRadius as any) * 2,
                        backgroundColor: "transparent",
                        borderColor: theme.palette.divider,
                        backgroundImage: `url(${defaultImages.backgrounds.deemBg1}),url(${defaultImages.backgrounds.deemBg2})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "50%, 50%",
                        backgroundPositionX: "left, right",
                        backgroundPositionY: "bottom, top",
                        bgcolor: alpha(theme.palette.background.default, 0.9),
                        backdropFilter: 'blur(20px)',

                    }
                }
            },
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        boxShadow: customShadows.dropdown,
                        borderRadius: (theme.shape.borderRadius as any) * 1.5,
                        backgroundColor: "transparent",
                        borderColor: theme.palette.divider,
                        backgroundImage: `url(${defaultImages.backgrounds.deemBg1}),url(${defaultImages.backgrounds.deemBg2})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "50%, 50%",
                        backgroundPositionX: "left, right",
                        backgroundPositionY: "bottom, top",
                        bgcolor: alpha(theme.palette.background.default, 0.9),
                        backdropFilter: 'blur(20px)',
                    }
                }
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        boxShadow: theme.shadows[8],
                        backgroundColor: "transparent",
                        borderColor: theme.palette.divider,
                        backgroundImage: `url(${defaultImages.backgrounds.deemBg1}),url(${defaultImages.backgrounds.deemBg2})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "50%, 50%",
                        backgroundPositionX: "left, right",
                        backgroundPositionY: "bottom, top",
                        bgcolor: alpha(theme.palette.background.default, 0.9),
                        backdropFilter: 'blur(20px)',
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        position: "sticky",
                        top: 0,
                        left: "auto",
                        display: "block",
                        background: alpha(theme.palette.background.default, 0.1),
                        boxShadow: "none",
                        transition: theme.transitions.create(["boxShadow"], {
                            duration: theme.transitions.duration.standard
                        }),
                        width: "100%",
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: `${(theme.shape.borderRadius as any) * 2}` + "px",
                        fontWeight: 700,
                        textTransform: 'capitalize',
                    },
                    outlined: {
                        border: `1px solid ${theme.palette.divider}`,
                    },
                    contained: {
                        border: `1px solid ${theme.palette.divider}`,
                    },

                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: customShadows.card,
                        borderRadius: (theme.shape.borderRadius as any) * 2,
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: customShadows.card
                    },
                }
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        color: theme.palette.text.primary
                    }
                }
            },
            MuiCardHeader: {
                styleOverrides: {
                    title: {
                        ...theme.typography.h6,
                    },
                    subheader: {
                        ...theme.typography.body2,
                        fontWeight: 500,
                    }
                }
            },
        };
        return theme;
    }, [themeMode, themeColorPresets, themeFont, themeFontSize, isContrast]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={baseTheme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}