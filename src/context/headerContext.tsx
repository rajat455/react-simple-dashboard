import { createContext, useContext } from "react";
import { ButtonAction } from "../theme/types";
import { LogoIcon } from "../theme/icons";

export const HeaderContext = createContext({
    logo: <LogoIcon />,
    onIconAction: (action: ButtonAction) => { },
    title: "React Easy Dashboard" as string,
})

export const useHeader = () => useContext(HeaderContext)