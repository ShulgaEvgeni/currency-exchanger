import React from 'react';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import $ from './style.module.scss';
import { Box, Button, Typography } from '@mui/material';

interface IModal {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  textTitle?: string | null;
  viewClose?: 'cross' | 'back';
  heightModal?: number | string;
  widthModal?: number | string;
  buttonColor?: string;
  backdropColor?: 'white' | 'black';
  className?: string;
}

const CustomModal = (props: IModal) => {
  const { open, handleClose, children, textTitle = null, viewClose, className = '' } = props;

  const onClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleClose(event);
  };

  const closeComponent = {
    cross: (
      <IconButton className={$.buttonCross} onClick={handleClose} size="small">
        <CloseIcon />
      </IconButton>
    ),
    back: (
      <Button className={$.buttonBack} onClick={handleClose} startIcon={<ArrowBackIosNewIcon />}>
        Назад
      </Button>
    ),
  };

  return (
    <Modal
      className={$.presentation}
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          className: $.backdrop,
        },
      }}
    >
      <Box className={[$.modal, className].join(' ')}>
        {(textTitle || viewClose) && (
          <Box className={$.header}>
            {viewClose === 'back' && closeComponent[viewClose]}
            {textTitle && <Typography variant="h5"> {textTitle} </Typography>}
            {viewClose === 'cross' && closeComponent[viewClose]}
          </Box>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
