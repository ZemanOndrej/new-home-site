import MyFormContainer from 'components/MyForm/MyFormContainer';
import React, { useCallback } from 'react';

import MyTextInput from '../MyForm/MyTextInput';
import { InputGroups, NewItem } from './SidebarContainer';
interface Props {
  data: InputGroups;
  update: () => any;
  addItem: (item: NewItem) => any;
}

const sidebar = ({ data, update, addItem }: Props) => {
  console.log('rendering sidebar');
  const renderInput = useCallback(
    ({ textInputs, groupedInputs }: InputGroups) => (
      <>
        <div>
          {textInputs.map(({ value, id, handleChange }) => (
            <MyTextInput
              key={id}
              name={id}
              value={value}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="groups">
          {Object.entries(groupedInputs).map(([key, value]) => (
            <div key={key} className="input-group">
              <h4>{key}</h4>

              <MyFormContainer
                formName={key}
                addItem={addItem}
                data={value[0].textInputs}
              />

              {value.map(renderInput)}
            </div>
          ))}
        </div>
      </>
    ),
    [],
  );

  return renderInput(data);
};
export default sidebar;
