import { Button } from "@chakra-ui/button"
import { FaGoogle } from "react-icons/fa"

type GoogleButtonProps = {
  onClick?: () => void
}

const GoogleButton = ({ onClick }: GoogleButtonProps) => {
  return (
    <Button
      onClick={onClick}
      boxShadow="0px 0px 10px 1px rgba(0, 0, 0, 0.1);"
      mb="16px"
      width="280px"
      leftIcon={<FaGoogle fill="#923ffb" />}
    >
      Prisijunkite su Google
    </Button>
  )
}

export default GoogleButton
