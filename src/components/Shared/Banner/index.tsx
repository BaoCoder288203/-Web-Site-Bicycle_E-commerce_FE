import { Box, Typography, Breadcrumbs, Link } from "@mui/material";

type BannerProps = {
    PageName: string;
    PlaceHolder: string;
};

const Banner: React.FC<BannerProps> = ({ PageName, PlaceHolder }) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: 300,
                backgroundImage: "url('/assets/images/banner.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                paddingLeft: 5,
                color: "black",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
        >
            <Box>
                <Typography variant="h4" fontWeight="bold">
                    {PageName}
                </Typography>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary">{PlaceHolder}</Typography>
                </Breadcrumbs>
            </Box>
        </Box>
    );
};

export default Banner;
