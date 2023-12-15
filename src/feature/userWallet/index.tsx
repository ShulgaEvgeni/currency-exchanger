import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore as $user } from '../../stores';
import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import $ from './style.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from './components';
const UserWallet = observer(() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    $user.getUser();
  }, []);

  return (
    <Box className={$.mainBlock}>
      {$user.userId !== null ? (
        <Box className={$.user}>
          <Box className={$.walletsBlock}>
            <Typography className={$.title} variant="h4">
              Кошелёк
            </Typography>
            <Box className={$.wallets}>
              {$user.user?.wallets.map((w) => (
                <Card
                  wallet={w}
                  onClik={(id) => {
                    $user.walletBuy = id;
                    searchParams.set('modal', 'buyCurrency');
                    setSearchParams(searchParams);
                  }}
                />
              ))}
              <Button
                onClick={() => {
                  searchParams.set('modal', 'addWallet');
                  setSearchParams(searchParams);
                }}
                className={$.button}
              >
                <AddCircleOutlineIcon fontSize={'large'} />
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={$.noUser}>
          <Typography>Для покупки валюты требуется войти в профиль</Typography>
          <Button className={$.button} variant="text" onClick={() => navigate('authentication')}>
            Войти
          </Button>
        </Box>
      )}
    </Box>
  );
});

export default UserWallet;
