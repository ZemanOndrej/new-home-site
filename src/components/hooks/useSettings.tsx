import SettingsContext from 'components/context/settings';
import { useContext } from 'react';

export default () => {
  const context = useContext(SettingsContext);
  return context;
};
