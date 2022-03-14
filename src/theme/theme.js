import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";

import { mode } from "@chakra-ui/theme-tools";

const searchBar = {
  variants: {},
};

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f7d5d5",
      100: "#f3bdbd",
      200: "#ec9898",
      300: "#e15e5e",
      400: "#e50914",
      500: "#dc5357",
      600: "#a00303",
      700: "#770303",
      800: "#500202",
      900: "#221f1f",
    },
  },
  fonts: {
    heading: `Nanum Myeongjo, ${base.fonts?.heading}`,
    body: `Nanum Myeongjo,${base.fonts?.body}`,
  },
});
export default theme;
