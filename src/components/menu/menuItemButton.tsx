import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

import $ from './style.module.scss';

// interface IProps extends MenuaItemProps {}

const CustomMenuItem = (props: MenuItemProps) => {
  const { children, className, ...menuItemProps } = props;

  return (
    <MenuItem {...menuItemProps} className={[$.menuItem, className].join(' ')}>
      {children}
    </MenuItem>
  );
};

export default CustomMenuItem;
