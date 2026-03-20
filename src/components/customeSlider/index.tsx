import { alpha, Slider } from "@mui/material";
import { useSettings } from "../../context/settingContext";



export default function CustomeSlider({ onChange, marks, min, max, value, ...other } : any) {

    return <Slider
        onChange={onChange}
        {...other}
        valueLabelDisplay="on"
        valueLabelFormat={value + "px"}
        min={min}
        max={max}
        value={value}
        marks={marks}
        sx={{
            mb: 0,
            height: 2,
            alignItems: "center",
            justifyContent: 'center',
            padding: '13px 0',
            WebkitTapHighlightColor: "transparent",
            '& .MuiSlider-rail': {
                border: "none",
                opacity: 0.12,
                borderRadius: "inharit",
                background: (theme) => theme.palette.grey[500],
                transform: "translateY(-50%)",
                position: 'absolute',
                color: (theme) => theme.palette.primary.light,
                height: 12,
                top: "50%",
            },
            '& .MuiSlider-track': {
                borderRadius: "inharit",
                border: "none",
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark} )`,
                position: 'absolute',
                top: "50%",
                transform: "translateY(-50%)",
                height: 12,
                transition: "left 150ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms cubic-bezier(0.4, 0, 0.2, 1), bottom 150ms cubic-bezier(0.4, 0, 0.2, 1), height 150ms cubic-bezier(0.4, 0, 0.2, 1)"
            },
            '& .MuiSlider-thumb': {
                height: "15px",
                width: "15px",
                zIndex: 4,
                backgroundColor: '#fff',
                boxShadow: (theme) => `0 0 10px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                    boxShadow: (theme) => `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                },
            },
            '& .MuiSlider-markLabel': {
                display: "none",
            },
            '& .MuiSlider-valueLabel': {
                lineHeight: 1.2,
                color: (theme) => theme.palette.primary.contrastText,
                fontSize: (theme) => theme.typography.caption.fontSize,
                background: (theme) => theme.palette.mode === "light" ? theme.palette.grey[800] : theme.palette.grey[700],
                width: (theme) => (`calc(${theme.typography.caption.fontSize} * 3)`),
                height: (theme) => (`calc(${theme.typography.caption.fontSize}*3)`),
                borderRadius: '50% 50% 50% 0',
                padding: 0.2,
                transformOrigin: 'bottom left',
                transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                '&::before': { display: 'none' },
                '&.MuiSlider-valueLabelOpen': {
                    transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                },
                '& > *': {
                    transform: 'rotate(45deg)',
                }
            },
            '& .MuiSlider-mark': {
                backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[600] : theme.palette.grey[500],
                position: "absolute",
                transform: "translate(0px, -50%)",
                top: "50%",
                opacity: 0.8,
                width: "1px",
                height: "4px",
                '&.MuiSlider-markActive': {
                    opacity: 1,
                    backgroundColor: (theme) => theme.palette.grey[200],
                },
            },
        }
        }
    />
}