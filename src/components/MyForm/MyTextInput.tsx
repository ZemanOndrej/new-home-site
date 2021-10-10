import { TextField } from '@mui/material';
import React, { RefObject } from 'react';
import 'firebase/database';
interface Props {
  name: string;
  value: string;
  inputRef?: RefObject<HTMLInputElement>;
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
const input = ({ name, value, inputRef, onChange }: Props) => {
  return (
    <div key={name} className="data-input">
      <TextField
        name={name}
        fullWidth
        defaultValue={value}
        label={name}
        size="medium"
        variant="outlined"
        inputRef={inputRef || undefined}
        onBlur={onChange}
      />
    </div>
  );
};
export default input;
