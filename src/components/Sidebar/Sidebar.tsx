import MyFormContainer from 'components/MyForm/MyFormContainer';
import React from 'react';
import MyTextInput from '../MyForm/MyTextInput';
import { InputGroups, NewItem } from './SidebarContainer';
interface Props {
  data: InputGroups;
  update: () => void;
  addItem: (item: NewItem) => void;
  formName?: string;
}

const Sidebar = ({ data, update, addItem, formName }: Props) => (
  <div style={{ paddingBottom: 1, paddingTop: 1 }}>
    {data.textInputs.map(({ value, id, handleChange }) => (
      <MyTextInput
        key={id}
        name={(formName ?? '') + id}
        value={value}
        onChange={handleChange}
      />
    ))}
    <div className="groups">
      {Object.entries(data.groupedInputs).map(([key, value]) => (
        <div key={key} className="input-group">
          <h4 style={{ textAlign: 'center' }}>{key}</h4>

          <MyFormContainer
            formName={key}
            addItem={addItem}
            data={value[0].textInputs}
          />
          {value.map((inputGroup, index) => (
            <div key={index}>
              <h5 style={{ textAlign: 'center' }}>
                {key} {index}
              </h5>
              <Sidebar
                formName={`${key};${index};`}
                data={inputGroup}
                update={update}
                addItem={addItem}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Sidebar;
