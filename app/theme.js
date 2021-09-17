import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      50: "#c99ffd",
      100: "#be8cfd",
      200: "#b379fc",
      300: "#a865fc",
      400: "#9d52fb",
      500: "#923ffb",
      600: "#8339e2",
      700: "#7532c9",
      800: "#662cb0",
      900: "#582697",
    },
    white: "#ffffff",
    black: "#0b132a",
    gray: "#f8f8f8",
    text: "#4F5665",
  },
  fonts: {
    heading: "Rubik",
    body: "Rubik",
  },
  styles: {
    global: {
      heading: {
        color: "black",
      },
      body: {
        color: "black",
        padding: "0",
        margin: "0",
      },
    },
  },
})

export default theme
