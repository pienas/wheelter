import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import ResetPasswordForm from "../components/ResetPasswordForm"
import SuccessToast from "app/components/index/SuccessToast"
import { useToast } from "@chakra-ui/toast"
import { useRef } from "react"

const ResetPasswordPage: BlitzPage = () => {
  const toast = useToast()
  const toastIdRef = useRef<any>()

  return (
    <div>
      <ResetPasswordForm
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

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => (
  <Layout title="Naujo slaptažodžio kūrimas - Wheelter">{page}</Layout>
)

export default ResetPasswordPage
