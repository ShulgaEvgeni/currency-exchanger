import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Tab, Tabs } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Input from '../../components/input';

import $ from './style.module.scss';
import { userStore as $user } from '../../stores';

const Authentication = () => {
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isVisibility, seVisibility] = useState(false);
  const navigate = useNavigate();

  const [typeSign, setTypeSign] = useState('signin');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTypeSign(newValue);
  };

  useEffect(() => {
    if ($user.userId) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = () => {
    let isSaccess = false;

    if (typeSign === 'signup') {
      $user.signUpUser(name, login, password);
      isSaccess = true;
    }
    if (typeSign === 'signin') {
      isSaccess = $user.signInUser(login, password);
    }

    if (isSaccess) {
      navigate('/');
    }
  };

  return (
    <form className={$.form}>
      <Tabs className={$.tabs} value={typeSign} onChange={handleChange}>
        <Tab className={$.tab} label="Вход" value={'signin'} />
        <Tab className={$.tab} label="Регистрация" value={'signup'} />
      </Tabs>
      {typeSign === 'signup' && (
        <Input
          value={name}
          label="Имя"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      )}
      <Input
        value={login}
        label="Логин"
        onChange={(e) => {
          setLogin(e.target.value);
        }}
      />
      <Input
        value={password}
        label="Пароль"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type={isVisibility ? 'text' : 'password'}
        buttons={[
          {
            Icon: isVisibility ? VisibilityIcon : VisibilityOffIcon,
            onClick() {
              seVisibility((v) => !v);
            },
            tooltip: isVisibility ? 'Скрыть пароль' : 'Показать пароль',
          },
        ]}
      />

      <Button className={$.button} variant="contained" onClick={handleSubmit}>
        Войти
      </Button>
    </form>
  );
};

export default Authentication;
