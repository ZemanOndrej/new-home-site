import React, { useState, ReactNode, useCallback } from 'react';

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

  const setSettings = useCallback(
    (values: Settings) => {
      setCurrentSettings(values);
    },
    [setCurrentSettings],
  );
  const changeIsEditing = useCallback(() => {
    setCurrentSettings({
      ...currentSettings,
      isEditing: !currentSettings.isEditing,
    });
  }, [setCurrentSettings, currentSettings]);

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
