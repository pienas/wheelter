import {
  AppProps,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  ErrorBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"
import Fonts from "./Fonts"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={() => {
          reset
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}
