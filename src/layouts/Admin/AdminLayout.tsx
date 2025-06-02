import { Box } from "@mui/material";
import Header from "@/components/Admin/Header";
import LeftSideBar from "@/components/Admin/LeftSideBar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    const drawerWidth = 240;
    const appBarHeight = 64;

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Header */}
            <Header />

            {/* Main Content with Outlet */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: `${appBarHeight}px`, // Offset below fixed Header
                    ml: `${drawerWidth}px`, // Offset from fixed LeftSidebar
                    width: `calc(100% - ${drawerWidth}px)`, // Fit beside LeftSidebar
                    minHeight: `calc(100vh - ${appBarHeight}px)`, // Fill remaining height
                    p: 3, // Optional padding
                }}
            >
                <Outlet /> {/* Render routed content */}
            </Box>

            {/* Left Sidebar */}
            <LeftSideBar />
        </Box>
    );
}

export default AdminLayout;