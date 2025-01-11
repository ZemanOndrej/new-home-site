import { useContext } from 'react';
import SettingsContext from '../context/settings';

export default function useSettings() {
  const context = useContext(SettingsContext);
  return context;
}
