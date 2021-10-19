import React, { FC, useEffect, useState } from "react"
import { Text, Flex, HStack } from "@chakra-ui/react"
import DayPicker, { DateUtils, DayModifiers, RangeModifier } from "react-day-picker"
import RadioPill from "./RadioPill"
import DaySelectorStyles from "./DaySelectorStyles"
import { format } from "date-fns"

export enum DaySelectionTypes {
  Single = "Viena diena",
  Multi = "Kelios dienos",
  Range = "Intervalas",
}

type Props = {
  onSelectedDays: (days) => void
  type: DaySelectionTypes
  onDaySelectionTypeChanged: (selectionType) => void
  finalDate: any
}

const DaySelector: FC<Props> = ({
  onSelectedDays,
  type = DaySelectionTypes.Single,
  onDaySelectionTypeChanged,
  finalDate,
}: Props) => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([])
  const [selectedRange, setSelectedRange] = useState<RangeModifier>({
    from: new Date(),
    to: new Date(),
  })
  const [daySelectionType, setDaySelectionType] = useState(type)
  const modifiers = { start: selectedRange.from, end: selectedRange.to }

  if (finalDate.length === 0) {
    useEffect(() => {
      setSelectedDays([new Date()])
      setSelectedRange({ from: new Date(), to: new Date() })
    }, [daySelectionType])
  } else if (finalDate.length === 1) {
    useEffect(() => {
      setSelectedDays(finalDate)
    }, [DaySelectionTypes.Single])
  } else if (finalDate.length > 1) {
    useEffect(() => {
      setSelectedDays(finalDate)
      setDaySelectionType(DaySelectionTypes.Multi)
    }, [DaySelectionTypes.Multi])
  } else if (finalDate.length === undefined) {
    useEffect(() => {
      setSelectedRange({ from: finalDate.from, to: finalDate.to })
      setDaySelectionType(DaySelectionTypes.Range)
    }, [DaySelectionTypes.Range])
  }

  const handleDayClicked = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.disabled) return
    const days = [...selectedDays]
    const selectedIndex = days.findIndex((d) => DateUtils.isSameDay(day, d))
    switch (daySelectionType) {
      case DaySelectionTypes.Single:
        setSelectedDays([day])
        onSelectedDays([day])
        break
      case DaySelectionTypes.Multi:
        if (selectedIndex > -1) {
          days.splice(selectedIndex, 1)
          setSelectedDays(days)
          onSelectedDays(days)
        } else {
          setSelectedDays([...days, day])
          onSelectedDays([...days, day])
        }
        break
      case DaySelectionTypes.Range:
        const range = DateUtils.addDayToRange(day, selectedRange)
        setSelectedRange(range)
        onSelectedDays(range)
        break
    }
  }
  return (
    <>
      <HStack mb={4} justifyContent="space-between">
        {[DaySelectionTypes.Single, DaySelectionTypes.Multi, DaySelectionTypes.Range].map(
          (dst, index) => (
            <RadioPill
              key={dst}
              isSelected={daySelectionType === dst}
              value={index}
              onChange={() => {
                setDaySelectionType(dst)
                setSelectedDays([new Date()])
                setSelectedRange({ from: new Date(), to: new Date() })
                if (onDaySelectionTypeChanged) {
                  onDaySelectionTypeChanged(dst)
                }
              }}
            >
              {dst}
            </RadioPill>
          )
        )}
      </HStack>
      <Text fontSize="sm" textAlign="center" fontWeight="600">
        {daySelectionType === DaySelectionTypes.Range
          ? "Kalendoriuje pasirinkite Jums tinkamų dienų intervalą:"
          : daySelectionType === DaySelectionTypes.Multi
          ? "Kalendoriuje pasirinkite Jums tinkamas dienas:"
          : "Kalendoriuje pasirinkite Jums tinkamą dieną:"}
      </Text>
      <Flex justifyContent="center">
        <DayPicker
          className="Selectable"
          locale="lt"
          months={[
            "Sausis",
            "Vasaris",
            "Kovas",
            "Balandis",
            "Gegužė",
            "Birželis",
            "Liepa",
            "Rugpjūtis",
            "Rugsėjis",
            "Spalis",
            "Lapkritis",
            "Gruodis",
          ]}
          weekdaysLong={[
            "Pirmadienis",
            "Antradienis",
            "Trečiadienis",
            "Ketvirtadienis",
            "Penktadienis",
            "Šeštadienis",
            "Sekmadienis",
          ]}
          weekdaysShort={["P", "A", "T", "K", "Pn", "Š", "S"]}
          firstDayOfWeek={1}
          showOutsideDays
          onDayClick={handleDayClicked}
          disabledDays={[{ before: new Date() }]}
          selectedDays={
            daySelectionType === DaySelectionTypes.Range
              ? [selectedRange.from, { from: selectedRange.from, to: selectedRange.to }]
              : selectedDays
          }
          modifiers={daySelectionType === DaySelectionTypes.Range ? modifiers : undefined}
        />
        <DaySelectorStyles type={daySelectionType ?? "Single"} />
      </Flex>
      {daySelectionType === DaySelectionTypes.Range && !selectedRange.from && !selectedRange.to && (
        <>
          <Text fontSize="sm" textAlign="center" fontWeight="600">
            Jūsų pasirinktas intervalas:
          </Text>
          <Text fontSize="sm" textAlign="center">
            Pasirinkite pirmąją dieną
          </Text>
        </>
      )}
      {daySelectionType === DaySelectionTypes.Range && selectedRange.from && !selectedRange.to && (
        <>
          <Text fontSize="sm" textAlign="center" fontWeight="600">
            Jūsų pasirinktas intervalas:
          </Text>
          <Text fontSize="sm" textAlign="center">
            Pasirinkite paskutinę dieną
          </Text>
        </>
      )}
      {daySelectionType === DaySelectionTypes.Range && selectedRange.from && selectedRange.to && (
        <>
          <Text fontSize="sm" textAlign="center" fontWeight="600">
            Jūsų pasirinktas intervalas:
          </Text>
          <Text fontSize="sm" textAlign="center">
            {format(selectedRange.from, "yyyy-MM-dd")} - {format(selectedRange.to, "yyyy-MM-dd")}
          </Text>
        </>
      )}
      {daySelectionType === DaySelectionTypes.Multi && selectedDays.length > 0 && (
        <Text fontSize="sm" textAlign="center" fontWeight="600">
          Jūsų pasirinktos dienos:
        </Text>
      )}
      {daySelectionType === DaySelectionTypes.Multi &&
        selectedDays.length > 0 &&
        selectedDays.map((day) => (
          <Text fontSize="sm" textAlign="center">
            {format(day, "yyyy-MM-dd")}
            <br />
          </Text>
        ))}
      {daySelectionType === DaySelectionTypes.Multi && selectedDays.length === 0 && (
        <>
          <Text fontSize="sm" textAlign="center" fontWeight="600">
            Jūsų pasirinktos dienos:
          </Text>
          <Text fontSize="sm" textAlign="center">
            Pasirinkite dienas
          </Text>
        </>
      )}
      {daySelectionType === DaySelectionTypes.Single && (
        <>
          <Text fontSize="sm" textAlign="center" fontWeight="600">
            Jūsų pasirinkta diena:
          </Text>
          <Text fontSize="sm" textAlign="center">
            {selectedDays[0]?.toDateString() &&
              format(new Date(Date.parse(selectedDays[0].toDateString())), "yyyy-MM-dd")}
          </Text>
        </>
      )}
    </>
  )
}

export default DaySelector
