import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "../themes";

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

interface IThemeContextProps {
  children: ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () =>{
	return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<IThemeContextProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
		setThemeName(themeName => themeName === "light" ? "dark" : "light");
		console.log("Clique")
	}, []);

	const theme = useMemo(() => {
		if (themeName === "light") return LightTheme
		return DarkTheme
	}, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
				<Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
				{children}
				</Box>
				</ThemeProvider>
    </ThemeContext.Provider>
  );
};
