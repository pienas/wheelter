import React from "react"
import { Container } from "@chakra-ui/react"
import Header from "./header"
import Hero from "./hero"
import Search from "./search"
import Services from "./services"
import Partner from "./partner"
import Footer from "./footer"

const Main = () => {
  return (
    <Container bg="white" width="100vw" maxWidth="100vw" overflow="hidden" p={0}>
      <Header />
      <Container width="7xl" maxWidth="7xl">
        <Hero />
        <Search />
        <Services />
      </Container>
      <Partner />
      <Footer />
    </Container>
  )
}

export default Main
