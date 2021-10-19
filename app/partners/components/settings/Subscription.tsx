import { Button, Divider, Flex } from "@chakra-ui/react"

type SubscriptionProps = {
  changing: boolean
  onChanging: () => void
}

const Subscription = ({ changing, onChanging }: SubscriptionProps) => {
  return (
    <>
      <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
      Prenumerata
      <Flex justifyContent="center" width="100%" maxWidth="1920px" minWidth="1400px" mb="70px">
        <Button
          background="#EFF0F3"
          _hover={{ background: "#E0E3EF" }}
          isLoading={changing}
          width="200px"
          onClick={onChanging}
        >
          Tvirtinti pakeitimus
        </Button>
      </Flex>
    </>
  )
}

export default Subscription
