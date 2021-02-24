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
          "name"-decoration: none;
          -webkit-"name"-decoration: none;
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
        input.form-control {
          border-radius: 0.375rem !important;
          border: 0 !important;
          appearance: none !important;
          outline: 0 !important;
          position: relative !important;
          appearance: none !important;
          transition: all 0.2s !important;
          font-size: 0.875rem !important;
          padding-left: 0 !important;
          padding-right: 1rem !important;
          height: 2.5rem !important;
          background: inherit !important;
          background-color: #f4f8f8 !important;
          color: #6500e6 !important;
          font-weight: 500 !important;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
          width: calc(100% - 70px) !important;
          margin-left: 70px !important;
          padding-top: 1px !important;
        }
        input.form-control::placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 0.875rem;
        }
        input.form-control::-webkit-input-placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 0.875rem;
        }
        input.form-control::-moz-placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 0.875rem;
        }
        input.form-control:-ms-input-placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 0.875rem;
        }
        input.form-control:-moz-placeholder {
          color: #7000ff;
          font-weight: 500;
          font-size: 0.875rem;
        }
        .inputGroup {
          width: 100%;
          display: flex;
          position: relative;
        }
        .selected-flag {
          font-size: 0.875rem !important;
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
          height: 2.5rem !important;
          border-radius: 0.375rem !important;
          border: 0 !important;
          background: #f4f8f8 !important;
          margin-right: -1px !important;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          flex: 0 0 auto !important;
          display: flex !important;
          box-align: center !important;
          align-ttems: center !important;
          white-space: nowrap !important;
          color: #6500e6 !important;
          font-weight: bolder !important;
          width: calc(38px + 2rem) !important;
        }
        .flag-dropdown {
          border: none !important;
          bottom: auto !important;
          border-radius: 0.375rem !important;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
        .form {
          display: grid;
          grid-gap: 2.5rem;
          grid-template-columns: 3.9fr 2.2fr;
        }
        .form button {
          background-color: #a18fff;
          color: #f4f8f8;
          border-radius: 5px;
          font-weight: 600;
          transition: all 250ms;
        }
        .form button:hover {
          background-color: #7e1aff;
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
