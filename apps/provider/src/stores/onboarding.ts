import type { ProviderInput } from "vanellus";
import create from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  provider?: ProviderInput;
};

export const useOnboarding = create<OnboardingState>(
  persist(() => ({}), {
    name: "provider:onboarding",
    getStorage: () => sessionStorage,
  })
);

export const setProvider = (provider: ProviderInput) => {
  return useOnboarding.setState({
    provider,
  });
};
