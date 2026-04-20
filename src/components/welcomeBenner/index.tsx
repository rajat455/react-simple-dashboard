import { alpha, Box, Button, Card, SxProps, Typography, useTheme } from "@mui/material";
import { ReactNode, } from "react";
import { defaultImages } from "../../theme/images";
import { color } from "../../theme/types";

type url = string

interface Props {
    backgroundImage?: url;
    onAction?: (action: { type: string }) => void;
    children: ReactNode;
    SvgComponent?: () => ReactNode;
    bannerHeading?: string;
    bannerSubHeading?: string;
    color: color | "default"
    sx: SxProps
}
function WelcomeBanner({ children, sx, onAction, color = "default", backgroundImage = defaultImages.backgrounds.welcomeBanner1, SvgComponent, bannerHeading = "Welcome back 👋 Jaydon Frankie", bannerSubHeading = "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything." }: Props) {
    const theme = useTheme()
    let bgImage: string = color === "default" ? `linear-gradient(to right, ${alpha(theme.palette.grey[900], 0.88)} 0% , ${theme.palette.grey[900]} 75%), url(${backgroundImage})` : `linear-gradient(to right, ${theme.palette.grey[900]} 25%, ${alpha((theme?.palette as any)[color]?.darker, 0.88)}), url(${backgroundImage})`

    return (
        <Box sx={{
            containerType: 'inline-size',
            containerName: 'welcomeBanner',
            width: '100%'
        }}>
            <Card
                sx={{
                    backgroundImage: bgImage,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    paddingY: 5,
                    paddingX: 3,
                    paddingLeft: 5,
                    border: "1px solid",
                    borderColor: theme.palette.grey[800],
                    position: 'relative',
                    height: "100%",
                    textAlign: "left",
                    gap: 5,
                    display: 'flex',
                    boxSizing: "border-box",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    '@container welcomeBanner (max-width: 600px)': {
                        flexDirection: "column",
                        paddingLeft: 0
                    },
                    ...sx
                }}>
                <Box display={"flex"} flex={"1 1"} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"} sx={{
                    '@container welcomeBanner (max-width: 600px)': {
                        alignItems: "center",
                    },
                }} >

                    <WelcomeBanner.BannerHeading bannerHeading={bannerHeading} />
                    <WelcomeBanner.BannerSubHeading bannerSubHeading={bannerSubHeading} />
                    {children || <WelcomeBanner.BannerAction color={color} onAction={onAction} />}
                </Box>
                <Box flex={1}
                    height={240}
                >
                    {
                        typeof SvgComponent !== "undefined" ?
                            <WelcomeBanner.SvgComponent>
                                <SvgComponent />
                            </WelcomeBanner.SvgComponent> :
                            <WelcomeBanner.SvgComponent>
                                <defaultImages.svgs.Svg2 color={color === "default" ? "primary" : color as color} />
                            </WelcomeBanner.SvgComponent>
                    }
                </Box>
            </Card>
        </Box>
    )
}

WelcomeBanner.SvgComponent = ({ children }: { children: ReactNode }) => {
    return children
}


WelcomeBanner.BannerHeading = ({ children, bannerHeading }: { children?: ReactNode, bannerHeading: string }) => {
    return children || <Typography mb={1} variant='h4' whiteSpace={"pre-line"} textAlign={"left"} sx={{
        '@container welcomeBanner (max-width: 600px)': {
            textAlign: "center",
        },
    }} color="common.white">
        {bannerHeading}
    </Typography>
}

WelcomeBanner.BannerSubHeading = ({ children, bannerSubHeading }: { children?: ReactNode, bannerSubHeading: string }) => {
    return children || <Typography maxWidth={360} flex={1} mb={3} textAlign={"left"} sx={{
        '@container welcomeBanner (max-width: 600px)': {
            textAlign: "center",
        },
        opacity: 0.64
    }} variant='body2' color={"common.white"}  >
        {bannerSubHeading}
    </Typography>
}
WelcomeBanner.BannerAction = ({ onAction, children, color }: { onAction?: (action: any) => void, children?: ReactNode, color?: string }) => {
    const theme = useTheme()
    return children || <>
        <Button onClick={(e) => onAction && onAction(e)} size='small' sx={{
            paddingX: 1.5, paddingY: 0.75, borderRadius: theme.shape.borderRadius + "px", textTransform: "unset",
            "&:hover": {
                boxShadow: theme => (theme.palette as any)?.[color as any]
            }
        }} color={color === "default" ? "primary" : color as any} variant="contained">
            Go now
        </Button>
    </>
}

export default WelcomeBanner