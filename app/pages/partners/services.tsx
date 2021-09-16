import React, { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Scrollbar } from "react-scrollbars-custom"
import DashboardMenu from "app/components/partners/DashboardMenu"

const PartnersServices: BlitzPage = () => {
  return (
    <Suspense fallback="Kraunama...">
      <Scrollbar style={{ height: "100vh" }} noScrollX>
        <DashboardMenu />
        <style jsx global>{`
          #wizard {
            padding: 0;
          }
          #wizard p {
            transition: all 0.2s;
          }
          #wizard:focus {
            box-shadow: none;
          }
          #wizard:not([aria-selected="true"]):hover p {
            color: #0b132a;
          }
          a:hover {
            text-decoration: none !important;
          }
          .ScrollbarsCustom-TrackY {
            width: 6px !important;
            top: 0 !important;
            height: 100% !important;
          }
          .ScrollbarsCustom-ThumbY {
            border-radius: 6px !important;
          }
          .ScrollbarsCustom-Wrapper {
            inset: 0px 6px 0px 0px !important;
          }
        `}</style>
      </Scrollbar>
    </Suspense>
  )
}

PartnersServices.authenticate = { redirectTo: "/login" }
PartnersServices.suppressFirstRenderFlicker = true
PartnersServices.getLayout = (page) => <Layout title="Paslaugos ・ Wheelter">{page}</Layout>

export default PartnersServices
