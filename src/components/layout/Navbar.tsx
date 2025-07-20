"use client"
import { useState } from "react";
import { MobileMenuButton } from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import { 
  Avatar, 
  IconButton, 
  Badge, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Box,
  Typography
} from "@mui/material";
import { 
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
} from "@mui/icons-material";

// components/Navbar.tsx
export default function Navbar({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: { 
  isMobileMenuOpen: boolean; 
  setIsMobileMenuOpen: (open: boolean) => void; 
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notificationCount= 3; // Example notification count

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
    handleProfileMenuClose();
  };

  const isProfileMenuOpen = Boolean(anchorEl);

  return (
    <nav className="w-full h-16 text-primary flex items-center justify-between md:px-4 pl-0 pr-4 bg-navbar">
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} /> 
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center gap-3">
            <h1 className="text-xl text-sidebar-foreground font-bold text-md">Medidash</h1>
          </div>
        </div>
      </div>

      {/* Right side - Notifications, Theme Toggle, and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon */}
        <IconButton 
          color="inherit" 
          className="text-sidebar-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile Section */}
        <Box className="flex items-center gap-2">
          <IconButton
            onClick={handleProfileMenuOpen}
            className="text-sidebar-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: 'primary.main',
                fontSize: '0.875rem'
              }}
            >
              JD
            </Avatar>
          </IconButton>
          
          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }
            }}
          >
            {/* Profile Header */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Dr. John Doe
              </Typography>
              <Typography variant="caption" color="text.secondary">
                john.doe@medidash.com
              </Typography>
            </Box>
            
            <Divider />
            
            {/* Menu Items */}
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
        
          
            
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </nav>
  );
}
