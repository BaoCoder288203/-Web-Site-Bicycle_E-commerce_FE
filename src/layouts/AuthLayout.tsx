import Banner from "@/components/Shared/Banner/index";
import Footer from "@/components/Shared/Footer/index";
import Header from "@/components/Shared/Header/index";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
function AuthLayout() {
        window.scrollTo(0, 0);
    return (
        <Box>
            <Header />
            <Banner PageName="Login" PlaceHolder="Login" />
            <Outlet />
            <Footer />
        </Box>
    );
}

export default AuthLayout;
