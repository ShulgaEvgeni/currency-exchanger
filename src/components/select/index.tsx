import Select, { SelectProps } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import $ from './style.module.scss';

interface IProps extends SelectProps {
  options: {
    id: string;
    name: string;
  }[];
  classNameContainer?: string;
}

const CustomSelect = (props: IProps) => {
  const { options, classNameContainer, className, label, ...selectProps } = props;

  return (
    <FormControl className={[$.container, classNameContainer].join(' ')} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select {...selectProps} className={[$.input, className].join(' ')} label={label}>
        {options.map((o) => (
          <MenuItem key={`selectOp_${o.id}`} value={o.id}>{o.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
