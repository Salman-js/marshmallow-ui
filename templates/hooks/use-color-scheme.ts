import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * Returns the active scheme as a strict "light" | "dark".
 *
 * Swap this for your own preference context if you support an in-app theme
 * toggle (light / dark / system). The rest of the system only needs a function
 * that returns "light" | "dark".
 */
export function useColorScheme(): "light" | "dark" {
  return useRNColorScheme() === "dark" ? "dark" : "light";
}
