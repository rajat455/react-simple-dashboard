import { alpha, Box, Button, Card, Typography } from "@mui/material";
import { defaultImages } from "../../../theme/images";
type url = string
interface Props {
    backgroundImage: url
}
export default function WelcomeBanner({ backgroundImage }: Props) {
     backgroundImage =  backgroundImage || defaultImages.backgrounds.welcomeBanner1
    return (
        <Card sx={{
            backgroundImage: (theme) => `linear-gradient(to right, ${alpha(theme.palette.grey[900], 0.88)} 0%, ${theme.palette.grey[900]} 75%), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            paddingY: 5,
            paddingX: 3,
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
        }}>
            <Box display={"flex"} flex={"1 1"} flexDirection={"column"} justifyContent={"center"} alignItems={{ md: "flex-start", sm: "center", xs: "center" }}>
                <Typography mb={1} variant='h4' whiteSpace={"pre-line"} textAlign={{ sm: "center", xs: "center", md: "left" }} color="common.white">
                    {"Welcome back 👋 Jaydon Frankie"}
                </Typography>
                <Typography maxWidth={360} flex={1} mb={3} sx={{ opacity: 0.64 }} textAlign={{ sm: "center", xs: "center", md: "left" }} variant='body2' color={"common.white"}  >
                    If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.
                </Typography>
                <Button size='small' sx={{
                    paddingX: 1.5, paddingY: 0.75, borderRadius: (theme) => theme.shape.borderRadius + "px", textTransform: "unset", color: "#fff",
                    "&:hover": {
                        boxShadow: theme => theme?.shadows.primary
                    }
                }} color="primary" variant="contained">
                    Go now
                </Button>
            </Box>
            <Box flex={1}
                height={240}
            >
                {/* <Graph1Svg /> */}
            </Box>
        </Card>
    )
}