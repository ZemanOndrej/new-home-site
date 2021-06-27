import { FormOptions, useMyForm } from 'components/hooks/useMyForm';
import {
  InputObject,
  IDictionary,
  NewItem,
} from 'components/Sidebar/SidebarContainer';
import React, { useCallback, useState } from 'react';
import MyForm from './MyForm';

interface Props {
  data: InputObject[];
  formName: string;
  addItem: (item: NewItem) => void;
}

const formContainer = ({ data, formName, addItem }: Props) => {
  const [formState, setFormState] = useState<IDictionary<string>>({});
  const { dispatch, formsState } = useMyForm();

  const handleOpen = useCallback(
    () =>
      dispatch({
        type: FormOptions.OPEN,
        key: formName,
        index: data.length,
        value: data,
      }),
    [],
  );

  const handleSave = useCallback(() => {
    const state = {
      inputs: data.map((item) => ({
        ...item,
        value: formState[item.id + '-new'] || '',
      })),
      formName,
    };
    addItem(state);
    dispatch({ type: FormOptions.ADD, key: state.formName });
    state.inputs.forEach((i) => console.log(i.value));
  }, [formState]);

  const onCancel = useCallback(() => {
    dispatch({ type: FormOptions.CLOSE, key: formName });
  }, []);

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((current) => ({
        ...current,
        [ev.target.name]: ev.target.value,
      }));
    },
    [],
  );

  return (
    <MyForm
      data={formsState[formName]}
      handleChange={handleChange}
      handleSave={handleSave}
      handleCancel={onCancel}
      handleOpen={handleOpen}
      isOpen={Boolean(formsState[formName])}
    />
  );
};

export default formContainer;
