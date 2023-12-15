import { Box, Button, Typography } from '@mui/material';
import { usersWallets } from '../../../../helper/types';

import $ from './style.module.scss';

interface IProps {
  wallet: usersWallets;
  onClik?: (id: string) => void;
}

const Card = (props: IProps) => {
  const { wallet, onClik } = props;

  return (
    <Box className={$.card}>
      <Box className={$.info}>
        <Typography>{wallet.name}</Typography>
        <Typography>
          {wallet.charCode}: {wallet.value.toFixed(2)}
        </Typography>
      </Box>
      <Button
        className={$.button}
        variant="contained"
        onClick={() => {
          if (onClik) onClik(wallet.id);
        }}
      >
        Пополнить
      </Button>
    </Box>
  );
};

export default Card;
