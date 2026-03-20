import { ReactNode } from "react";
import { SettingsProvider } from "../context/settingContext";
import { SettingsValueProps, ThemeOptions } from "./types";
import CustomeThemeProvider from "./customeThemeProvider";




interface Props {
    children: ReactNode;
    settings: SettingsValueProps;
    themeOptions:ThemeOptions;
}

export default function ThemeProvider({ settings, children, themeOptions}: Props) {
    return <SettingsProvider defaultSettings={settings}>
        <CustomeThemeProvider themeOptions={themeOptions}>
            {children}
        </CustomeThemeProvider>
    </SettingsProvider>
}