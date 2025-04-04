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
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Buy Number",
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

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.secondary[200] : "transparent",
  color: active ? theme.palette.secondary[900] : theme.palette.secondary[100],
  "&:hover": {
    backgroundColor: active ? theme.palette.secondary[200] : theme.palette.action.hover,
  },
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.short,
  }),
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
  ml: "2rem",
  color: active ? theme.palette.primary[600] : theme.palette.secondary[200],
  transition: theme.transitions.create("color", {
    duration: theme.transitions.duration.short,
  }),
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
            },
          }}
        >
          <Box width="100%" sx={{ overflowY: "auto" }}>
            <Box m="1.5rem 2rem 1.5rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                  width="fit-content"
                >
                  <Typography variant="h4" fontWeight="bold">
                    Logo Set
                  </Typography>
                  {!isNonMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <ChevronLeft />
                    </IconButton>
                  )}
                </Box>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, children }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 2rem" }}
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
                      <ListItem key={text} disablePadding>
                        <StyledListItemButton
                          onClick={() => handleDropdownClick(text)}
                          active={active === lcText}
                        >
                          <StyledListItemIcon active={active === lcText}>
                            {icon}
                          </StyledListItemIcon>
                          <ListItemText primary={text} />
                          {openDropdowns[text] ? <ExpandLess /> : <ExpandMore />}
                        </StyledListItemButton>
                      </ListItem>
                      <Collapse in={openDropdowns[text]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {children.map((child) => (
                            <ListItem key={child.text} disablePadding>
                              <StyledListItemButton
                                onClick={() => {
                                  navigate(`/${child.text.toLowerCase().replace(/\s+/g, '-')}`);
                                  setActive(child.text.toLowerCase().replace(/\s+/g, '-'));
                                }}
                                active={active === child.text.toLowerCase().replace(/\s+/g, '-')}
                                sx={{ pl: 4 }}
                              >
                                <StyledListItemIcon active={active === child.text.toLowerCase().replace(/\s+/g, '-')}>
                                  {child.icon}
                                </StyledListItemIcon>
                                <ListItemText primary={child.text} />
                                {active === child.text.toLowerCase().replace(/\s+/g, '-') && (
                                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                                )}
                              </StyledListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </div>
                  );
                }

                return (
                  <ListItem key={text} disablePadding>
                    <StyledListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      active={active === lcText}
                    >
                      <StyledListItemIcon active={active === lcText}>
                        {icon}
                      </StyledListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </StyledListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 1.5rem 3rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      </Slide>
    </Box>
  );
}

export default Sidebar;