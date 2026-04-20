🚀 React Easy Dashboard (Technical Documentation)

React Easy Dashboard is a high-level UI framework built for MUI. It provides a structured way to handle complex dashboard layouts, deep-theming, and custom iconographies with zero-configuration overhead.


🛠 1. Core Provider: CustomeThemeProvider

This is the brain of your application. It injects custom shadows, typography, and palette presets into the MUI system.

Properties:

Name,Type,Description
settings,SettingsValueProps,"Controls themeMode, themeColorPresets, themeFont, etc."
fonts,Fonts[],Array of custom font families to be injected.
colorPresets,ColorPresets[],Array of custom primary/secondary color schemes.


Settings Object Definition:

TypeScript:

{
  themeMode: 'light' | 'dark';
  themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'yellow' | 'red';
  themeFont: string;
  themeFontSize: number;
  themeLayout: 'vertical' | 'mini' | 'horizontal';
  isContrast: boolean;
  isfullScreen: boolean;
}


🏗 2. Layout Management: DashboardLayout

A pre-configured shell that handles the Sidebar, Header, and Navigation logic.

Properties:

Name,Type,Description
navigationList,NavigationList[],Array of objects defining the sidebar menu items.
onHeaderAction,(action) => void,"Event handler for header icons (e.g., toggle settings)."
onNavigate,(item) => void,Callback triggered when a user clicks a menu item.


🧱 3. Specialized Components

WelcomeBanner

A hero section component with support for background images or custom SVG components.

TypeScript:

<WelcomeBanner 
  bannerHeading="Hello Rajat!" 
  bannerSubHeading="System is operational."
  backgroundImage={defaultImages.backgrounds.welcomeBanner1}
  onGo={() => handleAction()}
>
  <WelcomeBanner.BannerAction>
    <Button>Action</Button>
  </WelcomeBanner.BannerAction>
</WelcomeBanner>

CustomeDataGrid

A heavy-duty table wrapper for handling large datasets with custom cell rendering.

Props: title, columns, InnerProps (All standard DataGridProps).

AntSwitch

A high-performance, styled switch component for toggling system states.

Inherits: All MUI SwitchProps.


🎨 4. Theme Schema Extensions

The library extends the standard MUI Theme interface. You can access these in your custom styles:

TypeScript:

// Accessing Custom Shadows
theme.shadows.card;
theme.shadows.dialog;

// Accessing Extended Palette
theme.palette.primary.lighter;
theme.palette.primary.darker;


📂 5. Asset Library: defaultImages

The library provides pre-bundled assets:

Backgrounds: welcomeBanner1, welcomeBanner2, slide1, etc.

Avatars: avatar1.

SVG Components: Svg1, Svg2.


📋 6. Full Export List (Quick Reference)

The library exports over 50+ components and icons, including:

Icons: AnalyticsIcon, EcommerceIcon, BankingIcon, NotificationIcon, etc.

Controls: CustomeSlider, AntSwitch, SettingsDrawer.

Navigation: NavVertical, Header, DashboardLayout.