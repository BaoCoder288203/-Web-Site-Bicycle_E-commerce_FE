import Banner from "@/components/Shared/Banner/index";
import Footer from "@/components/Shared/Footer/index";
import Header from "@/components/Shared/Header/index";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
function OrderLayout() {
    return (
        <Box>
            <Header />
            <Banner PageName="SupplierList" PlaceHolder="SupplierList" />
            <Outlet />
            <Footer />
        </Box>
    );
}

export default OrderLayout;
