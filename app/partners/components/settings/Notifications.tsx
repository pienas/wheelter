import { Button, Divider, Flex } from "@chakra-ui/react"

type NotificationsProps = {
  changing: boolean
  onChanging: () => void
}

const Notifications = ({ changing, onChanging }: NotificationsProps) => {
  return (
    <>
      <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
      Pranešimų nustatymai
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

export default Notifications
