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
                color: #923ffb !important;
                font-weight: 400 !important;
            }
            .DayPicker-Day--selected {
                color: #f4f8f8 !important;
            }
            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                background-color: #F8F8F8 !important;
                color: #923ffb !important;
                font-weight: 500 !important;
            }
            .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day.DayPicker-Day--selected):hover {
                background-color: #F8F8F8 !important;
                color: #0b132a !important;
                font-weight: 500 !important;
                border-radius: 10px !important;
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
            .Selectable .DayPicker-Day--start:not(.DayPicker-Day--outside) {
                background-color: #923ffb !important;
                color: #f4f8f8 !important;
                border-top-left-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
            }
            .Selectable .DayPicker-Day--end:not(.DayPicker-Day--outside) {
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
                background-color: #923ffb !important;
                color: #f4f8f8 !important;
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
                transition: all 0.2s;
            }
            .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day.DayPicker-Day--selected):hover {
                background-color: #F8F8FA !important;
                color: #0b132a !important;
                font-weight: 500 !important;
                border-radius: 10px !important;
            }
            .Selectable .DayPicker-Day.DayPicker-Day--selected {
                background-color: #923ffb !important;
                border-radius: 10px !important;
                font-weight: 400 !important;
            }
            .Selectable .DayPicker-Day.DayPicker-Day--selected.DayPicker-Day--disabled {
                background-color: transparent !important;
            }
            .DayPicker-Day--today {
                color: #923ffb !important;
                font-weight: 400 !important;
            }
            .DayPicker-Day--selected {
                color: #f4f8f8 !important;
            }
            .DayPicker-Day--disabled {
                color: #DCE0E0 !important;
                font-weight: 400 !important;
            }
        `}
      </style>
    )}
  </Head>
)

export default DaySelectorStyles
