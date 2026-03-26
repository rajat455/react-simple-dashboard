import { ReactNode } from "react";
import { ColorPresets, Fonts } from "./themeUtils";
import { Theme } from "@mui/material";

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
  renderLogo?: (theme: Theme, settings: SettingsValueProps) => ReactNode;
  renderNavItem?: (navItem: any, theme: Theme, settings: SettingsValueProps) => ReactNode;
  navigationList?: NavigationList[];
  renderFooter?: (theme: Theme, settings: SettingsValueProps) => ReactNode;
  header?: {
    title: string;
    renderTitle: (theme: Theme, settings: SettingsValueProps) => ReactNode | string
    renderIcons: (theme: Theme, settings: SettingsValueProps) => ReactNode;
  }
}