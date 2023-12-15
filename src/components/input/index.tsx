import * as React from 'react';

import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import $ from './style.module.scss';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';

interface IProps extends OutlinedInputProps {
  buttons?: {
    Icon: React.ElementType;
    onClick: () => void;
    hidden?: boolean;
    tooltip?: string;
  }[];
  classNameContainer?: string;
}

const Input = (props: IProps) => {
  const { buttons, classNameContainer, className, ...inpoutProps } = props;

  return (
    <FormControl className={[$.container, classNameContainer].join(' ')} variant="outlined">
      <InputLabel>{inpoutProps.label}</InputLabel>
      <OutlinedInput
        {...inpoutProps}
        className={[$.input, className].join(' ')}
        endAdornment={
          <InputAdornment position="end">
            {buttons?.map(
              (button, index) =>
                button &&
                !button.hidden && (
                  <div className={$.buttonBlock} key={`Button${index}`}>
                    <Divider className={$.divider} orientation="vertical" />
                    <Tooltip enterDelay={500} title={button.tooltip}>
                      <IconButton onClick={button.onClick} className={$.button}>
                        <button.Icon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ),
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Input;
