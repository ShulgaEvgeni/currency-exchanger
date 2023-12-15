import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, SelectChangeEvent, Tab, Tabs } from '@mui/material';

import { userStore as $user } from '../../stores';

import Input from '../../components/input';
import { Select } from '../../components';
import { usersWallets } from '../../helper/types';

import $ from './style.module.scss';

const Authentication = () => {
  const [card, setCard] = useState({
    number: '',
    name: '',
    date: '',
    cvv: '',
  });

  const [sum, setSum] = useState('0');
  const [wallet, setWallet] = useState($user.user?.wallets[0].id);
  const [typeBuy, setTypeBuy] = useState('wallet');
  const [optionsForSelect, setOption] = useState<usersWallets[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const temp = $user.user?.wallets.filter((v) => v.charCode !== $user.walletBuy) || [];

    setWallet(temp[0].id);
    setOption(temp);
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTypeBuy(newValue);
  };

  const handleSubmit = async () => {
    let isSaccess = false;

    if (typeBuy === 'card') {
      isSaccess = $user.buyFromCard(Number(sum));
    }

    if (typeBuy === 'wallet' && wallet) {
      isSaccess = await $user.buyFromWallet(Number(sum), wallet);
    }

    if (isSaccess) {
      $user.walletBuy = null;
      navigate(-1);
    }
  };

  return (
    <form className={$.form}>
      <Tabs className={$.tabs} value={typeBuy} onChange={handleChange}>
        <Tab className={$.tab} label="Со счета" value={'wallet'} />
        <Tab className={$.tab} label="С карты" value={'card'} />
      </Tabs>
      <Box hidden={typeBuy !== 'card'}>
        <Box className={$.card}>
          <Input
            className={$.input}
            label={'Номер карты'}
            placeholder="XXXX XXXX XXXX XXXX"
            type="number"
            value={card.number}
            onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
          />
          <Box className={$.inputs}>
            <Input
              value={card.date}
              onChange={(e) => setCard((c) => ({ ...c, date: e.target.value }))}
              className={$.input}
              label={'Срок действия'}
              placeholder="MM/YY"
            />
            <Input
              value={card.cvv}
              onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
              type="number"
              className={$.input}
              label={'CVV'}
              placeholder="XXX"
            />
          </Box>
          <Input
            value={card.name}
            onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
            className={$.input}
            label={'Держатель карты'}
            placeholder="Имя Фамилия"
          />
        </Box>
      </Box>
      <Box hidden={typeBuy !== 'wallet'}>
        <Select
          value={wallet}
          onChange={(e: SelectChangeEvent<unknown>) => {
            setWallet(e.target.value as string);
          }}
          options={optionsForSelect}
        />
      </Box>

      <Input
        value={sum}
        onChange={(e) => setSum(e.target.value)}
        className={$.input}
        label={'Сумма списания'}
      />

      <Button className={$.button} variant="contained" onClick={handleSubmit}>
        Купить
      </Button>
    </form>
  );
};

export default Authentication;
