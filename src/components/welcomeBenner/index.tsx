import { alpha, Box, Button, Card, SxProps, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { defaultImages } from "../../theme/images";
import { color } from "../../theme/types";

type url = string

interface Props {
    backgroundImage?: url;
    SvgComponent?: ({ color }: { color: color }) => ReactNode;
    bannerHeading?: string;
    sortDescription?: string;
    onGo?: (event?: any) => void;
    color: "default" | "primary" | "error" | "success" | "info" | "warning" | "secondary";
    sx:SxProps
}
export default function WelcomeBanner({ sx, color = "default", backgroundImage = defaultImages.backgrounds.welcomeBanner1, SvgComponent = defaultImages.svgs.Svg1, bannerHeading = "Welcome back 👋 Jaydon Frankie", onGo = function () { }, sortDescription = "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything." }: Props) {
    const theme = useTheme()


    let bgImage: string = color === "default" ? `linear-gradient(to right, ${alpha(theme.palette.grey[900], 0.88)} 0% , ${theme.palette.grey[900]} 75%), url(${backgroundImage})` : `linear-gradient(to right, ${theme.palette.grey[900]} 25%, ${alpha((theme?.palette as any)[color]?.darker , 0.88)}), url(${backgroundImage})`




    return (
        <Card sx={{
            backgroundImage: bgImage,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            paddingY: 5,
            paddingX: 3,
            border: "1px solid",
            borderColor: theme.palette.grey[800],
            paddingLeft: { md: 5 },
            position: 'relative',
            height: "100%",
            textAlign: "left",
            gap: 5,
            display: 'flex',
            boxSizing: "border-box",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: {
                sm: "column",
                xs: "column",
                md: "row"
            },
            ...sx
        }}>
            <Box display={"flex"} flex={"1 1"} flexDirection={"column"} justifyContent={"center"} alignItems={{ md: "flex-start", sm: "center", xs: "center" }}>
                <Typography mb={1} variant='h4' whiteSpace={"pre-line"} textAlign={{ sm: "center", xs: "center", md: "left" }} color="common.white">
                    {bannerHeading}
                </Typography>
                <Typography maxWidth={360} flex={1} mb={3} sx={{ opacity: 0.64 }} textAlign={{ sm: "center", xs: "center", md: "left" }} variant='body2' color={"common.white"}  >
                    {sortDescription}
                </Typography>
                <Button onClick={(e) => onGo(e)} size='small' sx={{
                    paddingX: 1.5, paddingY: 0.75, borderRadius: theme.shape.borderRadius + "px", textTransform: "unset",
                    "&:hover": {
                        boxShadow: theme => (theme.palette as any)?.[color]
                    }
                }} color={color === "default" ? "secondary" : color} variant="contained">
                    Go now
                </Button>
            </Box>
            <Box flex={1}
                height={240}
                color={"primary.dark"}
            >
                <SvgComponent color={color as any} />
            </Box>
        </Card>
    )
}