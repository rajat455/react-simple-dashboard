import { createContext, useContext } from "react";
import { NavigationList } from "../theme/types";

export const NavigationContext = createContext({
    navigationList: [] as NavigationList[],
    navigateTo: (item: NavigationList) => { },
})

export const useNavigate = () => useContext(NavigationContext)