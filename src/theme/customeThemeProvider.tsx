import React from "react";
import { createTheme, ThemeProvider, StyledEngineProvider, alpha, CssBaseline } from "@mui/material";
import { getTypography, getPalette, getCustomShadows, fonts as F, colorPresets as C } from "./themeUtils";
import { useSettings } from "../context/settingContext";
import { ThemeOptions } from "./types";

interface Props {
    children: React.ReactNode;
    themeOptions: ThemeOptions;
};

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
            palette,
            typography: getTypography(fontFamily.main, themeFontSize),
            shape: { borderRadius: 8 },
            shadows: customShadows,
            spacing: 8,
        });

        theme.components = {
            MuiCssBaseline: {
                styleOverrides: {
                    '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
                    html: { WebkitOverflowScrolling: 'touch' },
                    '::-webkit-scrollbar': {
                        scrollWidth: "none",
                    },
                    '::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
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

    // baseTheme.components = {
    //     MuiCssBaseline: {
    //         styleOverrides: {
    //             '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
    //             "body": {
    //                 width: '100%',
    //                 height: '100%',
    //                 backgroundColor: baseTheme.palette.background.default, // આનાથી સફેદ બેકગ્રાઉન્ડ ફિક્સ થશે
    //                 color: baseTheme.palette.text.primary,
    //                 fontFamily: baseTheme.typography.fontFamily,
    //                 fontSize: baseTheme.typography.fontSize,
    //                 lineHeight: baseTheme.typography.lineHeight,
    //                 margin: 0,
    //                 padding: 0
    //             },
    //             html: { WebkitOverflowScrolling: 'touch' },
    //             '::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
    //             '::-webkit-scrollbar-thumb': {
    //                 backgroundColor: alpha(baseTheme.palette.grey[500], 0.39),
    //                 borderRadius: 10,
    //             },
    //         },
    //     },
    //     MuiDrawer: {
    //         styleOverrides: {
    //             paper: {
    //                 borderColor: baseTheme.palette.divider
    //             }
    //         }
    //     },
    //     MuiAppBar: {
    //         styleOverrides: {
    //             root: {
    //                 position: "sticky",
    //                 top: 0,
    //                 left: "auto",
    //                 display: "block",
    //                 background: alpha(baseTheme.palette.background.default, 0.1),
    //                 boxShadow: "none",
    //                 transition: baseTheme.transitions.create(["boxShadow"], {
    //                     duration: baseTheme.transitions.duration.standard
    //                 }),
    //                 width: "100%",
    //             }
    //         }
    //     },
    //     MuiButton: {
    //         styleOverrides: {
    //             root: {
    //                 borderRadius: (baseTheme.shape.borderRadius) * 2,
    //                 fontWeight: 700,
    //                 textTransform: 'capitalize',
    //             },
    //             outlined: {
    //                 border: `1px solid ${baseTheme.palette.divider}`,
    //             }
    //         }
    //     },
    //     MuiCard: {
    //         styleOverrides: {
    //             root: {
    //                 boxShadow: customShadows.card,
    //                 borderRadius: (baseTheme.shape.borderRadius as any) * 2,
    //             }
    //         }
    //     },
    //     MuiPaper: {
    //         styleOverrides: {
    //             root: {
    //                 boxShadow: customShadows.card
    //             },
    //         }
    //     },
    //     MuiTypography: {
    //         styleOverrides: {
    //             root: {
    //                 color: baseTheme.palette.text.primary
    //             }
    //         }
    //     },
    //     MuiCardHeader: {
    //         styleOverrides: {
    //             title: {
    //                 ...baseTheme.typography.h6,
    //             },
    //             subheader: {
    //                 ...baseTheme.typography.body2,
    //                 fontWeight: 500,
    //             }
    //         }
    //     }
    // };
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={baseTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}