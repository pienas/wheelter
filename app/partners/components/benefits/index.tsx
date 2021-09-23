import { Heading, Text, Box, Grid } from "@chakra-ui/react"
import CalendarIcon from "app/core/components/icons/CalendarIcon"
import ReliableIcon from "app/core/components/icons/ReliableIcon"
import AddIcon from "../icons/AddIcon"
import DashboardIcon from "../icons/DashboardIcon"
import NotificationsIcon from "../icons/NotificationsIcon"
import SupportIcon from "../icons/SupportIcon"

type BenefitProps = {
  icon: React.ReactNode
  heading1: string
  heading2: string
  text: string
}

const Benefit = ({ icon, heading1, heading2, text }: BenefitProps) => {
  return (
    <Box width="430px">
      {icon}
      <Heading fontSize="3xl" color="black" fontWeight="500" mt="10px">
        {heading1}
        <br />
        {heading2}
      </Heading>
      <Box
        backgroundColor="brand.500"
        width="120px"
        height="5px"
        borderRadius="full"
        opacity="0.5"
        my="25px"
      />
      <Text color="text" lineHeight="1.6">
        {text}
      </Text>
    </Box>
  )
}

const Benefits = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={12} my="100px">
      <Benefit
        icon={<ReliableIcon boxSize={14} color="brand.500" />}
        heading1="Lengvas"
        heading2="Administravimas"
        text="Susikurkite valdymo erdvę pagal savo poreikius. Paprastas puslapio kūrimas, lengvas ir
          intuityvus valdymas."
      />
      <Benefit
        icon={<CalendarIcon boxSize={14} color="brand.500" />}
        heading1="Interaktyvus"
        heading2="Kalendorius"
        text="Galimybė lengviau planuoti laiką stebint esamus ir būsimus užsakymus."
      />
      <Benefit
        icon={<AddIcon boxSize={14} color="brand.500" />}
        heading1="Komandos"
        heading2="Įtraukimas"
        text="Įtraukite darbuotojus, priskirkite ir sekite jų užsakymus bei įvertinimus, suteikite jiems
        puslapio redagavimo galimybes."
      />
      <Benefit
        icon={<DashboardIcon boxSize={14} color="brand.500" />}
        heading1="Interaktyvi"
        heading2="Suvestinė"
        text="Galimybė susikurti ir modifikuoti įvykių suvestinę. Sekite savo užsakymus, atsiliepimus ir
        kitą statistiką."
      />
      <Benefit
        icon={<NotificationsIcon boxSize={14} color="brand.500" />}
        heading1="Momentiniai"
        heading2="Pranešimai"
        text="Gaukite pranešimus apie gautus užsakymus, jų būseną bei atnaujinimus realiu laiku."
      />
      <Benefit
        icon={<SupportIcon boxSize={14} color="brand.500" />}
        heading1="Pagalbos"
        heading2="Centras"
        text="Visuomet pasiruošęs padėti ir pakonsultuoti pagalbos centras. Suteikiame pagalbą jums
        rūpimais klausimais, padedame susidūrus su nesklandumais."
      />
    </Grid>
  )
}

export default Benefits
