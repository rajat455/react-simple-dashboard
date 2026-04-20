import { Box } from "@mui/material";
import Header from "./header";
import NavVertical from "./nav-vertical";
import React, { ReactNode, useEffect, useState } from "react";
import { NavigationList } from "../../theme/types";
import { useSettings } from "../../context/settingContext";

interface Props {
    children: ReactNode;
    onNavigate: (item: NavigationList) => void;
    onHeaderAction: (action: React.MouseEvent<HTMLButtonElement>) => void;
    navigationList: NavigationList[]
}

function DashboardLayout({ navigationList, onHeaderAction, onNavigate, children }: Props) {
    const { settings } = useSettings()
    const [navItem, setnavItem] = useState(navigationList[0])
    const [navList, setNavList] = useState(navigationList || [])
    useEffect(() => {
        if (!navItem) return
        const newList = navList.map((x) => {
            delete x.selected
            return { ...x, selected: x.href === navItem.href }
        })
        if (!newList) return
        setNavList([...newList])

    }, [navItem])


    return (
        <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: !settings.reverseLayout ? 'row' : "row-reverse" }}>
            {settings.themeLayout !== "horizontal" && <DashboardLayout.NavVertical
                onClose={(themeLayout) => {
                    console.log(themeLayout);
                }}
                navigationList={navList}
                onNavigate={(item) => {
                    setnavItem({ ...item })
                    onNavigate(item)
                }}
            />}
            <Box sx={{
                flexGrow: 1,
            }}>
                <DashboardLayout.Header
                    onIconAction={(action) => {
                        onHeaderAction(action)
                    }}
                    title="Dashboard"
                    onNavigate={(item) => {
                        setnavItem({ ...item })
                        onNavigate(navItem)
                    }}
                    navigationList={navList}
                />
                <Box component={"main"}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

DashboardLayout.NavVertical = NavVertical
DashboardLayout.Header = Header


export default DashboardLayout