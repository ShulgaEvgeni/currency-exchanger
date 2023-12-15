import * as React from 'react';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import MenuItemButton from './menuItemButton';
import MenuItem from './menuItem';
import $ from './style.module.scss';

interface IProps {
  children: React.ReactNode;
}

const CustomMenu = (props: IProps) => {
  const { children } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        {/* <Tooltip title="Account settings"> */}
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Menu
        className={$.menu}
        classes={{ paper: $.content }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        elevation={0}
        onClick={handleClose}
      >
        {children}
      </Menu>
    </Box>
  );
};

CustomMenu.Divider = () => <Divider />;
CustomMenu.MenuItemButton = MenuItemButton;
CustomMenu.MenuItem = MenuItem;

export default CustomMenu;
