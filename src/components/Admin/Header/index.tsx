import { AppBar, Box, Toolbar, IconButton, Link, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

function Header() {
    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#fff',
                color: '#000',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                height: 64,
                width: '100%',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Link href="#" underline="none" sx={{ color: '#000', fontWeight: 'medium', padding: '0 16px' }}>
                        Dashboard
                    </Link>
                    <Link href="#" underline="none" sx={{ color: '#000', fontWeight: 'medium', padding: '0 16px' }}>
                        User
                    </Link>
                    <Link href="#" underline="none" sx={{ color: '#000', fontWeight: 'medium', padding: '0 16px' }}>
                        Settings
                    </Link>
                </Box>

                <Avatar sx={{ bgcolor: "#e0f7fa", color: "#0288d1" }}>
                    <PersonIcon />
                </Avatar>
            </Toolbar>
        </AppBar>
    );
}

export default Header;