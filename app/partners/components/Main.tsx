import React from "react"
import { Container } from "@chakra-ui/react"
import Header from "./header"
import Hero from "./hero"
import Footer from "./footer"
import Benefits from "./benefits"
import SelectPlan from "./selectPlan"

const Main = () => {
  return (
    <Container bg="white" width="100vw" maxWidth="100vw" overflow="hidden" p={0}>
      <Header />
      <Container width="7xl" maxWidth="7xl">
        <Hero />
        <Benefits />
        <SelectPlan />
      </Container>
      <Footer />
    </Container>
  )
}

export default Main
