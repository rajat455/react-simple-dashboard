// 1. Types & Interfaces
export type { SettingsValueProps, ColorPreset, ThemeMode, ThemeOptions, ThemeLayout, NavigationList } from "./theme/types";

// 3. Theme Configuration & Utils
export { colorPresets, commonBlack, pxToRem, commonWhite, getCustomShadows, getPalette, getTypography, paletteGray, fonts } from "./theme/themeUtils";
export { AppIcon,ArrowLeftIcon,ArrowRightIcon,BankingIcon,BlogIcon,BookingIcon,CalendarIcon,ChatIcon,CloseIcon,ColorPresetsIcon,CompactIcon,ContactIcon,ContrastIcon,CourseIcon,EcommerceIcon,AnalyticsIcon,FileIcon,FileManagerIcon,FontsIcon,FullScreenIcon,InfoIcon,InvoiceIcon,JobIcon,Layout1Icon,Layout2Icon,Layout3Icon,MailIcon,MenuIcon,NightModeIcon,NotificationIcon,OrderIcon,PermissionIcon,ProductIcon,ResetIcon,RightToLeftIcon,SettingsIcon,TourIcon,UserIcon,WindowScreenIcon } from "./theme/icons"
export {defaultImages} from "./theme/images"

// 2. Providers & Context Hooks
export { default as ThemeProvider } from "./theme"
export { SettingsProvider, useSettings } from "./context/settingContext";
export { default as CustomeThemeProvider } from "./theme/customeThemeProvider";

// 5. Layout & Layout Config
export { default as DashboardLayout } from "./layout/dashboard";
export { default as Header } from "./layout/dashboard/header";
export { default as NavVertical } from "./layout/dashboard/nav-vertical";
export { default as SettingsDrawer } from "./layout/dashboard/settings-drawer";
export { NAV, HEADER } from "./layout/dashboard/config-layout";
export { navConfig } from "./layout/dashboard/nav-config";

// 4. Global Components
export { default as AntSwitch } from "./components/antSwitch";
export { default as CustomeAvatar } from "./components/avatar";
export { default as CustomeSlider } from "./components/customeSlider";
export { default as  WelcomeBanner } from "./components/welcomeBenner";
