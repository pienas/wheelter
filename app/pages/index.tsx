import React, { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Scrollbar } from "react-scrollbars-custom"
import Main from "app/core/components/Main"

const Home: BlitzPage = () => {
  return (
    <Suspense fallback="Kraunama...">
      <Scrollbar style={{ height: "100vh" }} noScrollX>
        <Main />
        <style jsx global>{`
          #menu a:hover {
            color: #7000ff;
            text-decoration: none;
            -webkit-text-decoration: none;
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
            border-radius: 10px !important;
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
            border-radius: 10px !important;
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
            border-radius: 10px !important;
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }
          .formQuickHelp {
            display: grid;
            grid-gap: 2.5rem;
            grid-template-columns: 3.9fr 2.2fr;
          }
          .form button,
          .formQuickHelp button {
            background-color: #a18fff;
            color: #f4f8f8;
            border-radius: 10px;
            font-weight: 500;
            transition: all 250ms;
          }
          .form button:hover,
          .formQuickHelp button:hover {
            background-color: #7e1aff;
          }
          select {
            text-align: right;
            text-align-last: right;
          }
          option {
            text-align: left;
          }
        `}</style>
      </Scrollbar>
    </Suspense>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => (
  <Layout title="Registruokis autopaslaugoms internetu ・ Wheelter">{page}</Layout>
)

export default Home
