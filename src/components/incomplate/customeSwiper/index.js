import { Box, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function CustomeSwiper() {
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                position: 'relative',
                borderRadius: (theme) => `${theme.shape.borderRadius * 2}px`,
                overflow: "hidden",
                '.swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-horizontal.swiper-pagination-bullets-dynamic ': {
                    left: "65px",
                    top: "25px",
                    height: "fit-content",
                    position: 'absolute',
                    textAlign: 'left', // ઈમેજ મુજબ જમણી બાજુ કરવા 'right: 20, left: "auto"' કરી શકાય
                    '& .swiper-pagination-bullet': {
                        opacity: 0.32,
                        padding: 0.6,
                        backgroundColor: 'primary.light',
                        '&.swiper-pagination-bullet-active': {
                            opacity: 1,
                            backgroundColor: 'primary.light', // તારી થીમનો પ્રાઈમરી કલર
                        },
                    },
                },

                // --- ૨. એરોઝ (Navigation Buttons) કસ્ટમાઇઝેશન ---
                '& .swiper-button-next, & .swiper-button-prev': {
                    padding: 0.5,
                    top: "15px",
                    width: "fit-content",
                    height: "fit-content",
                    margin: 0,
                    "& .swiper-navigation-icon": {
                        width: "20px",
                        height: "14px"
                    },
                    color: 'common.white',
                    '&:hover': {
                        opacity: 0.7,
                    },
                },
                '& .swiper-button-prev': {
                    right: "52px",
                    left: "unset"
                },
                '& .swiper-button-next': {
                    right: "13px",
                    left: "unset"
                },
            }}
        >
            <Swiper
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{ enabled: true }} // એરો ચાલુ કરવા
                modules={[Pagination, Navigation]}
                className="mySwiper"
                style={{ height: '100%', width: '100%' }}
            >
                {[2, 3, 4].map((num) => (
                    <SwiperSlide key={num}>
                        <Box
                            component={"img"}
                            width={"100%"}
                            height={"100%"}
                            sx={{ objectFit: 'cover' }}
                            src={`./background/bg${num}.webp`}
                            position={"relative"}
                            zIndex={-1}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                zIndex:1,
                                height: '100%',
                                background: (theme) => `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${alpha(theme.palette.common.black, 1)} 75%)`,
                                borderRadius: "inherit",
                                aspectRatio: "inherit",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "end",
                                alignItems: "flex-start",
                                padding: 3,
                                gap:1
                            }}
                        >
                            <Typography textTransform={"uppercase"} color="primary.light" variant="subtitle2" fontSize={(theme) => `calc(${theme.typography.subtitle2.fontSize} + 1px)`} mb={0}>
                                Featured App
                            </Typography>
                            <Typography
                            mb={0}
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
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
                                }}
                                variant="body2"
                                color="common.white">
                                The children giggled with joy as they ran through the sprinklers on a hot summer day.
                            </Typography>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}