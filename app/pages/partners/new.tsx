import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPartner from "app/partners/mutations/createPartner"
import { PartnerForm, FORM_ERROR } from "app/partners/components/PartnerForm"

const NewPartnerPage: BlitzPage = () => {
  const router = useRouter()
  const [createPartnerMutation] = useMutation(createPartner)

  return (
    <div>
      <h1>Create New Partner</h1>

      <PartnerForm
        submitText="Create Partner"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePartner}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const partner = await createPartnerMutation(values)
            router.push(`/partners/${partner.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/partners">
          <a>Partners</a>
        </Link>
      </p>
    </div>
  )
}

NewPartnerPage.authenticate = true
NewPartnerPage.getLayout = (page) => <Layout title={"Create New Partner"}>{page}</Layout>

export default NewPartnerPage
