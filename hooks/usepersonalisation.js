import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useOnboarding } from './useonboarding';

export const LANGUAGE_KEY = 'lang';
export const LOCATION_KEY = 'location';
export const TASK_KEY = 'task';

const PersonalisationContext = createContext();

export function PersonalisationProvider({ children }) {
  const { onboardingDone } = useOnboarding();
  const [items, setItems] = useState();

  useEffect(() => {
    (async () => {
      if (!onboardingDone) return;

      try {
        const values = await AsyncStorage.multiGet([LANGUAGE_KEY, LOCATION_KEY, TASK_KEY]);
        const personalisationItems = Object.fromEntries(parseValues(values));
        setItems(personalisationItems);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [onboardingDone]);

  const value = { items };
  return (
    <PersonalisationContext.Provider value={value}>{children}</PersonalisationContext.Provider>
  );
}

export function usePersonalisation() {
  const context = useContext(PersonalisationContext);
  if (context === undefined) {
    throw new Error('PersonalisationContext not found');
  }
  return context;
}

function parseValues(values) {
  return values.map(([key, value]) => (key === LANGUAGE_KEY ? [key, value] : [key, Number(value)]));
}
