import { useQuery, useParam, useRouterQuery, useRouter, BlitzPage, Head } from "blitz"
import getPartner from "app/partners/queries/getPartner"
import { Suspense } from "react"
import { Scrollbar } from "react-scrollbars-custom"
import SignupForm from "app/partners/components/signupForm/SignupForm"
import Layout from "app/core/layouts/Layout"

const Partner = () => {
  const router = useRouter()
  const partnerUrl = useParam("partnerUrl", "string")
  const [partner] = useQuery(getPartner, { url: partnerUrl })
  if (!partner) return null
  const query = useRouterQuery()
  if (query.invite) {
    return (
      <>
        <Head>
          <title>Registracija ・ Wheelter</title>
        </Head>
        <Scrollbar style={{ height: "100vh" }} noScrollX>
          <div>
            <SignupForm token={query.invite as string} onSuccess={() => router.push("/")} />
          </div>
        </Scrollbar>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>{partner.name} ・ Wheelter</title>
      </Head>
      <Scrollbar style={{ height: "100vh" }} noScrollX>
        <div>{partner.name}</div>
      </Scrollbar>
    </>
  )
}

const ShowPartnerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Kraunama...">
        <Partner />
      </Suspense>
    </div>
  )
}

ShowPartnerPage.suppressFirstRenderFlicker = true
ShowPartnerPage.getLayout = (page) => <Layout title="Registracija ・ Wheelter">{page}</Layout>

export default ShowPartnerPage
