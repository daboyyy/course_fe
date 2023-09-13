import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Popover,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

import { fullNameFormat } from "../utils/format";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import paths from "../consts/paths";
import authServices from "../services/auth";
import { useSelector } from "react-redux";

const DashboardAppBar = ({ isLessThanMd }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const cusInfoData = useSelector((state) => state.customerInfo.info?.data);

  // profile popover
  const [anchorEl, setAnchorEl] = useState(null);
  const isPopover = Boolean(anchorEl);
  const popoverId = isPopover ? "user-popover" : undefined;

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopOverClose = () => setAnchorEl(null);

  // Menu
  const menu = [
    {
      title: "All Course",
      path: paths.dashboard,
      onClick: () => {
        if (location.pathname == paths.dashboard) {
          return window.location.reload();
        }

        navigate(paths.dashboard);
      },
    },
  ];
  const isShowCreateCourse = cusInfoData.roleId === 2;
  const handleCreateCourseClick = () => {
    navigate(paths.createCoruse);
  };
  const handleLogout = async () => {
    const data = await authServices.logout();
    if (!data.error) {
      navigate(paths.root);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ mr: 4 }}>
            CourseKub
          </Typography>
          {menu.map((item, index) => (
            <Button
              color="inherit"
              onClick={item.onClick}
              sx={{ mr: 1 }}
              key={index}
            >
              {item.title}
            </Button>
          ))}

          <Box style={{ flex: 1 }} />
          <Button
            color="error"
            variant="contained"
            onClick={handleCreateCourseClick}
            sx={{
              display: isShowCreateCourse && !isLessThanMd ? "" : "none",
              mx: 1,
            }}
          >
            Create Course
          </Button>
          <IconButton
            aria-label="User Menu"
            color="inherit"
            onClick={handleAvatarClick}
          >
            <Avatar
              alt="User Avatar"
              src="https://example.com/user-avatar.jpg"
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Popover
        id={popoverId}
        open={isPopover}
        anchorEl={anchorEl}
        onClose={handlePopOverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper elevation={3}>
          <List>
            <ListItem>
              <ListItemText
                primary={`${fullNameFormat(cusInfoData)}`}
                secondary={`${cusInfoData?.email}`}
              />
            </ListItem>
            <Divider />
            <StyledMenuButton onClick={null}>
              <ListItemText primary="Edit Profile" />
            </StyledMenuButton>
            <StyledMenuButton
              onClick={handleCreateCourseClick}
              sx={{
                display: isShowCreateCourse && isLessThanMd ? "" : "none",
              }}
            >
              <ListItemText primary="Create Course" />
            </StyledMenuButton>
            <StyledMenuButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </StyledMenuButton>
          </List>
        </Paper>
      </Popover>
    </>
  );
};

export default DashboardAppBar;

const StyledMenuButton = styled(ListItem)({
  cursor: "pointer",
});
