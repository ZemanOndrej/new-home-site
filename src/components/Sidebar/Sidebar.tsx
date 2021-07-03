import MyFormContainer from 'components/MyForm/MyFormContainer';
import { inputGroupValuesToString, hashCode } from 'functions/functions';
import React from 'react';
import MyTextInput from '../MyForm/MyTextInput';
import { InputGroups, NewItem } from './SidebarContainer';
interface Props {
  data: InputGroups;
  update: () => void;
  addItem: (item: NewItem) => void;
  formName?: string;
  handleDeleteItem: (formName: string, index: number) => void;
}

const Sidebar = ({
  data,
  update,
  addItem,
  formName,
  handleDeleteItem,
}: Props) => (
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
            <div
              key={hashCode(
                inputGroupValuesToString(inputGroup.textInputs, index) +
                  ';' +
                  index,
              )}
            >
              <div style={{ display: 'flex' }}>
                <h5 style={{ textAlign: 'center', flexGrow: 10 }}>
                  {key} {index}
                </h5>
                <h5
                  style={{ flexGrow: 1, cursor: 'pointer' }}
                  onClick={() => handleDeleteItem(key, index)}
                >
                  <i className="fa fa-trash"></i>
                </h5>
              </div>
              <Sidebar
                formName={`${key};${index};`}
                data={inputGroup}
                update={update}
                addItem={addItem}
                handleDeleteItem={handleDeleteItem}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Sidebar;
