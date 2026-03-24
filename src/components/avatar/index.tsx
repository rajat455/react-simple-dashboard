import { Avatar, Box, useTheme, } from "@mui/material";


interface Props {
    border?: number;
    width: number;
    height: number;
    sx?:any;
    src:string;
}

export default function CustomeAvatar({src, border = 0, width, height }: Props) {
    const theme = useTheme();
    const primaryMain = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;
    let sx: object = {
        '&::before': {
            content: '""',
            position: 'absolute',
            minWidth: '150%',
            minHeight: '150%',
            background: `conic-gradient( #fff  -50%, ${primaryLight}, ${primaryMain} 60%,${primaryLight} 100%, #fff 250%)`,
            animation: 'rotate 3s linear infinite',
        },
        '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            inset: '100%',
            borderRadius: '50%',
            bgcolor: "#fffff",
            zIndex: 1,
        }
    }
    if (!border) sx = {};


    return (
        <Box
            sx={
                {
                    width: width + border,
                    height: height + border,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderRadius: '100%',
                    overflow: 'hidden',
                    ...sx,

                }
            }
        >
            <Avatar
                alt="Avatar"
                src={src}

                sx={{
                    borderWidth: border / 2,
                    borderStyle: "solid",
                    borderColor: (theme) => theme.palette.background.default,
                    width: width,
                    height: height,
                    zIndex: 2,
                }}
            />
        </Box>
    );
}