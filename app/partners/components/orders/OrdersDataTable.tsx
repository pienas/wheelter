import { useRouter } from "blitz"
import { useState } from "react"
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table"
import Select, { components, ControlProps } from "react-select"
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import CalendarDatesIcon from "app/core/components/icons/CalendarDatesIcon"
import DotsIcon from "app/core/components/icons/DotsIcon"
import ChevronRightIcon from "app/core/components/icons/ChevronRightIcon"
import SearchIcon from "app/core/components/icons/SearchIcon"
import TagIcon from "app/core/components/icons/TagIcon"
import BoxIcon from "app/core/components/icons/BoxIcon"
import UserIcon from "app/core/components/icons/UserIcon"
import EuroIcon from "app/core/components/icons/EuroIcon"

type OrdersDataTableProps = {
  columns: object
  data: object
  filters: object
  loading: boolean
  count: number
  pageIndex: number
  pageSize: number
  pageCount: number
  hasNext: boolean
  hasPrevious: boolean
  sortColumn: string
  sortOrder: string
}

const OrdersDataTable = ({
  columns,
  data,
  filters,
  loading,
  count,
  pageIndex: controlledPageIndex,
  pageSize: controlledPageSize,
  pageCount: controlledPageCount,
  hasNext: controlledHasNext,
  hasPrevious: controlledHasPrevious,
  sortColumn,
  sortOrder,
}: OrdersDataTableProps) => {
  const router = useRouter()

  const {
    getTableBodyProps,
    headerGroups,
    prepareRow,
    columns: instanceColumns,
    setGlobalFilter,
    page,
    pageOptions,
    toggleSortBy,
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageIndex: controlledPageIndex,
      pageSize: controlledPageSize,
      pageCount: controlledPageCount,
      canNextPage: controlledHasNext,
      canPreviousPage: controlledHasPrevious,
      manualSortBy: true,
      disableMultiSort: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )
  const setSort = (column) => {
    if (column.canSort) {
      instanceColumns.forEach((col) => {
        if (col.isSorted) {
          col.clearSortBy()
        }
      })

      if (column.id !== sortColumn) {
        toggleSortBy(column.id, false)
      } else {
        toggleSortBy(column.id, !column.isSortedDesc)
      }

      router.push({
        query: {
          ...router.query,
          sortColumn: column.id,
          sortOrder: column.id === sortColumn ? (sortOrder === "desc" ? "asc" : "desc") : "asc",
        },
      })
    }
  }

  const goToPreviousPage = () => {
    router.push({
      query: {
        ...router.query,
        page: controlledPageIndex - 1,
      },
    })
  }

  const goToNextPage = () => {
    router.push({
      query: {
        ...router.query,
        page: controlledPageIndex + 1,
      },
    })
  }

  const setPerPage = (value: number) => {
    router.push({
      query: {
        ...router.query,
        page: 0,
        perPage: value,
      },
    })
  }

  const serviceOptions = [{ value: "ratuBalansavimas", label: "Ratų balansavimas" }]
  const startTimeOptions = [{ value: "2021-10-25T13:34:00.638Z", label: "2021-10-25 16:34:00" }]
  const priceOptions = [{ value: "10", label: "10 €" }]
  const employeeOptions = [{ value: "pirmasDarbuotojas", label: "Pirmas Darbuotojas" }]
  const statusOptions = [
    { value: "NEW", label: "Naujas" },
    { value: "CANCELLED", label: "Atmestas" },
    { value: "DONE", label: "Atliktas" },
    { value: "ACTIVE", label: "Aktyvus" },
    { value: "LATE", label: "Vėluojantis" },
  ]
  const customStylesFilters = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #E0E3EF",
      borderRadius: "0.375rem",
      boxShadow: "none",
      minHeight: "0",
      width: "220px",
      cursor: "pointer",
      ":focus": { border: "none" },
      ":hover": { border: "1px solid #E0E3EF", boxShadow: "none" },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "3px 6px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0",
      color: "#0b132a",
      paddingRight: "3px",
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: "0",
      fontSize: "14px !important",
      color: "#4f5665 !important",
    }),
    option: (provided) => ({
      ...provided,
      padding: "0.3rem 0.8rem",
      color: "#4f5665",
      fontSize: "14px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#787E97",
      fontSize: "14px",
    }),
    menu: (provided) => ({
      ...provided,
      display: "block",
    }),
    menuList: (provided) => ({
      ...provided,
      display: "block",
    }),
  }
  const Control = ({ children, ...props }: ControlProps) => {
    const { icon } = props.selectProps
    return (
      <components.Control {...props}>
        <span>{icon}</span>
        {children}
      </components.Control>
    )
  }
  const resultsPerPageOptions = [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ]
  const customStyles = {
    container: (provided) => ({
      ...provided,
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #EFF0F3",
      borderRadius: "5px",
      boxShadow: "none",
      minHeight: "0",
      width: "60px",
      cursor: "pointer",
      ":focus": { border: "none" },
      ":hover": { border: "1px solid #EFF0F3", boxShadow: "none" },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "3px 6px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0",
      color: "#0b132a",
      paddingRight: "3px",
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: "0",
      fontSize: "14px !important",
      color: "#4f5665 !important",
    }),
    option: (provided) => ({
      ...provided,
      padding: "0.3rem 0.8rem",
      color: "#4f5665",
      fontSize: "14px",
    }),
    menu: (provided) => ({
      ...provided,
      display: "block",
    }),
    menuList: (provided) => ({
      ...provided,
      display: "block",
    }),
  }
  return (
    <>
      <Flex alignItems="center">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon boxSize={5} color="#787E97" />}
          />
          <Input
            borderColor="#E0E3EF"
            placeholder="Ieškokite pagal bet kurį lauką..."
            _placeholder={{ color: "#787E97", fontSize: "sm" }}
            backgroundColor="white"
            fontSize="sm"
            _focus={{ boxShadow: "none" }}
          />
        </InputGroup>
        <Box backgroundColor="#E0E3EF" width="1px" borderRadius="full" mx="10px" height="20px" />
        <Select
          options={serviceOptions}
          icon={<BoxIcon boxSize={5} color="#787E97" ml="10px" my="9px" />}
          components={{ Control }}
          placeholder="Paslauga"
          isSearchable={false}
          isClearable={true}
          styles={customStylesFilters}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#E8E8E8",
              primary25: "#F8F8F8",
              primary50: "#F2F2F2",
              primary75: "#F2F2F2",
            },
          })}
        />
        <Box
          backgroundColor="#E0E3EF"
          width="0"
          borderRadius="full"
          mx="5px"
          height="20px"
          opacity="0"
        />
        <Select
          options={startTimeOptions}
          icon={<CalendarDatesIcon boxSize={5} color="#787E97" ml="10px" my="9px" />}
          components={{ Control }}
          placeholder="Pradžios laikas"
          isSearchable={false}
          isClearable={true}
          styles={customStylesFilters}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#E8E8E8",
              primary25: "#F8F8F8",
              primary50: "#F2F2F2",
              primary75: "#F2F2F2",
            },
          })}
        />
        <Box
          backgroundColor="#E0E3EF"
          width="0"
          borderRadius="full"
          mx="5px"
          height="20px"
          opacity="0"
        />
        <Select
          options={priceOptions}
          icon={<EuroIcon boxSize={5} color="#787E97" ml="10px" my="9px" />}
          components={{ Control }}
          placeholder="Kaina"
          isSearchable={false}
          isClearable={true}
          styles={customStylesFilters}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#E8E8E8",
              primary25: "#F8F8F8",
              primary50: "#F2F2F2",
              primary75: "#F2F2F2",
            },
          })}
        />
        <Box
          backgroundColor="#E0E3EF"
          width="0"
          borderRadius="full"
          mx="5px"
          height="20px"
          opacity="0"
        />
        <Select
          options={employeeOptions}
          icon={<UserIcon boxSize={5} color="#787E97" ml="10px" my="9px" />}
          components={{ Control }}
          placeholder="Darbuotojas"
          isSearchable={false}
          isClearable={true}
          styles={customStylesFilters}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#E8E8E8",
              primary25: "#F8F8F8",
              primary50: "#F2F2F2",
              primary75: "#F2F2F2",
            },
          })}
        />
        <Box
          backgroundColor="#E0E3EF"
          width="0"
          borderRadius="full"
          mx="5px"
          height="20px"
          opacity="0"
        />
        <Select
          options={statusOptions}
          icon={<TagIcon boxSize={5} color="#787E97" ml="10px" my="9px" />}
          components={{ Control }}
          isMulti
          placeholder="Užsakymo statusas"
          isSearchable={false}
          isClearable={false}
          styles={customStylesFilters}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#E8E8E8",
              primary25: "#F8F8F8",
              primary50: "#F2F2F2",
              primary75: "#F2F2F2",
            },
          })}
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" my="5px">
        <Text color="#787E97" fontSize="11px">
          Rodomi{" "}
          {count % ((controlledPageIndex + 1) * (Number(router.query.perPage) || 10)) !== 0 &&
          controlledPageIndex + 1 === pageOptions.length
            ? count % (controlledPageIndex + 1) === 0
              ? count
              : count % (controlledPageIndex + 1)
            : (Number(router.query.perPage) || 10) > count
            ? count
            : Number(router.query.perPage) || 10}{" "}
          iš {count} rezultatų
        </Text>
        <Flex alignItems="center">
          <Text color="#787E97" fontSize="11px" mr="5px">
            Rezultatų puslapyje:
          </Text>
          <Select
            options={resultsPerPageOptions}
            defaultValue={{ label: router.query.perPage, value: Number(router.query.perPage) }}
            isSearchable={false}
            isClearable={false}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#E8E8E8",
                primary25: "#F8F8F8",
                primary50: "#F2F2F2",
                primary75: "#F2F2F2",
              },
            })}
            onChange={(option) => {
              setPerPage(option.value)
            }}
          />
        </Flex>
      </Flex>
      <Table>
        <Thead>
          {headerGroups.map((headerGroup, groupKey) => (
            <Tr backgroundColor="#EFF0F3" key={groupKey}>
              {headerGroup.headers.map((column, columnKey) => (
                <Th
                  fontWeight={sortColumn === column.id ? "700" : "500"}
                  fontSize="11px"
                  color={sortColumn === column.id ? "black" : "#787E97"}
                  whiteSpace="nowrap"
                  px="10px"
                  borderColor="#E0E3EF"
                  cursor={column.canSort ? "pointer" : ""}
                  onClick={() => {
                    if (column.canSort) setSort(column)
                  }}
                  key={columnKey}
                >
                  <Flex alignItems="center">
                    {column.render("Header")}
                    <Flex direction="column" ml="5px">
                      <TriangleUpIcon
                        w={2}
                        h={2}
                        color={
                          sortColumn === column.id
                            ? sortOrder === "asc"
                              ? "black"
                              : "#afb6d2"
                            : "#afb6d2"
                        }
                      />
                      <TriangleDownIcon
                        w={2}
                        h={2}
                        color={
                          sortColumn === column.id
                            ? sortOrder === "desc"
                              ? "black"
                              : "#afb6d2"
                            : "#afb6d2"
                        }
                      />
                    </Flex>
                  </Flex>
                </Th>
              ))}
              <Th
                fontWeight="500"
                fontSize="11px"
                color="#787E97"
                whiteSpace="nowrap"
                px="10px"
                borderColor="#E0E3EF"
              >
                Veiksmai
              </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody fontSize="13px" {...getTableBodyProps()}>
          {page.map((row, rowKey) => {
            prepareRow(row)
            return (
              <Tr
                {...row.getRowProps()}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  backgroundColor: "white",
                  boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.03)",
                }}
                key={rowKey}
              >
                {row.cells.map((cell, cellKey) => (
                  <Td
                    {...cell.getCellProps()}
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    px="10px"
                    borderColor="#E0E3EF"
                    fontWeight={cell.column.id === "id" ? "600" : "400"}
                    key={cellKey}
                  >
                    {cell.column.id === "startsAt" || cell.column.id === "createdAt" ? (
                      <>
                        <Text>{cell.value.substr(0, 10)}</Text>
                        <Text color="#787E97" fontSize="11px">
                          {cell.value.substr(10, 18)}
                        </Text>
                      </>
                    ) : cell.column.id === "status" ? (
                      <Flex
                        backgroundColor={
                          cell.value === "Vėluojantis"
                            ? "orange.100"
                            : cell.value === "Aktyvus"
                            ? "blue.100"
                            : cell.value === "Naujas"
                            ? "purple.100"
                            : cell.value === "Atliktas"
                            ? "teal.100"
                            : "red.100"
                        }
                        width="min-content"
                        px="8px"
                        borderRadius="3px"
                        color={
                          cell.value === "Vėluojantis"
                            ? "orange.500"
                            : cell.value === "Aktyvus"
                            ? "blue.500"
                            : cell.value === "Naujas"
                            ? "purple.500"
                            : cell.value === "Atliktas"
                            ? "teal.500"
                            : "red.500"
                        }
                        textTransform="uppercase"
                        letterSpacing="1.5px"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="10px"
                        fontWeight="600"
                      >
                        {cell.value}
                      </Flex>
                    ) : (
                      cell.render("Cell")
                    )}
                  </Td>
                ))}
                <Td px="10px" borderColor="#E0E3EF">
                  <Flex alignItems="center" justifyContent="space-between" zIndex={10}>
                    <Text
                      color="brand.500"
                      fontWeight="500"
                      fontSize="11px"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ color: "brand.300" }}
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      overflow="hidden"
                    >
                      Peržiūrėti užsakymą
                    </Text>
                    <Tooltip
                      label="Daugiau veiksmų"
                      placement="bottom"
                      background="#EFF0F3"
                      color="black"
                    >
                      <span>
                        <DotsIcon
                          ml="5px"
                          boxSize={3}
                          color="text"
                          cursor="pointer"
                          transition="all 0.2s"
                          _hover={{ color: "#6500E6" }}
                        />
                      </span>
                    </Tooltip>
                  </Flex>
                </Td>
              </Tr>
            )
          })}
          <Tr>{loading ? <Td colSpan={10000}>Kraunama...</Td> : <></>}</Tr>
        </Tbody>
      </Table>
      <Flex justifyContent="flex-end" width="100%" mb="70px" mt="15px" alignItems="center">
        <Tooltip label="Ankstesnis puslapis" placement="bottom" background="#EFF0F3" color="black">
          <span>
            <ChevronRightIcon
              transform="rotate(180deg)"
              boxSize={6}
              color="#787E97"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ color: "#6500E6" }}
              disabled={!controlledHasPrevious}
              _disabled={{ cursor: "not-allowed" }}
              onClick={() => {
                if (controlledHasPrevious) goToPreviousPage()
              }}
            />
          </span>
        </Tooltip>
        <Text mx="5px" color="#787E97" mt="1px">
          {controlledPageIndex + 1} iš {pageOptions.length}
        </Text>
        <Tooltip label="Kitas puslapis" placement="bottom" background="#EFF0F3" color="black">
          <span>
            <ChevronRightIcon
              boxSize={6}
              color="#787E97"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ color: "#6500E6" }}
              disabled={!controlledHasNext}
              _disabled={{ cursor: "not-allowed" }}
              onClick={() => {
                if (controlledHasNext) goToNextPage()
              }}
            />
          </span>
        </Tooltip>
      </Flex>
    </>
  )
}

export default OrdersDataTable
