import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPartner from "app/partners/queries/getPartner"
import deletePartner from "app/partners/mutations/deletePartner"

export const Partner = () => {
  const router = useRouter()
  const partnerId = useParam("partnerId", "number")
  const [deletePartnerMutation] = useMutation(deletePartner)
  const [partner] = useQuery(getPartner, { id: partnerId })

  return (
    <>
      <Head>
        <title>Partner {partner.id}</title>
      </Head>

      <div>
        <h1>Partner {partner.id}</h1>
        <pre>{JSON.stringify(partner, null, 2)}</pre>

        <Link href={`/partners/${partner.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePartnerMutation({ id: partner.id })
              router.push("/partners")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPartnerPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/partners">
          <a>Partners</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Partner />
      </Suspense>
    </div>
  )
}

ShowPartnerPage.authenticate = true
ShowPartnerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPartnerPage
