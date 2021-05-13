import { Button } from '@material-ui/core';
import useSettings from 'components/hooks/useSettings';
import React, { useCallback, useContext, useReducer, useState } from 'react';
import { MainPageContent } from 'types/mainPage';
import { flatten, unflatten, Temp } from '../../functions/functions';
import { FirebaseContext } from 'components/context/firebase';
import 'firebase/database';
import Sidebar from './Sidebar';
interface Props {
  data: MainPageContent;
}

export interface IDictionary<TValue> {
  [id: string]: TValue;
}
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

const sidebarContainer = ({ data }: Props) => {
  const { changeIsEditing, isEditing } = useSettings();

  const fb = useContext(FirebaseContext);
  const db = fb?.database();
  const dataAttrs = flatten(data);
  const [state, setState] = useState({});
  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [ev.target.name]: ev.target.value });
    },
    [],
  );

  const mapKeys = useCallback(
    (obj: Temp): InputGroups =>
      Object.keys(obj).reduce(
        (acc, curr) => {
          if (Array.isArray(obj[curr])) {
            acc.groupedInputs[curr] = obj[curr].map(mapKeys);
          } else {
            acc.textInputs.push({
              id: curr,
              value: obj[curr],
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

  console.log('renderiing container');

  const updateData = useCallback(() => {
    console.log('update');
    // const formData = textInputs.reduce((acc: Temp, [key, ref]) => {
    //   acc[key] = ref.current?.value;
    //   return acc;
    // }, {});
    // const res = { ...data, ...unflatten(formData) };
    // db?.ref('main-page-content')
    //   .set(res, (e) => {
    //     console.log(e);
    //   })
    //   .then((e) => {
    //     console.log(e);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, []);

  const addItem = useCallback((item: NewItem) => {
    const newIndex = dataAttrs[item.formName].reduce(
      (acc: number, curr: InputObject) => {
        const key = Object.keys(curr)[0];
        const index = Number(
          key.replace(item.formName + '.', '').split('.')[0],
        );
        return index > acc ? index : acc;
      },
      0,
    );
    const newItem = item.inputs.reduce(
      (acc: IDictionary<string>, curr: InputObject) => {
        const propName = curr.id.replace(item.formName + '.', '').split('.')[1];
        acc[`${item.formName}.${newIndex + 1}.${propName}`] = curr.value;

        return acc;
      },
      {} as IDictionary<string>,
    );

    dataAttrs[item.formName].push(newItem);
    setAllObjects(mapKeys(dataAttrs));

    console.log('object');
  }, []);

  return (
    <aside className="landing-side-panel">
      <h1>
        <span>Edit Data</span>
      </h1>
      <div style={{ background: '#fff' }}>
        <Sidebar data={allObjects} update={updateData} addItem={addItem} />
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
export default React.memo(sidebarContainer);
