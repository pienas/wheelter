import { Head } from "blitz"
import { DaySelectionTypes } from "./DaySelector"

type Props = {
  type: string
}

const DaySelectorStyles = ({ type }: Props) => (
  <Head>
    {type === DaySelectionTypes.Range ? (
      <style>
        {`
            .DayPicker-Day--today {
                color: #7000ff !important;
            }
            .DayPicker-Day--selected {
                color: #f4f8f8 !important;
            }
            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                background-color: #7000ff;
            }
            .DayPicker-Day:not(.DayPicker-Day--disabled):hover {
                background-color: #8d33ff !important;
                color: #f4f8f8 !important;
            }
            .Selectable .DayPicker-Day.DayPicker-Day--selected.DayPicker-Day--disabled:not(.DayPicker-Day--start):not(.DayPicker-Day--end) {
                background-color: transparent !important;
            }
            .Selectable .DayPicker-Day--selected.DayPicker-Day--disabled {
                background-color: #E53E3E !important;
            }
            .Selectable .DayPicker-Day {
                border-radius: 0 !important;
            }
            .Selectable .DayPicker-Day--start {
                background-color: #7000ff !important;
                color: #f4f8f8;
                border-top-left-radius: 50% !important;
                border-bottom-left-radius: 50% !important;
            }
            .Selectable .DayPicker-Day--end {
                border-top-right-radius: 50% !important;
                border-bottom-right-radius: 50% !important;
                background-color: #7000ff !important;
                color: #f4f8f8;
            }
            .DayPicker-Day {
                height: 40px;
                width: 40px;
            }
        `}
      </style>
    ) : (
      <style>
        {`
            .DayPicker-Day {
                height: 40px;
                width: 40px;
            }
            .DayPicker-Day:not(.DayPicker-Day--disabled):hover {
                background-color: #8d33ff !important;
                color: #f4f8f8 !important;
            }
            .Selectable .DayPicker-Day.DayPicker-Day--selected {
                background-color: #7000ff !important;
                border-radius: 50% !important;
            }
            .Selectable .DayPicker-Day.DayPicker-Day--selected.DayPicker-Day--disabled {
                background-color: transparent !important;
            }
            .DayPicker-Day--today {
                color: #7000ff !important;
            }
            .DayPicker-Day--selected {
                color: #f4f8f8 !important;
            }
        `}
      </style>
    )}
  </Head>
)

export default DaySelectorStyles
