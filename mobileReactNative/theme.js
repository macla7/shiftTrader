import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontConfig: {
    Inconsolata: {
      200: {
        normal: "Inconsolata_200ExtraLight",
      },
      300: {
        normal: "Inconsolata_300Light",
      },
      400: {
        normal: "Inconsolata_400Regular",
      },
      500: {
        normal: "Inconsolata_500Medium",
      },
      600: {
        normal: "Inconsolata_600SemiBold",
      },
      700: {
        normal: "Inconsolata_700Bold",
      },
      800: {
        normal: "Inconsolata_800ExtraBold",
      },
      900: {
        normal: "Inconsolata_900Black",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Inconsolata",
    body: "Inconsolata",
    mono: "Inconsolata",
  },
});
