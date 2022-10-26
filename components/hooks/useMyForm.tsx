import { IDictionary, InputObject } from 'components/Sidebar/SidebarContainer';
import { useReducer } from 'react';

const initialState = {} as IDictionary<unknown>;

export enum FormOptions {
  OPEN,
  CLOSE,
  ADD,
  RESET,
}

type ActionType = {
  value?: InputObject[];
  type: FormOptions;
  key: string;
  index?: number;
};
export const useMyForm = () => {
  const reducer = (
    state: IDictionary<unknown> | undefined,
    action: ActionType,
  ) => {
    switch (action.type) {
      case FormOptions.OPEN: {
        const form = action.value?.map(({ id }) => ({
          id,
          value: '',
        }));
        return { ...state, [action.key]: form };
      }
      case FormOptions.CLOSE:
        return { ...state, [action.key]: undefined };
      case FormOptions.ADD: {
        return { ...state, [action.key]: undefined };
      }
    }
  };

  const [formsState, dispatch] = useReducer(reducer, initialState);

  return { dispatch, formsState };
};
