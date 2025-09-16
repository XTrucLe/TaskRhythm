import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

export function useTheme() {
  return useContext(ThemeContext);
}
