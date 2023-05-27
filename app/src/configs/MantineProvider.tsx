import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider as MantineCoreProvider,
  MantineThemeOverride,
  MantineThemeColorsOverride,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MantineProvider: FC<Props> = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const colors: MantineThemeColorsOverride = {
    gray: [
      "#212529",
      "#343A40",
      "#495057",
      "#868E96",
      "#ADB5BD",
      "#CED4DA",
      "#DEE2E6",
      "#E9ECEF",
      "#F1F3F5",
      "#F8F9FA",
    ],
  };

  const theme: MantineThemeOverride =
    colorScheme === "dark" ? { colorScheme, colors } : { colorScheme };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineCoreProvider theme={theme} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineCoreProvider>
    </ColorSchemeProvider>
  );
};

export default MantineProvider;
