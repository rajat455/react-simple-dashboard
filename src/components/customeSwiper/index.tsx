import { Badge, Box, IconButton, Typography } from "@mui/material";
import { alpha, useTheme } from '@mui/material/styles';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import React, { ReactNode, useMemo, useState } from "react";
import { defaultImages } from "../../theme/images";
import { Swiper as TSwiper, SwiperOptions } from "swiper/types";
import { ArrowLeftIcon, ArrowRightIcon } from "../../theme/icons";

interface Props {
    slides: ReactNode[],
    swiperOptions?: SwiperOptions;
    RenderActions?: ({ swiper }: { swiper: TSwiper }) => ReactNode
}


const defaultSlides = [defaultImages.backgrounds.slide1, defaultImages.backgrounds.slide2, defaultImages.backgrounds.slide3].map((x, key) => {
    return <React.Fragment key={key}>
        <Box
            component={"img"}
            width={"100%"}
            height={"100%"}
            sx={{ objectFit: 'cover' }}
            src={x}
            position={"relative"}
            zIndex={-1}
        />
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1,
                height: '100%',
                background: (theme) => `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${alpha(theme.palette.common.black, 1)} 75%)`,
                borderRadius: "inherit",
                aspectRatio: "inherit",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                alignItems: "flex-start",
                padding: 3,
                gap: 1
            }}
        >
            <Typography textAlign={"start"} textTransform={"uppercase"} color="primary.light" variant="subtitle2" fontSize={(theme) => `calc(${theme.typography.subtitle2.fontSize} + 1px)`} mb={0}>
                Featured App
            </Typography>
            <Typography
                mb={0}
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    textAlign: "start",
                }}
                variant="h5"
                color="common.white">
                Understanding Blockchain Technology: Beyond Cryptocurrency
            </Typography>
            <Typography
                mb={0}
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    textAlign: "start"
                }}
                variant="body2"
                color="common.white">
                The children giggled with joy as they ran through the sprinklers on a hot summer day.
            </Typography>
        </Box>
    </React.Fragment>
})
const Renderactions = ({ swiper }: { swiper: TSwiper }) => {
    const { realIndex, slideTo, slideNext, slidePrev } = swiper
    return <Box gap={1.7} position={"absolute"} paddingY={3.8} paddingX={2.2} alignItems={"center"} justifyContent={"start"} display={"flex"} zIndex={2} height={"50px"} top={0} left={0} width={"100%"}>
        {[...Array(defaultSlides.length)].map((x, index) => {
            return <Badge key={index} onClick={() => {
                slideTo(index)
            }} sx={{
                "& .MuiBadge-dot": {
                    cursor: "pointer",
                    position: "relative",
                    left: 0,
                    top: 0,
                    background: (theme) => alpha(theme.palette.primary.light, index === realIndex ? 1 : 0.24)
                }
            }} badgeContent="" variant="dot" />
        })}
        <Box flexGrow={1} />
        <Box position={"relative"} left={10.5} color={(theme) => theme.palette.grey[400]} top={-5.5} display={"flex"} alignItems={"center"}>
            <IconButton onClick={() => slidePrev()} sx={{ fontSize: 22 }} color="inherit" disableRipple>
                <ArrowLeftIcon />
            </IconButton>
            <IconButton onClick={() => slideNext()} sx={{ fontSize: 22 }} color="inherit" disableRipple>
                <ArrowRightIcon />
            </IconButton>
        </Box>
    </Box>
}
export default function CustomeSwiper({ slides, swiperOptions, RenderActions }: Props) {
    RenderActions = RenderActions || Renderactions
    const theme = useTheme()
    slides = slides || defaultSlides
    const [swiper, setswiper]: [any, any] = useState(useSwiper() || null)

    const renderBullets = useMemo(() => {
        if (!swiper) return null
        return <RenderActions swiper={swiper} />
    }, [swiper])
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                position: 'relative',
                borderRadius: `${(Number(theme.shape.borderRadius) || 0) * 2}px`,
                overflow: "hidden"
            }}
        >
            <Swiper
                loop={true}
                autoplay={{ delay: 3000 }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                style={{ height: '100%', width: '100%' }}
                onSwiper={(swiper) => setswiper(() => ({ ...swiper, slideTo: swiper.slideTo.bind(swiper), slidePrev: swiper.slidePrev.bind(swiper), slideNext: swiper.slideNext.bind(swiper) }))}
                onSlideChange={(swiper) => setswiper(() => ({ ...swiper, slideTo: swiper.slideTo.bind(swiper), slidePrev: swiper.slidePrev.bind(swiper), slideNext: swiper.slideNext.bind(swiper) }))}
                {...swiperOptions}
            >
                {renderBullets}
                {slides.map((slide, key) => (
                    <SwiperSlide key={key}>
                        {slide}
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}