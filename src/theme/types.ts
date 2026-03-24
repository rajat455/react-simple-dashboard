import { ReactNode } from "react";
import { ColorPresets, Fonts } from "./themeUtils";

export type ThemeMode = "light" | "dark"
export type ColorPreset = 'default' | "cyan" | "purple" | "blue" | "yellow" | "red"
export type color = "primary" | "warning" | "info" | "success" | "secondary" | "error"
export type ThemeLayout = 'vertical' | 'mini' | 'horizontal'

export interface SettingsValueProps {
  themeMode: ThemeMode;
  themeColorPresets: ColorPreset;
  themeFont: string;
  themeFontSize: number;
  themeLayout: ThemeLayout;
  isContrast: boolean;
  isFullScreen: boolean;
  reverseLayout: boolean;
  state?: any;
}

export interface NavigationList {
  href: string;
  heading: string;
  selected?: boolean;
  icon?: any;
}


export interface ThemeOptions {
  fonts: Fonts[],
  colorPresets: ColorPresets[]
  renderLogo?: (theme: any, settings: SettingsValueProps) => ReactNode;
  renderNavItem?: (navItem: any, theme: any, settings: SettingsValueProps) => ReactNode;
  navigationList?: NavigationList[];
  renderFooter?: (theme: any, settings: SettingsValueProps) => ReactNode;
  sideBarHeader?: {
    title: string;
    renderTitle: (theme: any, settings: SettingsValueProps) => ReactNode | string
    renderIcons: (theme: any, settings: SettingsValueProps) => ReactNode;
  }
}