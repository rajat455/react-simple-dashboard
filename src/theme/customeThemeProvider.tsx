import React from "react";
import { createTheme, ThemeProvider, StyledEngineProvider, alpha, CssBaseline, Palette, Shape } from "@mui/material";
import { getTypography, getPalette, getCustomShadows, fonts as F, colorPresets as C, ColorPresets } from "./themeUtils";
import { useSettings } from "../context/settingContext";
import { ThemeMode, ThemeOptions } from "./types";
import "@mui/material/styles";

interface Props {
    children: React.ReactNode;
    themeOptions: ThemeOptions;
};


declare module '@mui/material/styles' {
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
            mode: ThemeMode,
            primary: ColorPresets
            grey: any,
            common: any,
            background: any,
            divider: any,

        },
        shape: Shape
    }
}

let isLoad=false

export default function CustomeThemeProvider({ children, themeOptions }: Props) {
    const { settings } = useSettings()
    const fonts = themeOptions?.fonts || F
    const colorPresets = themeOptions?.colorPresets || C
    const { themeMode, themeColorPresets, themeFontSize, themeFont, isContrast } = settings;
    let fontFamily = fonts.find((x) => x.name === themeFont) || fonts[0]
    const palette = getPalette(colorPresets, themeMode, themeColorPresets, isContrast);
    const customShadows: any = getCustomShadows(palette);
    const baseTheme: any = React.useMemo(() => {

        const theme: any = createTheme({
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
                    // html: { WebkitOverflowScrolling: 'touch', },
                    '::-webkit-scrollbar': {
                        scrollWidth: "8px",
                    },
                    '::-webkit-scrollbar-track': { backgroundColor: 'transparent !important', background: 'transparent !important' },
                    // '&& html::-webkit-scrollbar-track': { backgroundColor: 'transparent !important', background: 'transparent !important' },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: alpha(theme.palette.grey[500], 0.39),
                        innerWidth: 10,
                        borderRadius: 10,
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderColor: theme.palette.divider
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
                        borderRadius: (theme.shape.borderRadius) * 2,
                        fontWeight: 700,
                        textTransform: 'capitalize',
                    },
                    outlined: {
                        border: `1px solid ${theme.palette.divider}`,
                    }
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