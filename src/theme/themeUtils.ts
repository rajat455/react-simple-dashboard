import { alpha } from "@mui/material";
import { ColorPreset, ThemeMode } from "./types";


// PRESETS SECTION 
export const paletteGray = {
    50: "#FCFDFD",
    100: "#F9FAFB",
    200: "#F4F6F8",
    300: "#DFE3E8",
    400: "#C4CDD5",
    500: "#919EAB",
    600: "#637381",
    700: "#454F5B",
    800: "#1C252E",
    900: "#141A21",
    A100: "#f5f5f5",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161",
}
export const commonWhite = "#FFFFFF"
export const commonBlack = "#000000"


export interface ColorPresets {
    main: string;
    name: ColorPreset;
    light: string;
    dark: string;
    lighter: string;
    contrastText: string;
    darker: string;
}

export const colorPresets :ColorPresets[]= [
    { name: 'default', main: '#00A76F', light: "#5BE49B", dark: "#007867", lighter: "#C8FAD6", contrastText: "#FFFFFF", darker: "#004B50" },
    { name: 'cyan', main: '#078DEE', light: "#68CDF9", dark: "#0351AB", lighter: "#CCF4FE", darker: "#012972", contrastText: "#FFFFFF" },
    { name: 'purple', main: '#7635dc', dark: "#431A9E", light: "#B985F4", lighter: "#EBD6FD", darker: "#200A69", contrastText: "#FFFFFF" },
    { name: 'blue', main: '#0C68E9', light: "#6BB1F8", dark: "#063BA7", lighter: "#CDE9FD", darker: "#021D6F", contrastText: "#FFFFFF" },
    { name: 'yellow', main: '#fda92d', light: "#FED680", dark: "#B66816", lighter: "#FEF4D4", darker: "#793908", contrastText: paletteGray[800] },
    { name: 'red', main: '#FF3030', light: "#FFC1AC", dark: "#B71833", lighter: "#FFE3D5", darker: "#7A0930", contrastText: "#FFFFFF" },
]
export const getPalette = (colorPresets:ColorPresets[], themeMode: ThemeMode, themeColorPresets: ColorPreset, isContrast: boolean) => {
    const primaryColor = colorPresets.find((c) => c.name === themeColorPresets) || colorPresets[0];
    return {
        mode: themeMode,
        primary: {
            ...primaryColor,
        },
        grey: { ...paletteGray },
        secondary: {
            main: themeMode === "light" ? paletteGray[800] : commonWhite,
            contrastText: themeMode === "light" ? commonWhite : paletteGray[800]
        },
        info: {
            lighter: "#CAFDF5",
            light: "#61F3F3",
            main: "#00B8D9",
            dark: "#006C9C",
            darker: "#003768",
            contrastText: "#FFFFFF"
        },
        success: {
            lighter: "#D3FCD2",
            light: "#77ED8B",
            main: "#22C55E",
            dark: "#118D57",
            darker: "#065E49",
            contrastText: "#FFFFFF"
        },
        error: {
            lighter: "#FFE9D5",
            light: "#FFAC82",
            main: "#FF5630",
            dark: "#B71D18",
            darker: "#7A0916",
            contrastText: "#FFFFFF"
        },
        warning: {
            lighter: "#FFF5CC",
            light: "#FFD666",
            main: "#FFAB00",
            dark: "#B76E00",
            darker: "#7A4100",
            contrastText: paletteGray[800]
        },
        background: {
            default: themeMode === "light" ? ((!isContrast) ? commonWhite : paletteGray[200]) : paletteGray[900],
            paper: themeMode === 'light' ? commonWhite : paletteGray[800],
            neutral: themeMode === "light" ? paletteGray[200] : "#28323D"
        },
        divider: alpha(paletteGray[500], 0.12),
        common: {
            black: commonBlack,
            white: commonWhite
        },

        action: {
            active: paletteGray[500],
            hover: alpha(paletteGray[500], 0.16),
            selected: alpha(paletteGray[500], 0.16),
            focus: alpha(paletteGray[600], 0.24),
            disabledBackground: alpha(paletteGray[600], 0.24),
            disabled: alpha(paletteGray[600], 0.8),
        },
        text: {
            primary: themeMode === 'light' ? paletteGray[800] : commonWhite,
            secondary: themeMode === "light" ? paletteGray[600] : paletteGray[500],
            disabled: themeMode === "light" ? paletteGray[500] : paletteGray[600]
        }
    }
}

