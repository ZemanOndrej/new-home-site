import React, { useState, ReactNode } from 'react';

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}
interface Settings {
  theme: Theme;
  isEditing: boolean;
  setSettings: (values: Settings) => void;
  changeIsEditing: () => void;
}

export const defaultSettings = {
  theme: Theme.LIGHT,
  isEditing: false,
  setSettings: () => null,
  changeIsEditing: () => null,
};

const SettingsContext = React.createContext<Settings>(defaultSettings);

export const SettingsProvider = ({
  children,
  settings,
}: {
  children: ReactNode;
  settings: Settings;
}) => {
  const [currentSettings, setCurrentSettings] = useState(
    settings || defaultSettings,
  );

  const setSettings = (values: Settings) => {
    setCurrentSettings(values);
  };
  const changeIsEditing = () => {
    setCurrentSettings({
      ...currentSettings,
      isEditing: !currentSettings.isEditing,
    });
  };

  return (
    <SettingsContext.Provider
      value={{ ...currentSettings, setSettings, changeIsEditing }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
