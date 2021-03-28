import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPartner from "app/partners/queries/getPartner"
import updatePartner from "app/partners/mutations/updatePartner"
import { PartnerForm, FORM_ERROR } from "app/partners/components/PartnerForm"

export const EditPartner = () => {
  const router = useRouter()
  const partnerId = useParam("partnerId", "number")
  const [partner, { setQueryData }] = useQuery(getPartner, { id: partnerId })
  const [updatePartnerMutation] = useMutation(updatePartner)

  return (
    <>
      <Head>
        <title>Edit Partner {partner.id}</title>
      </Head>

      <div>
        <h1>Edit Partner {partner.id}</h1>
        <pre>{JSON.stringify(partner)}</pre>

        <PartnerForm
          submitText="Update Partner"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePartner}
          initialValues={partner}
          onSubmit={async (values) => {
            try {
              const updated = await updatePartnerMutation({
                id: partner.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/partners/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditPartnerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPartner />
      </Suspense>

      <p>
        <Link href="/partners">
          <a>Partners</a>
        </Link>
      </p>
    </div>
  )
}

EditPartnerPage.authenticate = true
EditPartnerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPartnerPage
