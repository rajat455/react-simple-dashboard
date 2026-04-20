import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { SettingsValueProps, ThemeLayout, ThemeMode } from "../theme/types";


const initialState: SettingsValueProps = {
    themeMode: "light",
    themeColorPresets: "default",
    themeFont: "Public Sans",
    themeFontSize: 17,
    themeLayout: "vertical",
    isContrast: false,
    reverseLayout: false,
    isFullScreen: document.fullscreenElement ? true : false,
}

const SettingsContext = createContext({
    settings: initialState,
    onChangeMode: (_mode: ThemeMode) => { },
    onChangeColor: (_color: string) => { },
    onChangeLayout: (_layout: ThemeLayout) => { },
    onResizeFont: (_fontSize: number) => { },
    onChangeFont: (_fontName: string) => { },
    onResetSettings: (_oldSettings?: SettingsValueProps) => { },
    toggleContrast: () => { },
    toggleReverseLayout: () => { },
    toggleFullScreen: () => { },
})


export const SettingsProvider = ({ children, defaultSettings }: { children: ReactNode, defaultSettings: SettingsValueProps }) => {
    const [settings, setSettings] = useState({ ...initialState, ...defaultSettings })

    const onChangeMode = useCallback((mode: ThemeMode) => {
        setSettings((prev) => ({ ...prev, themeMode: mode }))
    }, [])
    const onChangeColor = useCallback((color: any) => {
        setSettings((prev) => ({ ...prev, themeColorPresets: color }))
    }, [])
    const onResizeFont = useCallback((fontSize: number) => {
        setSettings((prev) => ({ ...prev, themeFontSize: fontSize }))
    }, [])
    const onChangeFont = useCallback((fontName: string) => {
        setSettings((prev) => ({ ...prev, themeFont: fontName }))
    }, [])
    const onChangeLayout = useCallback((layout: ThemeLayout) => {
        setSettings((prev) => ({ ...prev, themeLayout: layout }))
    }, [])
    const toggleContrast = useCallback(() => {
        setSettings((prev) => ({ ...prev, isContrast: !prev.isContrast }))
    }, [])
    const toggleReverseLayout = useCallback(() => {
        setSettings((prev) => ({ ...prev, reverseLayout: !prev.reverseLayout }))
    }, [])
    const toggleFullScreen = useCallback(async () => {
        try {
            if (!settings.isFullScreen) {
                await document.documentElement.requestFullscreen()
            } else {
                await document.exitFullscreen()
            }
            setSettings((prev) => ({ ...prev, isFullScreen: document.fullscreenElement ? true : false }))

        } catch (error: any) {
            console.error(error?.message)
        }
    }, [settings])
    const onResetSettings = useCallback(async (oldSettings?: SettingsValueProps) => {
        if (settings.isFullScreen) await toggleFullScreen()

        setSettings({ ...initialState, ...defaultSettings, ...oldSettings })
    }, [settings])

   

    return <SettingsContext.Provider value={{ settings, toggleFullScreen, toggleReverseLayout, toggleContrast, onChangeFont, onChangeLayout, onResizeFont, onChangeMode, onChangeColor, onResetSettings }} >
        {children}
    </SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)