import React from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Scrollbar } from "react-scrollbars-custom"
import Main from "app/components/Main"

const Home: BlitzPage = () => {
  return (
    <Scrollbar style={{ height: "100vh" }} noScrollX>
      <Main />
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          color: #081631;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }

        #menu a:hover {
          color: #7000ff;
          text-decoration: none;
          -webkit-text-decoration: none;
        }

        .chakra-input::placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 14px;
        }

        .chakra-input::-webkit-input-placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 14px;
        }
        inp.chakra-inputut::-moz-placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 14px;
        }
        .chakra-input:-ms-input-placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 14px;
        }
        .chakra-input:-moz-placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 14px;
        }
        option {
          direction: ltr;
        }
        #service,
        #area,
        #date,
        #serviceName {
          padding-right: 0;
        }
        #wizard {
          padding: 0;
        }
        #wizard svg,
        #wizard p {
          transition: color 0.2s;
        }
        #wizard:focus {
          box-shadow: none;
        }
        #wizard:not([aria-selected="true"]):hover svg,
        #wizard:not([aria-selected="true"]):hover p {
          color: #7000ff;
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
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => (
  <Layout title="Užsirašyk autopaslaugoms internetu - Wheelter">{page}</Layout>
)

export default Home