// TEXT SECATION
export function pxToRem(value: number) {
    return `${value / 16}rem`;
}
export const getTypography = (themeFont: any, themeFontSize: number) => {
    const scale = themeFontSize / 16;

    return {
        fontFamily: themeFont,
        fontSize: themeFontSize,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        h1: {
            fontWeight: 800,
            lineHeight: 1.2,
            fontSize: pxToRem(64 * scale)
        },
        h2: {
            fontWeight: 800,
            lineHeight: 1.2,
            fontSize: pxToRem(48 * scale)
        },
        h3: {
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: pxToRem(32 * scale)
        },
        h4: {
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: pxToRem(24 * scale)
        },
        h5: {
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: pxToRem(19 * scale)
        },
        h6: {
            fontWeight: 600,
            lineHeight: 1.5,
            fontSize: pxToRem(18 * scale),
        },
        subtitle1: {
            fontSize: pxToRem(14 * scale),
            fontWeight: 600,
            lineHeight: 1.5
        },
        subtitle2: {
            fontSize: pxToRem(11 * scale),
            fontWeight: 700,
            textTransform: "uppercase",
        },
        body1: {
            fontSize: pxToRem(16 * scale),
            lineHeight: 1.5
        },
        body2: {
            fontSize: pxToRem(14 * scale),
            lineHeight: 1.5,
            fontWeight: 400,
        },
        caption: {
            fontWeight: 600,
            lineHeight: 1.5,
            fontSize: pxToRem(13 * scale)
        },
        button: {
            fontWeight: 700,
            fontSize: pxToRem(14 * scale),
            textTransform: 'capitalize',
        },

    };
}

