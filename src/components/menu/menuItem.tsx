import ListItem, { ListItemProps } from '@mui/material/ListItem';

import $ from './style.module.scss';

// interface IProps extends MenuaItemProps {}

const CustomListItem = (props: ListItemProps) => {
  const { children, className, ...menuItemProps } = props;

  return (
    <ListItem {...menuItemProps} className={[$.menuItem, className].join(' ')}>
      {children}
    </ListItem>
  );
};

export default CustomListItem;
