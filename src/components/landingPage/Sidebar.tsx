import { Button, TextField } from '@material-ui/core';
import useSettings from 'components/hooks/useSettings';
import React, { RefObject, useContext, useRef } from 'react';
import { MainPageContent } from 'types/mainPage';
import { flatten, unflatten, Temp } from './../../functions/functions';
import { FirebaseContext } from 'components/context/firebase';
import 'firebase/database';
interface Props {
  data: MainPageContent;
}
const sidebar = ({ data }: Props) => {
  const { changeIsEditing, isEditing } = useSettings();

  const fb = useContext(FirebaseContext);
  const db = fb?.database();
  const dataAttrs = flatten(data);
  const textInps: [string, RefObject<HTMLInputElement>][] = Object.keys(
    dataAttrs,
  )
    .filter((v) => !Array.isArray(dataAttrs[v]))
    .map((i) => [i, useRef<HTMLInputElement>(null)]);

  const updateData = () => {
    const formData = textInps.reduce((acc: Temp, [key, ref]) => {
      acc[key] = ref.current?.value;
      return acc;
    }, {});

    const res = { ...data, ...unflatten(formData) };
    db?.ref('main-page-content')
      .set(res, (e) => {
        console.log(e);
      })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <aside className="landing-side-panel">
      <h1>
        <span>Edit Data</span>
      </h1>
      <div style={{ background: '#fff' }}>
        {textInps.map(([v, ref]) => (
          <div key={v} className="data-input">
            <TextField
              name={v}
              fullWidth
              defaultValue={dataAttrs[v]}
              label={v}
              size="medium"
              variant="outlined"
              inputRef={ref}
            />

            {/* <label htmlFor={v}>
              {v}
              <input type="text" className="inp" defaultValue={dataAttrs[v]} />
            </label> */}
          </div>
        ))}
      </div>
      <Button
        color="secondary"
        fullWidth
        type="submit"
        variant="contained"
        onClick={() => updateData()}
      >
        Save
      </Button>
    </aside>
  );
};
export default sidebar;
