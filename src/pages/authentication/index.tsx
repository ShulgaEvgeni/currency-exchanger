import { Container, Typography } from '@mui/material';
import { Authentication } from '../../feature';

import $ from './style.module.scss';

const Page = () => {
  return (
    <Container className={$.container}>
      <Typography className={$.title} variant="h2">
        Войти
      </Typography>
      <Authentication />
    </Container>
  );
};

export default Page;
