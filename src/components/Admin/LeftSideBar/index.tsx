import {
    Typography,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import { Dashboard, Settings, Inventory, Receipt, LocalShipping, Discount, BarChart } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

function LeftSideBar() {
    const drawerWidth = 240;
    const appBarHeight = 64;
    const location = useLocation();
    const navigate = useNavigate();

    // Define menu items with their paths
    const menuItems = [
        { key: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard", text: "Dashboard" },
        { key: "Product", icon: <Inventory />, path: "/admin/products", text: "Product" },
        { key: "Order", icon: <Receipt />, path: "/admin/orders", text: "Order" },
        { key: "Supplier", icon: <LocalShipping />, path: "/admin/suppliers", text: "Supplier" },
        { key: "Promotion", icon: <Discount />, path: "/admin/promotions", text: "Promotion" },
        { key: "Statistics", icon: <BarChart />, path: "/admin/statistics", text: "Statistics" },
        { key: "Settings", icon: <Settings />, path: "/admin/settings", text: "Settings" },
    ];

    const isActive = (path: string) => location.pathname === path;

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: (theme) => theme.zIndex.appBar - 1,
                position: "fixed",
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    top: `${appBarHeight}px`,
                    height: `calc(100vh - ${appBarHeight}px)`,
                    left: 0,
                    borderTop: "none",
                    borderRight: "1px solid rgba(0,0,0,0.1)",
                    borderLeft: "none",
                    borderBottom: "none",
                },
            }}
        >
            {/* Logo Section */}
            <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
                <img src="/public/assets/images/logo.jpg" alt="logo" className="logo-img" style={{ width: "24px", height: "24px", marginRight: "8px" }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
                    <span>Cycle</span>
                    <span style={{ color: "red" }}>City</span>
                </Typography>
            </Box>

            <List>
                {menuItems.slice(0, 6).map((item) => (
                    <ListItem
                        key={item.key}
                        onClick={() => handleNavigate(item.path)}
                        sx={{
                            cursor: "pointer",
                            backgroundColor: isActive(item.path) ? "#E4926C" : "transparent",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                transform: "scale(1.05)",
                                transition: "all 0.2s ease-in-out",
                            },
                            ...(isActive(item.path) && { fontWeight: "bold", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }),
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? "#1976d2" : "inherit" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List>
                <ListItem
                    key={menuItems[6].key}
                    onClick={() => handleNavigate(menuItems[6].path)}
                    sx={{
                        cursor: "pointer",
                        backgroundColor: isActive(menuItems[6].path) ? "#E4926C" : "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            transform: "scale(1.05)",
                            transition: "all 0.2s ease-in-out",
                        },
                        ...(isActive(menuItems[6].path) && { fontWeight: "bold" }), // Bold text for active item
                    }}
                >
                    <ListItemIcon sx={{ color: isActive(menuItems[6].path) ? "#1976d2" : "inherit" }}>
                        {menuItems[6].icon}
                    </ListItemIcon>
                    <ListItemText primary={menuItems[6].text} />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default LeftSideBar;