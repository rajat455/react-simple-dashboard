import { Box } from "@mui/material";
import Header from "./header";
import NavVertical from "./nav-vertical";
import { ReactNode } from "react";
import { ThemeOptions } from "../../theme/types";
import { useSettings } from "../../context/settingContext";

interface Props {
    children: ReactNode;
    themeOptions: ThemeOptions
}

export default function DashboardLayout({ children, themeOptions }: Props) {
    const { settings } = useSettings()




    return (
        <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: !settings.reverseLayout ? 'row' : "row-reverse" }}>
            {settings.themeLayout !== "horizontal" && <NavVertical themeOptions={themeOptions}  />}
            <Box sx={{
                flexGrow: 1,
            }}>
                <Header themeOptions={themeOptions} />
                <Box component={"main"}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}