import { useContext } from "react";
import { ThemeContext } from "../components/ui/ThemeProvider";

export function useTheme() {
  return useContext(ThemeContext);
}
