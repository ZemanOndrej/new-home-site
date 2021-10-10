import { Button } from '@mui/material';
import { InputObject } from 'components/Sidebar/SidebarContainer';
import React from 'react';
import MyTextInput from './MyTextInput';

interface Props {
  data: InputObject[];
  handleSave: () => void;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  handleOpen: () => void;
  isOpen: boolean;
}

const form = ({
  data,
  isOpen,
  handleSave,
  handleChange,
  handleCancel,
  handleOpen,
}: Props) => (
  <div className="form">
    {isOpen ? (
      <Button color="secondary" fullWidth onClick={handleCancel}>
        Cancel
      </Button>
    ) : (
      <Button color="secondary" fullWidth onClick={handleOpen}>
        Add
      </Button>
    )}

    {isOpen && (
      <div>
        <div>
          {data.map((item: InputObject) => (
            <MyTextInput
              key={item.id + '-new'}
              name={item.id + '-new'}
              value={item.value}
              onChange={handleChange}
            />
          ))}
        </div>
        <Button color="secondary" fullWidth onClick={handleSave}>
          Save
        </Button>
      </div>
    )}
  </div>
);

export default form;
