import { extendTheme } from "native-base";

export default theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#091227",
    },
    white:{
      50: "#EAF0FF"
    },
    dark:{
      50:"#A5C0FF"
    }
  },
  config: {
    initialColorMode: "dark",
  },
});