//SHADOW SECTION
export const getCustomShadows = (palette: any) => {
    const color = palette.mode === "light" ? palette.grey[500] : palette.common.black
    const shadows = {
        0: "none",
        1: `0px 2px 1px - 1px ${alpha(color, 0.20)}, 0px 1px 1px 0px ${alpha(color, 0.14)}, 0px 1px 3px 0px ${alpha(color, 0.12)}`,
        2: `0px 3px 1px - 2px ${alpha(color, 0.20)}, 0px 2px 2px 0px ${alpha(color, 0.14)}, 0px 1px 5px 0px ${alpha(color, 0.12)}`,
        3: `0px 3px 3px - 2px ${alpha(color, 0.20)}, 0px 3px 4px 0px ${alpha(color, 0.14)}, 0px 1px 8px 0px ${alpha(color, 0.12)}`,
        4: `0px 2px 4px - 1px ${alpha(color, 0.20)}, 0px 4px 5px 0px ${alpha(color, 0.14)}, 0px 1px 10px 0px ${alpha(color, 0.12)}`,
        5: `0px 3px 5px - 1px ${alpha(color, 0.20)}, 0px 5px 8px 0px ${alpha(color, 0.14)}, 0px 1px 14px 0px ${alpha(color, 0.12)}`,
        6: `0px 3px 5px - 1px ${alpha(color, 0.20)}, 0px 6px 10px 0px ${alpha(color, 0.14)}, 0px 1px 18px 0px ${alpha(color, 0.12)}`,
        7: `0px 4px 5px - 2px ${alpha(color, 0.20)}, 0px 7px 10px 1px ${alpha(color, 0.14)}, 0px 2px 16px 1px ${alpha(color, 0.12)}`,
        8: `0px 5px 5px - 3px ${alpha(color, 0.20)}, 0px 8px 10px 1px ${alpha(color, 0.14)}, 0px 3px 14px 2px ${alpha(color, 0.12)}`,
        9: `0px 5px 6px - 3px ${alpha(color, 0.20)}, 0px 9px 12px 1px ${alpha(color, 0.14)}, 0px 3px 16px 2px ${alpha(color, 0.12)}`,
        10: `0px 6px 6px - 3px ${alpha(color, 0.20)}, 0px 10px 14px 1px ${alpha(color, 0.14)}, 0px 4px 18px 3px ${alpha(color, 0.12)}`,
        11: `0px 6px 7px - 4px ${alpha(color, 0.20)}, 0px 11px 15px 1px ${alpha(color, 0.14)}, 0px 4px 20px 3px ${alpha(color, 0.12)}`,
        12: `0px 7px 8px - 4px ${alpha(color, 0.20)}, 0px 12px 17px 2px ${alpha(color, 0.14)}, 0px 5px 22px 4px ${alpha(color, 0.12)}`,
        13: `0px 7px 8px - 4px ${alpha(color, 0.20)}, 0px 13px 19px 2px ${alpha(color, 0.14)}, 0px 5px 24px 4px ${alpha(color, 0.12)}`,
        14: `0px 7px 9px - 4px ${alpha(color, 0.20)}, 0px 14px 21px 2px ${alpha(color, 0.14)}, 0px 5px 26px 4px ${alpha(color, 0.12)}`,
        15: `0px 8px 9px - 5px ${alpha(color, 0.20)}, 0px 15px 22px 2px ${alpha(color, 0.14)}, 0px 6px 28px 5px ${alpha(color, 0.12)}`,
        16: `0px 8px 10px - 5px ${alpha(color, 0.20)}, 0px 16px 24px 2px ${alpha(color, 0.14)}, 0px 6px 30px 5px ${alpha(color, 0.12)}`,
        17: `0px 8px 11px - 5px ${alpha(color, 0.20)}, 0px 17px 26px 2px ${alpha(color, 0.14)}, 0px 6px 32px 5px ${alpha(color, 0.12)}`,
        18: `0px 9px 11px - 5px ${alpha(color, 0.20)}, 0px 18px 28px 2px ${alpha(color, 0.14)}, 0px 7px 34px 6px ${alpha(color, 0.12)}`,
        19: `0px 9px 12px - 6px ${alpha(color, 0.20)}, 0px 19px 29px 2px ${alpha(color, 0.14)}, 0px 7px 36px 6px ${alpha(color, 0.12)}`,
        20: `0px 10px 13px - 6px ${alpha(color, 0.20)}, 0px 20px 31px 3px ${alpha(color, 0.14)}, 0px 8px 38px 7px ${alpha(color, 0.12)}`,
        21: `0px 10px 13px - 6px ${alpha(color, 0.20)}, 0px 21px 33px 3px ${alpha(color, 0.14)}, 0px 8px 40px 7px ${alpha(color, 0.12)}`,
        22: `0px 10px 14px - 6px ${alpha(color, 0.20)}, 0px 22px 35px 3px ${alpha(color, 0.14)}, 0px 8px 42px 7px ${alpha(color, 0.12)}`,
        23: `0px 11px 14px - 7px ${alpha(color, 0.20)}, 0px 23px 36px 3px ${alpha(color, 0.14)}, 0px 9px 44px 8px ${alpha(color, 0.12)}`,
        24: `0px 11px 15px - 7px ${alpha(color, 0.20)}, 0px 24px 38px 3px ${alpha(color, 0.14)}, 0px 9px 46px 8px ${alpha(color, 0.12)}`,
        z1: `0 1px 2px 0 ${alpha(color, 0.16)}`,
        z4: `0 4px 8px 0 ${alpha(color, 0.16)}`,
        z8: `0 8px 16px 0 ${alpha(color, 0.16)}`,
        z12: `0 12px 24px -4px ${alpha(color, 0.16)}`,
        z16: ` 16px 32px -4px ${alpha(color, 0.16)}`,
        z20: `0 20px 40px -4px ${alpha(color, 0.16)}`,
        z24: `0 24px 48px 0 ${alpha(color, 0.16)}`,
        dialog: `-40px 40px 80px -8px rgba(0 0 0 / 24%)`,
        card: `0 0 2px 0 ${alpha(color, 0.20)}, 0 12px 24px -4px ${alpha(color, 0.12)}`,
        dropDown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(color, 0.24)}`,
    }
    return {
        ...shadows,
        primary: `0 8px 16px 0 ${alpha(palette.primary.main, 0.24)}`,
        secondary: `0 8px 16px 0 ${alpha(palette.secondary.main, 0.24)}`,
        error: `0 8px 16px 0 ${alpha(palette.error.main, 0.24)}`,
        success: `0 8px 16px 0 ${alpha(palette.success.main, 0.24)}`,
        info: `0 8px 16px 0 ${alpha(palette.info.main, 0.24)}`,
        warning: `0 8px 16px 0 ${alpha(palette.warning.main, 0.24)}`,
    };
}

//FONT SECTION
export interface Fonts {
    name: string;
    main: string;
}

export const fonts: Fonts[] = [
    { name: 'Public Sans', main: 'Public Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' },
    { name: 'Inter Variable', main: '"Inter", sans-serif' },
    { name: 'DM Sans', main: '"DM Sans", sans-serif' },
    { name: 'Nunito Sans', main: '"Nunito Sans", sans-serif' },
]
