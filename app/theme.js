import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f4e3ff",
      100: "#d5b2ff",
      200: "#b77fff",
      300: "#9b4cff",
      400: "#7e1aff",
      500: "#6500e6",
      600: "#4e00b4",
      700: "#380082",
      800: "#220050",
      900: "#0d0020",
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
