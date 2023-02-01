import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const ONBOARDING_DONE_KEY = 'onboarding_done';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [onboardingDone, setOnboardingDone] = useState();

  useEffect(() => {
    (async () => {
      const value = await getOnboardingValue();
      setOnboardingDone(value);
    })();
  }, []);

  const finishOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_DONE_KEY, 'true');
    setOnboardingDone(true);
  };

  const value = { onboardingDone, finishOnboarding };
  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('OnboardingContext not found');
  }
  return context;
}

async function getOnboardingValue() {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_DONE_KEY);
    if (value === null) {
      await AsyncStorage.setItem(ONBOARDING_DONE_KEY, 'false');
      return false;
    }
    return JSON.parse(value);
  } catch (error) {
    // Skip onboarding on error
    return true;
  }
}
