import { AuthenticationError, Image, Link, useMutation } from "blitz"
import login from "app/auth/mutations/login"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { useRouter } from "blitz"
import GoogleButton from "./GoogleButton"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const router = useRouter()

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Box cursor="pointer" margin="0 auto" width="112.5px" mb={4}>
        <Link href="/" passHref>
          <Image src="/logo-no-text.svg" height="102.375px" width="112.5px" alt="Wheelter logo" />
        </Link>
      </Box>
      <Heading as="h1" mb={1}>
        Prisijunkite prie savo paskyros
      </Heading>
      <Heading as="h2" size="md" fontWeight="400">
        ir galėsite naudotis visomis puslapio funkcijomis
      </Heading>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        backgroundColor="#fff"
        padding="3rem 3rem 1.5rem 3rem"
      >
        <GoogleButton onClick={() => router.push("api/auth/google")} />
      </Box>
      <Link href="/" passHref>
        <a className="loginLink back">Grįžti į pradinį puslapį</a>
      </Link>

      <style jsx>
        {`
          .loginLink {
            transition: all 0.2s;
          }
          .loginLink:hover {
            color: #7700ff;
          }
          .loginLink.reset {
            margin-bottom: 0.15rem;
          }
          .loginLink.back {
            margin-top: 0.5rem;
          }
        `}
      </style>
    </Flex>
  )
}

export default LoginForm
