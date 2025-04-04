/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Collapse,
  styled,
  Slide,
  Avatar,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ExpandLess,
  ExpandMore,
  AddCircleOutline,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "@/assets/avatar.svg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  // {
  //   text: "Client Facing",
  //   icon: null,
  // },
  {
    text: "BuyNumber",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Inbox Message",
    icon: <Groups2Outlined />,
  },
  {
    text: "Campaign Management",
    icon: <ReceiptLongOutlined />,
    children: [
      { text: "Campaign Report", icon: <AddCircleOutline /> },
      { text: "Single Message", icon: <EditOutlined /> },
      { text: "Bulk Message", icon: <DeleteOutline /> },
      { text: "Message Templates", icon: <DeleteOutline /> },
    ],
  },
  {
    text: "Logs",
    icon: <ReceiptLongOutlined />,
    children: [
      { text: "Call Logs", icon: <AddCircleOutline /> },
      { text: "VoiceMail", icon: <EditOutlined /> },
    ],
  },
  {
    text: "Contacts",
    icon: <ReceiptLongOutlined />,
    children: [
      { text: "Import Contacts", icon: <AddCircleOutline /> },
      { text: "Contacts Group", icon: <EditOutlined /> },
    ],
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Sender Group",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Quick Message",
    icon: <TodayOutlined />,
  },
  {
    text: "Notes",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Do Not Call & Text List",
    icon: <PieChartOutlined />,
  },
  {
    text: "Video Management",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "User Accounts",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Opt Management",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Billing Management",
    icon: <TrendingUpOutlined />,
  },
];

// Enhanced styled components for smoother design
const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.secondary[300] : "transparent",
  color: active ? theme.palette.secondary[900] : theme.palette.secondary[100],
  borderRadius: "8px",
  margin: "2px 8px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: active 
      ? theme.palette.secondary[300] 
      : theme.palette.secondary[700],
    color: theme.palette.secondary[50],
  },
  transition: theme.transitions.create(["background-color", "color", "transform"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&:active": {
    transform: "scale(0.98)",
  }
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
  minWidth: "36px",
  color: active ? theme.palette.primary[600] : theme.palette.secondary[200],
  transition: theme.transitions.create("color", {
    duration: theme.transitions.duration.short,
  }),
}));

// Enhanced logo text component
const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: "-0.5px",
  fontSize: "1.5rem",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary[400]} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginLeft: 0,
  display: "inline-block"
}));

function Sidebar({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({}); // Use an object to track multiple dropdowns
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleDropdownClick = (text) => {
    setOpenDropdowns({
      ...openDropdowns,
      [text]: !openDropdowns[text],
    });
  };

  return (
    <Box component="nav">
      <Slide direction="right" in={isSidebarOpen} mountOnEnter unmountOnExit>
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              boxShadow: theme.shadows[4],
              borderRadius: isNonMobile ? 0 : "0 16px 16px 0",
              transition: theme.transitions.create(["width", "box-shadow"], {
                duration: theme.transitions.duration.standard,
              }),
            },
          }}
        >
          <Box width="100%" sx={{ overflowY: "auto", overflowX: "hidden" }}>
            <Box 
              sx={{ 
                p: "1.2rem", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                borderBottom: `1px solid ${theme.palette.divider}`,
                mb: 1
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap="0.2rem"
              >
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: theme.palette.primary.main,
                    fontWeight: "bold",
                    fontSize: "1.2rem"
                  }}
                >
                  LS
                </Avatar>
                <LogoText>
                  Logo Set
                </LogoText>
              </Box>
              {!isNonMobile && (
                <IconButton 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  sx={{ 
                    color: theme.palette.secondary[100],
                    "&:hover": {
                      backgroundColor: theme.palette.secondary[700],
                      color: theme.palette.secondary[50],
                    }
                  }}
                >
                  <ChevronLeft />
                </IconButton>
              )}
            </Box>

            {/* Navigation Items */}
            <List sx={{ pt: 0 }}>
              {navItems.map(({ text, icon, children }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ 
                        m: "1.5rem 0 0.5rem 1.5rem", 
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        opacity: 0.7
                      }}
                      color={theme.palette.secondary[300]}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                if (children) {
                  return (
                    <div key={text}>
                      <ListItem key={text} disablePadding sx={{ display: "block" }}>
                        <StyledListItemButton
                          onClick={() => handleDropdownClick(text)}
                          active={active === lcText ? 1 : 0}
                        >
                          <StyledListItemIcon active={active === lcText ? 1 : 0}>
                            {icon}
                          </StyledListItemIcon>
                          <ListItemText 
                            primary={text} 
                            primaryTypographyProps={{ 
                              fontWeight: openDropdowns[text] ? 600 : 400,
                              fontSize: "0.95rem" 
                            }}
                          />
                          {openDropdowns[text] ? <ExpandLess /> : <ExpandMore />}
                        </StyledListItemButton>
                      </ListItem>
                      <Collapse in={openDropdowns[text]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {children.map((child) => {
                            const childPath = child.text.toLowerCase().replace(/\s+/g, '-');
                            const isChildActive = active === childPath;
                            
                            return (
                              <ListItem key={child.text} disablePadding sx={{ display: "block" }}>
                                <StyledListItemButton
                                  onClick={() => {
                                    navigate(`/${childPath}`);
                                    setActive(childPath);
                                  }}
                                  active={isChildActive ? 1 : 0}
                                  sx={{ 
                                    pl: 4,
                                    ml: 2,
                                    borderLeft: `1px solid ${theme.palette.divider}` 
                                  }}
                                >
                                  <StyledListItemIcon active={isChildActive ? 1 : 0}>
                                    {child.icon}
                                  </StyledListItemIcon>
                                  <ListItemText 
                                    primary={child.text} 
                                    primaryTypographyProps={{ 
                                      fontWeight: isChildActive ? 500 : 400,
                                      fontSize: "0.9rem"
                                    }}
                                  />
                                  {isChildActive && (
                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                  )}
                                </StyledListItemButton>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Collapse>
                    </div>
                  );
                }

                return (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <StyledListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      active={active === lcText ? 1 : 0}
                    >
                      <StyledListItemIcon active={active === lcText ? 1 : 0}>
                        {icon}
                      </StyledListItemIcon>
                      <ListItemText 
                        primary={text}
                        primaryTypographyProps={{ 
                          fontWeight: active === lcText ? 600 : 400,
                          fontSize: "0.95rem"
                        }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </StyledListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* User Profile Section */}
          <Box position="sticky" bottom={0} bgcolor={theme.palette.background.alt}>
            <Divider />
            <FlexBetween
              gap="0.5rem"
              p="1rem"
              sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                transition: theme.transitions.create("background-color", {
                  duration: theme.transitions.duration.short,
                })
              }}
            >
              <Avatar
                alt="profile"
                src={profileImage}
                sx={{ 
                  width: 42, 
                  height: 42, 
                  border: `2px solid ${theme.palette.primary.main}` 
                }}
              />
              <Box flexGrow={1} ml={1}>
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[300] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <IconButton 
                sx={{ 
                  color: theme.palette.secondary[300],
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[700],
                    color: theme.palette.secondary[100],
                  }
                }}
              >
                <SettingsOutlined fontSize="small" />
              </IconButton>
            </FlexBetween>
          </Box>
        </Drawer>
      </Slide>
    </Box>
  );
}

export default Sidebar;