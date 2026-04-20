export type ThemeMode = "light" | "dark"
export type ColorPreset = 'default' | "cyan" | "purple" | "blue" | "yellow" | "red"
export type color = "primary" | "warning" | "info" | "success" | "secondary" | "error"
export type ThemeLayout = 'vertical' | 'mini' | 'horizontal'
export type ButtonAction = React.MouseEvent<HTMLButtonElement>

export interface ColorPresets {
  main: string;
  name: ColorPreset;
  light: string;
  dark: string;
  lighter: string;
  contrastText: string;
  darker: string;
}
export interface Fonts {
  name: string;
  main: string;
}

export interface SettingsValueProps {
  themeMode: ThemeMode;
  themeColorPresets: ColorPreset;
  themeFont: string;
  themeFontSize: number;
  themeLayout: ThemeLayout;
  isContrast: boolean;
  isFullScreen: boolean;
  reverseLayout: boolean;
}


export interface NavigationList {
  href: string;
  heading: string;
  selected?: boolean;
  icon?: any;
}