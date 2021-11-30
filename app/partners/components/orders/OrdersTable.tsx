import { usePaginatedQuery, useRouter } from "blitz"
import { useState, useMemo } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import getServiceOrders from "app/partners/queries/getServiceOrders"
import { format, formatDistance } from "date-fns"
import OrdersDataTable from "./OrdersDataTable"
import { lt } from "date-fns/locale"

type OrdersTableProps = {
  activeService: number
}

const OrdersTable = ({ activeService }: OrdersTableProps) => {
  const [tooltipDiscountVisible, setTooltipDiscountVisible] = useState(false)

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const perPage = Number(router.query.perPage) || 10

  const sortColumn = (router.query.sortColumn as string) || "id"
  const sortOrder = (router.query.sortOrder as string) || "desc"

  const [{ serviceOrders, hasMore, count }, { isLoading }] = usePaginatedQuery(getServiceOrders, {
    where: {
      carServiceId: activeService,
    },
    select: {
      id: true,
      createdAt: true,
      startsAt: true,
      status: true,
      promoId: true,
      vehicle: {
        select: {
          make: true,
          model: true,
          year: true,
          fuelType: true,
          bodyType: true,
          gearbox: true,
          displacement: true,
          kw: true,
          drivingWheels: true,
          engineCode: true,
          colorCode: true,
          vinCode: true,
        },
      },
      employee: { select: { name: true, surname: true } },
      client: { select: { name: true, surname: true } },
      service: { select: { name: true, price: true, durationTo: true, durationFrom: true } },
      promo: { select: { code: true, discount: true } },
    },
    orderBy: { [sortColumn]: sortOrder },
    skip: perPage * page,
    take: perPage,
  })

  const columns = useMemo(
    () => [
      {
        Header: "Užsakymo nr.",
        accessor: "id",
      },
      {
        Header: "Užsakymo laikas",
        accessor: "createdAt",
        sortType: (rowA, rowB, id, desc) => {
          if (rowA.original[id] > rowB.original[id]) return 1
          if (rowB.original[id] > rowA.original[id]) return -1
          return 0
        },
      },
      {
        Header: "Klientas",
        accessor: "client",
      },
      {
        Header: "Paslauga",
        accessor: "service",
      },
      {
        Header: "Pradžios laikas",
        accessor: "startsAt",
        sortType: (rowA, rowB, id, desc) => {
          if (rowA.original[id] > rowB.original[id]) return 1
          if (rowB.original[id] > rowA.original[id]) return -1
          return 0
        },
      },
      {
        Header: "Trukmė",
        accessor: "duration",
      },
      {
        Header: "Kaina",
        accessor: "price",
        sortType: (rowA, rowB, id, desc) => {
          if (
            typeof rowA.original[id].props.children.props.children[0] === "number" &&
            typeof rowB.original[id].props.children.props.children[0] === "number"
          ) {
            if (
              rowA.original[id].props.children.props.children[0] >
              rowB.original[id].props.children.props.children[0]
            )
              return 1
            if (
              rowB.original[id].props.children.props.children[0] >
              rowA.original[id].props.children.props.children[0]
            )
              return -1
            return 0
          } else if (
            typeof rowA.original[id].props.children.props.children[0] === "number" &&
            typeof rowB.original[id].props.children.props.children[0] !== "number"
          ) {
            if (
              rowA.original[id].props.children.props.children[0] >
              rowB.original[id].props.children.props.children[0].props.children[0]
            )
              return 1
            if (
              rowB.original[id].props.children.props.children[0].props.children[0] >
              rowA.original[id].props.children.props.children[0]
            )
              return -1
            return 0
          } else if (
            typeof rowA.original[id].props.children.props.children[0] !== "number" &&
            typeof rowB.original[id].props.children.props.children[0] === "number"
          ) {
            if (
              rowA.original[id].props.children.props.children[0].props.children[0] >
              rowB.original[id].props.children.props.children[0]
            )
              return 1
            if (
              rowB.original[id].props.children.props.children[0] >
              rowA.original[id].props.children.props.children[0].props.children[0]
            )
              return -1
            return 0
          } else if (
            typeof rowA.original[id].props.children.props.children[0] !== "number" &&
            typeof rowB.original[id].props.children.props.children[0] !== "number"
          ) {
            if (
              rowA.original[id].props.children.props.children[0].props.children[0] >
              rowB.original[id].props.children.props.children[0].props.children[0]
            )
              return 1
            if (
              rowB.original[id].props.children.props.children[0].props.children[0] >
              rowA.original[id].props.children.props.children[0].props.children[0]
            )
              return -1
            return 0
          }
        },
      },
      {
        Header: "Darbuotojas",
        accessor: "employee",
      },
      {
        Header: "Statusas",
        accessor: "status",
      },
    ],
    []
  )
  const data = serviceOrders.map((order: any) => {
    return {
      id: order.id,
      createdAt: format(order.createdAt, "yyyy-MM-dd HH:mm:ss"),
      client: order.client.name + " " + order.client.surname[0] + ".",
      service: order.service.name,
      startsAt: format(order.startsAt, "yyyy-MM-dd HH:mm:ss"),
      duration: formatDistance(
        0,
        (order.service.durationTo - order.service.durationFrom) * 1000 * 60,
        { includeSeconds: true, locale: lt }
      ),
      price: (
        <Flex alignItems="center">
          {order.promoId ? (
            <>
              <Text>{order.service.price * (1 - order.promo.discount / 100)} €</Text>
              <Flex
                backgroundColor="orange.100"
                width="16px"
                height="16px"
                borderRadius="3px"
                color="orange.500"
                textTransform="uppercase"
                letterSpacing="1.5px"
                alignItems="center"
                justifyContent="center"
                fontSize="10px"
                fontWeight="600"
                ml="5px"
                onMouseEnter={() => setTooltipDiscountVisible(true)}
                onMouseLeave={() => setTooltipDiscountVisible(false)}
                position="relative"
              >
                %
                <Box
                  background="white"
                  color="black"
                  border="1px solid #E0E3EF"
                  borderRadius="0.375rem"
                  position="absolute"
                  top="20px"
                  py="5px"
                  px="8px"
                  zIndex="999"
                  visibility={tooltipDiscountVisible ? "visible" : "hidden"}
                  opacity={tooltipDiscountVisible ? 1 : 0}
                  transition="all 0.2s"
                  textTransform="initial"
                  letterSpacing="initial"
                  fontWeight="400"
                >
                  <Text fontSize="14px" whiteSpace="nowrap">
                    Pritaikytas nuolaidos kodas:
                    <Text ml="5px" fontWeight="500" display="inline">
                      {order.promo.code} ({order.promo.discount}%)
                    </Text>
                  </Text>
                </Box>
              </Flex>
            </>
          ) : (
            <Text>{order.service.price} €</Text>
          )}
        </Flex>
      ),
      employee: order.employee.name + " " + order.employee.surname[0] + ".",
      status:
        order.status === "ACTIVE"
          ? order.startsAt.getTime() <= Date.now()
            ? "Vėluojantis"
            : "Aktyvus"
          : order.status === "NEW"
          ? "Naujas"
          : order.status === "DONE"
          ? "Atliktas"
          : "Atmestas",
    }
  })
  const filters = [
    {
      label: "Search by id",
      id: "id",
    },
  ]

  return (
    <OrdersDataTable
      columns={columns}
      data={data}
      filters={filters}
      loading={isLoading}
      count={count}
      pageCount={Math.ceil(count / perPage)}
      pageIndex={page}
      pageSize={perPage}
      hasNext={hasMore}
      hasPrevious={page !== 0}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
    />
  )
}

export default OrdersTable
