# react-easy-dashboard
✨ Main Features ->

Customizable Layouts: Vertical, Mini, and Horizontal layout support.

Theme Presets: Multiple color presetes (Default, Cyan, Purple, Blue, Yellow, Red ,...any).

Dark & Light Mode: Inbuilt mode switching support.

Contrast Mode: Heigh-Contrast visual expression with Grey background.

RTL Support: For right to left Layout support.

TypeScript Ready: Enough Type support and Auto compliment.

Responsive: Ready for mobile and desktop or any size device.


📦 Installation ->

Run:npm install react-simple-dashboard @mui/material @emotion/react @emotion/styled


🛠️ Customization (Props)

ThemeProvider ->
.-------------------------------------------------------------------.
| Prop         | Type               | Description                   |
|-------------------------------------------------------------------|
| themeOptions | ThemeOption        | Options for Dashboard Visuals |  
| settings     | SettingsValueProps | For Close Drawer.             |
'-------------------------------------------------------------------'

SettingDrawer ->
.-----------------------------------------------------------.
| Prop             | Type     | Description                 |             
|------------------|----------------------------------------| 
| open             | boolean  | is Drawer open or not.      |           
| onClose          | function | For Close Drawer.           |    
| onChangeSettings | function | Calls when settings change. |
'-----------------------------------------------------------'


HOW TO USE IT ->
(./App.js)

import { useMemo, useState } from 'react';
import { 
  ThemeProvider, 
  DashboardLayout, 
  SettingsDrawer, 
  navConfig, 
  fonts, 
  colorPresets 
} from 'react-simple-dashboard';

const defaultAvatar = "your Image";

function App() {
  const [openSettings, setOpenSettings] = useState(false);
  const settings = {
    themeMode: "light",
    themeColorPresets: "default",
    themeFont: 'Public Sans',
    themeFontSize: 17,
    themeLayout: "vertical",
    isContrast: false,
    reverseLayout: false,
    state:{} // For Access Your State With Redering Methods by Settings Argument (renderLogo, renderFooter, rednerIcons, rednerNavItems) //
  };
  const ThemeOptions = useMemo(() => ({
    navigationList: [...navConfig],
    fonts: [...fonts],
    colorPresets: colorPresets,

    renderLogo: (theme) => (
      <svg width="40" height="40" viewBox="0 0 512 512">
      </svg>
    ),

     renderNavItem: (item, theme, settings) => {
        const vertical = settings.themeLayout === "vertical"
        const mini = settings.themeLayout === "mini"
        const horizontal = settings.themeLayout === "horizontal"
        const { reverseLayout } = settings

        return <ListItem key={item.heading} disablePadding sx={{ display: 'block', mb: 0.5 }}>
          <ListItemButton
            selected={item.selected}
            sx={{
              minHeight: horizontal ? 32 : 44,
              borderRadius: 1,
              display: 'flex',
              maxWidth: "100%",
              flexDirection: !mini ? (reverseLayout ? "row-reverse" : "row") : "column",
              justifyContent: !mini ? (reverseLayout ? "end" : 'start') : 'center',
              alignItems: 'center',
              paddingY: horizontal ? 0 : 0.5,
              gap: (!mini && !reverseLayout && !horizontal ? 0.7 : !mini && reverseLayout && !horizontal ? 1.5 : 0.7),
              paddingLeft: !mini && !horizontal ? (reverseLayout ? 1 : 1.5) : 1,
              paddingRight: !mini && !horizontal ? (reverseLayout ? 1.5 : 1) : 1,
              paddingTop: horizontal ? 0 : (!mini ? 0.5 : 1)
            }}
          >
            <ListItemIcon sx={{
              minWidth: 0,
              mr: (!mini && !horizontal && vertical) ? (!reverseLayout ? 0.8 : 0) : 0,
              justifyContent: 'center',
              alignItems: "center",
              color: item.selected ? (theme.palette.mode === "light" ? "primary.main" : "primary.light") : "text.secondary",
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText style={{ marginTop: 0, marginBottom: 3, flex: "unset" }} primary={item.heading} primaryTypographyProps={{ minWidth: "max-content", fontWeight: item.selected ? (!mini ? 600 : 700) : (!mini ? 500 : 600), color: item.selected ? (theme.palette.mode === "light" ? "primary.main" : "primary.light") : "text.secondary", sx: { lineHeight: "16px", fontSize: !mini ? theme.typography.body2.fontSize : `calc(${theme.typography.subtitle2.fontSize} - 1px)` } }} />
          </ListItemButton>
        </ListItem>
      },

    renderFooter: (theme) => (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Rajat Jayswal</p>
        <button>Sign Out</button>
      </div>
    ),

    sideBarHeader: {
      renderTitle: () => "Dashboard",
      renderIcons: (theme, settings) => (
        // Header's icons (Notifications, Settings,...All)
        <button onClick={() => setOpenSettings(true)}>Settings</button>
      )
    }
  }), []);
  return (

    <ThemeProvider themeOptions={ThemeOptions} settings={settings}>

      <DashboardLayout themeOptions={ThemeOptions}>

        <h1>Welcome to Dashboard</h1>

      </DashboardLayout>

      <SettingsDrawer

        themeOptions={ThemeOptions}

        open={openSettings}

        onClose={() => setOpenSettings(false)}

        onChangeSettings={(newSettings) => console.log(newSettings)}

      />
    </ThemeProvider>
  );
}
export default App;


📄 License ->
MIT © 2026 rajat455
