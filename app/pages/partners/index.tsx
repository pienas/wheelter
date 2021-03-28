import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPartners from "app/partners/queries/getPartners"

const ITEMS_PER_PAGE = 100

export const PartnersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ partners, hasMore }] = usePaginatedQuery(getPartners, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {partners.map((partner) => (
          <li key={partner.id}>
            <Link href={`/partners/${partner.id}`}>
              <a>{partner.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      {page > 0 && <button onClick={goToPreviousPage}>Previous</button>}

      {hasMore && <button onClick={goToNextPage}>Next</button>}
    </div>
  )
}

const PartnersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Partners</title>
      </Head>

      <div>
        <p>
          <Link href="/partners/new">
            <a>Create Partner</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PartnersList />
        </Suspense>
      </div>
    </>
  )
}

PartnersPage.authenticate = true
PartnersPage.getLayout = (page) => <Layout>{page}</Layout>

export default PartnersPage
