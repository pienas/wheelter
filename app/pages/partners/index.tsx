import React, { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Scrollbar } from "react-scrollbars-custom"
import Main from "app/partners/components/Main"

const PartnersHome: BlitzPage = () => {
  return (
    <Suspense fallback="Kraunama...">
      <Scrollbar style={{ height: "100vh" }} noScrollX>
        <Main />
      </Scrollbar>
    </Suspense>
  )
}

PartnersHome.suppressFirstRenderFlicker = true
PartnersHome.getLayout = (page) => <Layout title="Tapk partneriu ・ Wheelter">{page}</Layout>

export default PartnersHome
