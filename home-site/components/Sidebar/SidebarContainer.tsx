import { Button } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { MainPageContent } from 'types/mainPage';
import { flatten, unflatten, Temp } from '../../functions/functions';
import { FirebaseContext } from 'components/context/firebase';
import 'firebase/database';
import Sidebar from './Sidebar';
import { getDatabase, ref, set } from 'firebase/database';

interface Props {
  data: MainPageContent;
}

export type IDictionary<TValue> = Record<string, TValue>;
export interface InputObject {
  id: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NewItem {
  inputs: InputObject[];
  formName: string;
}
export type InputGroups = {
  textInputs: InputObject[];
  groupedInputs: IDictionary<InputGroups[]>;
};

const SidebarContainer = ({ data }: Props) => {
  const fb = useContext(FirebaseContext);
  const content = ref(getDatabase(fb), 'main-page-content');
  const dataAttrs = flatten(data as Temp);
  const [formState, setFormState] = useState({
    inputs: {},
    arrayInputs: {} as Record<string, string>,
  });
  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prevState) =>
        ev.target.name.includes(';')
          ? {
              ...prevState,
              arrayInputs: {
                ...prevState.arrayInputs,
                [ev.target.name]: ev.target.value,
              },
            }
          : {
              ...prevState,
              inputs: {
                ...prevState.inputs,
                [ev.target.name]: ev.target.value,
              },
            },
      );
    },
    [],
  );

  const mapKeys = useCallback(
    (obj: Temp): InputGroups =>
      Object.keys(obj).reduce(
        (acc, curr) => {
          if (Array.isArray(obj[curr])) {
            acc.groupedInputs[curr] = (obj[curr] as Temp[]).map(mapKeys);
          } else {
            acc.textInputs.push({
              id: curr,
              value: obj[curr] as string,
              handleChange,
            });
          }
          return acc;
        },
        {
          textInputs: Array<InputObject>(),
          groupedInputs: {} as IDictionary<InputGroups[]>,
        },
      ),
    [],
  );
  const [allObjects, setAllObjects] = useState(mapKeys(dataAttrs));

  const updateData = useCallback(() => {
    console.log('update');
    const res: Temp = { ...dataAttrs, ...formState.inputs };

    for (const key in formState.arrayInputs) {
      const inputValue = formState.arrayInputs[key];
      const [arrayId, index, fieldId] = key.split(';'); //TODO nested arrays
      const item = (res[arrayId] as Temp[])[Number(index)];
      item[fieldId] = inputValue;
    }

    set(content, unflatten(res))
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [formState]);

  const addItem = useCallback((item: NewItem) => {
    const newItem = item.inputs.reduce(
      (acc: IDictionary<string>, curr: InputObject) => {
        acc[curr.id] = curr.value;

        return acc;
      },
      {} as IDictionary<string>,
    );

    (dataAttrs[item.formName] as Temp[]).push(newItem);
    setAllObjects(mapKeys(dataAttrs));
  }, []);
  const removeItem = useCallback((formName: string, index: number) => {
    const newItems = (dataAttrs[formName] as Temp[]).filter(
      (_, i) => i !== index,
    );
    dataAttrs[formName] = newItems;
    setAllObjects(mapKeys(dataAttrs));
  }, []);

  return (
    <aside className="landing-side-panel">
      <h1>
        <span>Edit Data</span>
      </h1>
      <div style={{ background: '#fff' }}>
        <Sidebar
          data={allObjects}
          update={updateData}
          addItem={addItem}
          handleDeleteItem={removeItem}
        />
      </div>
      <Button
        color="secondary"
        fullWidth
        type="submit"
        variant="contained"
        onClick={updateData}
      >
        Save
      </Button>
    </aside>
  );
};
export default React.memo(SidebarContainer);
