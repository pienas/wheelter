import { Button } from "@chakra-ui/button"
import { FaFacebook } from 'react-icons/fa'

type FacebookButtonProps = {
    onClick?: () => void
}

const FacebookButton = ({ onClick }: FacebookButtonProps) => {
    return (
        <Button onClick={onClick} boxShadow="0px 0px 10px 1px rgba(0, 0, 0, 0.1);" width="280px">
            <FaFacebook fill="#923ffb" style={{ marginRight: "8px" }} /> Prisijunkite su Facebook
        </Button>
    )
}

export default FacebookButton
