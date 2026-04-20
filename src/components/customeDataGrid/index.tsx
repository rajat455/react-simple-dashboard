import { ReactNode } from 'react';
import {
    DataGrid,
    DataGridProps,
    GridColDef,
} from '@mui/x-data-grid';
import {
    Box,
    Typography,
    Button,
    Paper,
    useTheme,
    SxProps
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


interface Props {
    title?: string;
    disabledRowHover?: boolean;
    InnerProps: DataGridProps;
    columns?: GridColDef[]
    children: ReactNode
}


const CustomeDataGrid = ({ title, disabledRowHover = false, columns, InnerProps, children }: Props) => {
    const theme = useTheme()
    if (columns) InnerProps.columns = columns
    return (
        <Paper
            sx={{
                // maxWidth: { sm: "calc(100vw - 174px)", lg: "calc(100vw - 174px)", md: "calc(100vw - 36px)", xs: "calc(100vw - 28px)" },
                // overflowX: "scroll",
                width: "100%",
                display: "table",
                tableLayout: "fixed",
                "--Paper-overlay": theme.shadows[0] + "!important",
                "--Paper-shadow": theme.shadows[0] + "!important",
                borderRadius: `calc(${theme.shape.borderRadius} * 2)`,

            }}
        >
            {children || <>

                <CustomeDataGrid.TableHeader title={title} />
                <CustomeDataGrid.DataGrid
                    {...InnerProps}
                    disabledRowHover={disabledRowHover}
                />
                <CustomeDataGrid.TableFooter />
            </>}
        </Paper>
    );
};

CustomeDataGrid.DataGrid = (InnerProps: any) => {
    const theme = useTheme()
    return <DataGrid
        autoHeight
        columnBufferPx={0}
        // autosizeOnMount
        style={{ maxWidth: "100%", background: "transparent" }}
        hideFooter
        sx={{

            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.neutral,
                borderRadius: 0
            },
            "& .MuiDataGrid-columnHeader": {
                backgroundColor: "transparent",
                color: theme.palette.text.secondary,
                paddingX: 2
            },
            "& .MuiDataGrid-columnHeader:focus-within": {
                outline: "none"
            },
            "& .MuiDataGrid-cell": {
                display: 'flex',
                alignItems: 'center',
                paddingX: 2,
            },
            '& .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
            },
            "& .MuiButtonBase-root.MuiIconButton-root": {
                backgroundColor: "transparent !important",
                "&:hover": {
                    backgroundColor: "transparent !important",
                },
            },
            "& .MuiDataGrid-sortIcon": {
                color: "inherit",
                fontSize: 18
            },

            "& .MuiDataGrid-columnHeader:not(:hover) .MuiDataGrid-menuIcon": {
                visibility: "hidden",
            },
            "& .MuiDataGrid-row": {
                borderBottom: `0.5px dashed ${theme.palette.divider}`,
                "--rowBorderColor":"transparent"
            },
            "& .MuiDataGrid-row:hover": {
                backgroundColor: (!InnerProps?.disabledRowHover ? theme.palette.action.hover : "transparent" + "! important"),
            },
            "& .MuiDataGrid-cellEmpty": {
                display: "none !important",
            },
            border: "none",
            borderRadius: 0
        }}
        columnHeaderHeight={60}
        rowHeight={68}
        getRowId={(row: any) => row.id}
        {...InnerProps}
    />
}

CustomeDataGrid.TableHeader = ({ sx, title, children }: { sx?: SxProps, title?: string, children?: ReactNode }) => {
    return <Box sx={{ p: 3, pb: 0, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...sx }}>
        {children || <Typography variant="h6">
            {title}
        </Typography>}
    </Box>
}

CustomeDataGrid.TableFooter = ({ children, sx }: { children?: ReactNode, sx?: SxProps }) => {
    const theme = useTheme()
    return <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid', borderColor: theme.palette.background.neutral, ...sx }}>
        {children || <Button
            variant="text"
            size='small'
            color='secondary'
            endIcon={<ChevronRightIcon />}
            sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: theme.shape.borderRadius + "px",
                fontSize: `calc(${theme.typography.button.fontSize} - 1px)`,
            }}
        >
            View all
        </Button>}
    </Box>
}

export default CustomeDataGrid;