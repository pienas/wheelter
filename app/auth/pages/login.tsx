import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Prisijungimas ・ Wheelter">{page}</Layout>

export default LoginPage
