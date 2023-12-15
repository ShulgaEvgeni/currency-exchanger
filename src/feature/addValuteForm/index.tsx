import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, SelectChangeEvent } from '@mui/material';

import { userStore as $user, valutesStore as $valute } from '../../stores';
import { valutesParse } from '../../helper/types';
import { Select } from '../../components';

import $ from './style.module.scss';

const AddValuteForm = () => {
  const [selectValute, setValute] = useState('');
  const [optionsForSelect, setOption] = useState<valutesParse[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const temp =
      $valute.valutesNow?.filter(
        (v) => $user.user?.wallets.findIndex((w) => w.id === v.charCode) === -1,
      ) || [];

    setValute(temp[0].id || '');
    setOption(temp);
  }, [$valute.valutesNow]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValute(event.target.value as string);
  };

  const add = () => {
    const valute = optionsForSelect.find((op) => op.id === selectValute);
    if (valute) {
      $user.addWallet(valute);
      searchParams.delete('modal');
      setSearchParams(searchParams);
    }
  };

  return (
    <form className={$.form}>
      <Select value={selectValute} onChange={handleChange} options={optionsForSelect} />

      <Button onClick={add} className={$.button} variant="contained">
        Добавить
      </Button>
    </form>
  );
};

export default AddValuteForm;
