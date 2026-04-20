import { createContext, ReactNode, useContext } from "react";
import { SettingsProvider } from "../context/settingContext";
import { ColorPresets, Fonts, SettingsValueProps } from "./types";
import CustomeThemeProvider from "./customeThemeProvider";
import { colorPresets as C, fonts as F } from "./themeUtils";


interface Props {
    children: ReactNode;
    settings: SettingsValueProps;
    fonts: Fonts[],
    colorPresets: ColorPresets[];
}


const ThemeContext = createContext({
    fonts: F,
    colorPresets: C,
})


export default function ThemeProvider({ settings, children, fonts, colorPresets }: Props) {
    fonts = fonts ? [...F, ...fonts] : F
    colorPresets = colorPresets ? [...C, ...colorPresets] : C
    return <SettingsProvider defaultSettings={settings}>
        <CustomeThemeProvider>
            <ThemeContext.Provider value={{ fonts: fonts, colorPresets: colorPresets }}>
                {children}
            </ThemeContext.Provider>
        </CustomeThemeProvider>
    </SettingsProvider>
}

export const useThemeOptions = () => useContext(ThemeContext)