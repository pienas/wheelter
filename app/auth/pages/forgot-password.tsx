import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import ForgotPasswordForm from "../components/ForgotPasswordForm"
import { useToast } from "@chakra-ui/toast"
import { useRef } from "react"
import SuccessToast from "app/components/index/SuccessToast"

const ForgotPasswordPage: BlitzPage = () => {
  const toast = useToast()
  const toastIdRef = useRef<any>()

  return (
    <div>
      <ForgotPasswordForm
        onSuccess={() =>
          (toastIdRef.current = toast({
            duration: 3000,
            render: () => (
              <SuccessToast
                heading="Pavyko!"
                text="Jei nurodytas el. paštas registruotas mūsų sistemoje, netrukus į nurodytą el. paštą gausite savo slaptažodžio atkūrimo instrukcijas."
                id={toastIdRef.current}
              />
            ),
          }))
        }
      />
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => (
  <Layout title="Slaptažodžio atkūrimas - Wheelter">{page}</Layout>
)

export default ForgotPasswordPage
