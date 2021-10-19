import {
  Box,
  Flex,
  Heading,
  Text,
  TabList,
  Tabs,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQuery } from "blitz"
import React, { FC } from "react"
import CustomTab from "./../customTab/CustomTab"
import DotsIcon from "./../icons/DotsIcon"
import ArrowIcon from "./../icons/ArrowIcon"
import MoneyIcon from "./../icons/MoneyIcon"
import OrdersIcon from "./../icons/OrdersIcon"
import RatingIcon from "./../icons/RatingIcon"
import ReviewsIcon from "./../icons/ReviewsIcon"
import { Doughnut, Line } from "react-chartjs-2"
import getServiceOrdersCount from "app/partners/queries/getServiceOrdersCount"
import getServiceReviewsCount from "app/partners/queries/getServiceReviewsCount"
import getServiceRating from "app/partners/queries/getServiceRating"
import getServiceOrders from "app/partners/queries/getServiceOrders"
import getServiceIncome from "app/partners/queries/getServiceIncome"
import { format } from "date-fns"

const OrderTableRow = (props) => {
  const { order } = props
  const hours = Math.floor(order.service.duration / 60)
  const minutes = (order.service.duration / 60 - hours) * 60
  return (
    <Tr height="50px" key={order.id}>
      <Td
        border="none"
        color="black"
        fontWeight="500"
        borderTopLeftRadius="10px"
        borderBottomLeftRadius="10px"
      >
        {format(order.startsAt, "yyyy-MM-dd HH:mm")}
      </Td>
      <Td border="none" color="black" fontWeight="500">
        {order.service.name}
      </Td>
      <Td border="none" color="black" fontWeight="500">
        {hours} val. {minutes < 10 ? "0" : ""}
        {minutes.toFixed(0)} min.
      </Td>
      <Td border="none" color="black" fontWeight="500">
        {order.client.name} {order.client.surname[0]}.
      </Td>
      <Td border="none" color="black" fontWeight="500">
        {order.employee.name} {order.employee.surname[0]}.
      </Td>
      <Td border="none" color="black" fontWeight="500">
        {order.service.price} €
      </Td>
      <Td
        border="none"
        color="black"
        fontWeight="500"
        borderTopRightRadius="10px"
        borderBottomRightRadius="10px"
      >
        {order.status}
      </Td>
    </Tr>
  )
}

type Props = {
  isOpen: boolean
  activeService: number
  activeCarServiceIncome: number
  newOrders: number
}

const Dashboard: FC<Props> = ({
  isOpen,
  activeService,
  activeCarServiceIncome,
  newOrders,
}: Props) => {
  const [activeOrders] = useQuery(getServiceOrdersCount, {
    where: { carServiceId: activeService, status: "ACTIVE" },
  })
  const [doneOrders] = useQuery(getServiceOrdersCount, {
    where: { carServiceId: activeService, status: "DONE" },
  })
  const [cancelledOrders] = useQuery(getServiceOrdersCount, {
    where: { carServiceId: activeService, status: "CANCELLED" },
  })
  const [allOrders] = useQuery(getServiceOrdersCount, {
    where: { carServiceId: activeService },
  })
  const panelOrdersCount = activeOrders + doneOrders + cancelledOrders
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)
  const [todaysOrdersCount] = useQuery(getServiceOrdersCount, {
    where: {
      carServiceId: activeService,
      AND: [
        {
          startsAt: {
            gte: todayStart,
          },
        },
        {
          startsAt: {
            lte: todayEnd,
          },
        },
      ],
    },
  })
  const [todaysOrders] = useQuery(getServiceOrders, {
    where: {
      carServiceId: activeService,
      NOT: [
        {
          status: "NEW",
        },
      ],
      AND: [
        {
          startsAt: {
            gte: todayStart,
          },
        },
        {
          startsAt: {
            lte: todayEnd,
          },
        },
      ],
    },
    select: {
      id: true,
      clientId: true,
      employeeId: true,
      startsAt: true,
      status: true,
      employee: { select: { name: true, surname: true } },
      client: { select: { name: true, surname: true } },
      service: { select: { name: true, price: true, durationTo: true, durationFrom: true } },
    },
    orderBy: {
      startsAt: "asc",
    },
  })
  // const [serviceOrders] = useQuery(
  //   getServiceOrders,
  //   {
  //     where: { carServiceId: activeService },
  //     select: {
  //       id: true,
  //       clientId: true,
  //       employeeId: true,
  //       startsAt: true,
  //       status: true,
  //       employee: { select: { name: true, surname: true } },
  //       client: { select: { name: true, surname: true } },
  //       service: { select: { name: true, price: true, duration: true } },
  //     },
  //   },
  //   {
  //     refetchInterval: 60000,
  //   }
  // )
  const [allReviews] = useQuery(getServiceReviewsCount, {
    where: { carServiceId: activeService },
  })
  const [serviceRating] = useQuery(getServiceRating, {
    _avg: { rating: true },
    where: { carServiceId: activeService },
  })
  const [serviceIncome] = useQuery(getServiceIncome, {
    _sum: { price: true },
    where: { carServiceId: activeService, status: "DONE" },
  })
  const backgroundActive = panelOrdersCount
    ? `linear-gradient(90deg, #6500E6 ${(activeOrders / panelOrdersCount) * 100}%, #E5E5E5 ${
        (activeOrders / panelOrdersCount) * 100
      }%)`
    : "#E5E5E5"
  const backgroundDone = panelOrdersCount
    ? `linear-gradient(90deg, #9B4CFF ${(doneOrders / panelOrdersCount) * 100}%, #E5E5E5 ${
        (doneOrders / panelOrdersCount) * 100
      }%)`
    : "#E5E5E5"
  const backgroundCancelled = panelOrdersCount
    ? `linear-gradient(90deg, #46009F ${(cancelledOrders / panelOrdersCount) * 100}%, #E5E5E5 ${
        (cancelledOrders / panelOrdersCount) * 100
      }%)`
    : "#E5E5E5"
  const dataDoughnut = {
    labels: ["Aktyvūs užsakymai", "Atlikti užsakymai", "Atmesti užsakymai"],
    datasets: [
      {
        data:
          activeOrders || doneOrders || cancelledOrders
            ? [activeOrders, doneOrders, cancelledOrders]
            : [1],
        backgroundColor:
          activeOrders || doneOrders || cancelledOrders
            ? ["#6500E6", "#9B4CFF", "#46009F"]
            : ["#E5E5E5"],
      },
    ],
  }
  const dataLine = () => {
    return {
      labels: [
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
      ],
      datasets: [
        {
          data: [4.1, 4.03, 4.2, 4.4, 4.5, 4.52, 4.55, 4.58, 4.6, 4.51, 4.7, 4.82],
          fill: "start",
          borderWidth: 5,
          borderCapStyle: "round",
          borderJoinStyle: "round",
          backgroundColor: "rgba(101, 0, 230, 0.25)",
          borderColor: "#6500E6",
          pointRadius: 0,
        },
      ],
    }
  }

  return (
    <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
      <Heading as="h1">Suvestinė</Heading>
      <Flex justifyContent="space-between" my="30px">
        <Box
          background="#fff"
          borderRadius="10px"
          boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
          width="20%"
          py="30px"
          px="40px"
        >
          <Flex justifyContent="space-between">
            <Flex
              background="#6500E6"
              borderRadius="10px"
              width="44px"
              height="44px"
              alignItems="center"
              justifyContent="center"
              mb="15px"
            >
              <MoneyIcon boxSize={7} color="#ffffff" />
            </Flex>
            <DotsIcon boxSize={4} color="#0B132A" cursor="pointer" _hover={{ color: "#6500E6" }} />
          </Flex>
          <Text fontWeight="500" fontSize="4xl" lineHeight="1">
            {serviceIncome._sum?.price! + activeCarServiceIncome} €
          </Text>
          <Text fontSize="xl" color="#A8A8A8">
            <b>Visos</b> pajamos
          </Text>
        </Box>
        <Box
          background="#fff"
          borderRadius="10px"
          boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
          width="20%"
          py="30px"
          px="40px"
        >
          <Flex justifyContent="space-between">
            <Flex
              background="#6500E6"
              borderRadius="10px"
              width="44px"
              height="44px"
              alignItems="center"
              justifyContent="center"
              mb="15px"
            >
              <OrdersIcon boxSize={7} color="#ffffff" />
            </Flex>
            <DotsIcon boxSize={4} color="#0B132A" cursor="pointer" _hover={{ color: "#6500E6" }} />
          </Flex>
          <Text fontWeight="500" fontSize="4xl" lineHeight="1">
            {allOrders}
          </Text>
          <Text fontSize="xl" color="#A8A8A8">
            <b>Viso</b> užsakymų
          </Text>
        </Box>
        <Box
          background="#fff"
          borderRadius="10px"
          boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
          width="20%"
          py="30px"
          px="40px"
        >
          <Flex justifyContent="space-between">
            <Flex
              background="#6500E6"
              borderRadius="10px"
              width="44px"
              height="44px"
              alignItems="center"
              justifyContent="center"
              mb="15px"
            >
              <ReviewsIcon boxSize={7} color="#ffffff" />
            </Flex>
            <DotsIcon boxSize={4} color="#0B132A" cursor="pointer" _hover={{ color: "#6500E6" }} />
          </Flex>
          <Text fontWeight="500" fontSize="4xl" lineHeight="1">
            {allReviews}
          </Text>
          <Text fontSize="xl" color="#A8A8A8">
            <b>Viso</b> atsiliepimų
          </Text>
        </Box>
        <Box
          background="#fff"
          borderRadius="10px"
          boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
          width="20%"
          py="30px"
          px="40px"
        >
          <Flex justifyContent="space-between">
            <Flex
              background="#6500E6"
              borderRadius="10px"
              width="44px"
              height="44px"
              alignItems="center"
              justifyContent="center"
              mb="15px"
            >
              <RatingIcon boxSize={7} color="#ffffff" />
            </Flex>
            <DotsIcon boxSize={4} color="#0B132A" cursor="pointer" _hover={{ color: "#6500E6" }} />
          </Flex>
          <Text fontWeight="500" fontSize="4xl" lineHeight="1">
            {serviceRating._avg?.rating?.toFixed(1)}
          </Text>
          <Text fontSize="xl" color="#A8A8A8">
            <b>Vidutinis</b> įvertinimas
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" my="30px">
        <Box
          background="#fff"
          borderRadius="10px"
          boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
          width="46.67%"
          p="40px"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Flex
              alignItems="center"
              cursor="pointer"
              sx={{
                ":hover > p": {
                  color: "#6500E6",
                },
                ":hover > svg": {
                  color: "#6500E6",
                },
              }}
            >
              <Text fontSize="3xl" fontWeight="500" transition="all 0.2s">
                Užsakymai
              </Text>
              <ArrowIcon boxSize={4} transition="all 0.2s" ml="10px" />
            </Flex>
            <Tabs variant="unstyled" isFitted background="#F1F1F1" p="3px" borderRadius="10px">
              <TabList>
                <CustomTab>Metų</CustomTab>
                <CustomTab>Mėnesio</CustomTab>
                <CustomTab>Savaitės</CustomTab>
                <CustomTab>Dienos</CustomTab>
              </TabList>
            </Tabs>
          </Flex>
          <Flex
            mt="20px"
            justifyContent="space-between"
            alignItems="center"
            background={newOrders ? "#F4E3FF" : "transparent"}
            borderRadius="10px"
            p={newOrders ? "10px" : "0"}
          >
            <Flex alignItems="center">
              <Flex
                alignItems="center"
                justifyContent="center"
                width="70px"
                height="35px"
                background="#6500E6"
                borderRadius="7px"
              >
                <Text fontWeight="500" fontSize="2xl" color="#ffffff">
                  {newOrders}
                </Text>
              </Flex>
              <Text fontWeight="500" fontSize="xl" ml="20px" mr="10px">
                {newOrders === 0 || newOrders > 9
                  ? "Naujų užsakymų"
                  : newOrders === 1
                  ? "Naujas užsakymas"
                  : "Nauji užsakymai"}
              </Text>
              {newOrders > 0 && (
                <Box width="10px" height="10px" background="#6500E6" borderRadius="100%" />
              )}
            </Flex>
            <Flex
              alignItems="center"
              cursor="pointer"
              sx={{
                ":hover > p": {
                  textDecoration: "underline",
                },
              }}
            >
              <Text color="#6500E6">Peržiūrėti užsakymus</Text>
              <ArrowIcon
                boxSize={3}
                transition="all 0.2s"
                mx="10px"
                color="#6500E6"
                transform="rotate(270deg)"
              />
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" mt="20px">
            <Box borderRadius="5px" border="1px solid #EFEFEF" px="20px" py="10px" width="30%">
              <Text fontWeight="500" fontSize="3xl">
                {activeOrders}
              </Text>
              <Text color="#A8A8A8" fontSize="xl">
                <b>Aktyvių</b> užsakymų
              </Text>
            </Box>
            <Box borderRadius="5px" border="1px solid #EFEFEF" px="20px" py="10px" width="30%">
              <Text fontWeight="500" fontSize="3xl">
                {doneOrders}
              </Text>
              <Text color="#A8A8A8" fontSize="xl">
                <b>Atliktų</b> užsakymų
              </Text>
            </Box>
            <Box borderRadius="5px" border="1px solid #EFEFEF" px="20px" py="10px" width="30%">
              <Text fontWeight="500" fontSize="3xl">
                {cancelledOrders}
              </Text>
              <Text color="#A8A8A8" fontSize="xl">
                <b>Atmestų</b> užsakymų
              </Text>
            </Box>
          </Flex>
          <Flex mt="40px">
            <Box width="100px" height="100px" mr="30px">
              <Doughnut
                data={dataDoughnut}
                options={{ tooltips: { enabled: false }, hover: { mode: null } }}
                width={100}
                height={100}
                type="doughnut"
              />
            </Box>
            <Flex width="100%" direction="column" justifyContent="space-between">
              <Flex alignItems="center" justifyContent="space-between">
                <Text>
                  Aktyvūs užsakymai (
                  {panelOrdersCount ? ((activeOrders / panelOrdersCount) * 100).toFixed(1) : 0}
                  %)
                </Text>
                <Flex alignItems="center" width="70%" justifyContent="space-between">
                  <Box width="90%" height="8px" borderRadius="8px" background={backgroundActive} />
                  <Text color="#A8A8A8">{activeOrders}</Text>
                </Flex>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text>
                  Atlikti užsakymai (
                  {panelOrdersCount > 0 ? ((doneOrders / panelOrdersCount) * 100).toFixed(1) : 0}
                  %)
                </Text>
                <Flex alignItems="center" width="70%" justifyContent="space-between">
                  <Box width="90%" height="8px" borderRadius="8px" background={backgroundDone} />
                  <Text color="#A8A8A8">{doneOrders}</Text>
                </Flex>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text>
                  Atmesti užsakymai (
                  {panelOrdersCount > 0
                    ? ((cancelledOrders / panelOrdersCount) * 100).toFixed(1)
                    : 0}
                  %)
                </Text>
                <Flex alignItems="center" width="70%" justifyContent="space-between">
                  <Box
                    width="90%"
                    height="8px"
                    borderRadius="8px"
                    background={backgroundCancelled}
                  />
                  <Text color="#A8A8A8">{cancelledOrders}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Box
          background="#fff"
          borderRadius="10px"
          boxShadow="20px 20px 30px 0px rgba(0, 0, 0, 0.03)"
          width="46.67%"
          p="40px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex justifyContent="space-between" alignItems="center" mb="20px">
            <Flex
              alignItems="center"
              cursor="pointer"
              sx={{
                ":hover > p": {
                  color: "#6500E6",
                },
                ":hover > svg": {
                  color: "#6500E6",
                },
              }}
            >
              <Text fontSize="3xl" fontWeight="500" transition="all 0.2s">
                Įvertinimas
              </Text>
              <ArrowIcon boxSize={4} transition="all 0.2s" ml="10px" />
            </Flex>
            <Tabs variant="unstyled" isFitted background="#F1F1F1" p="3px" borderRadius="10px">
              <TabList>
                <CustomTab>Metų</CustomTab>
                <CustomTab>Mėnesio</CustomTab>
                <CustomTab>Savaitės</CustomTab>
                <CustomTab>Dienos</CustomTab>
              </TabList>
            </Tabs>
          </Flex>
          <Box>
            <Line
              data={dataLine}
              height={85}
              type="line"
              options={{
                tooltips: { enabled: false },
                hover: { mode: null },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      gridLines: {
                        lineWidth: 0,
                        zeroLineWidth: 0,
                        zeroLineColor: "rgba(255, 255, 255, 0)",
                      },
                      ticks: {
                        fontColor: "#0B132A",
                        fontFamily: "Rubik Medium",
                        fontSize: 14,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      display: true,
                      ticks: {
                        fontColor: "#0B132A",
                        fontFamily: "Rubik Medium",
                        fontSize: 14,
                        maxTicksLimit: 6,
                        autoSkip: true,
                      },
                    },
                  ],
                },
              }}
            />
          </Box>
        </Box>
      </Flex>
      <Box>
        <Text fontSize="3xl" fontWeight="500" mb="15px">
          Šiandienos tvarkaraštis
        </Text>
        {todaysOrdersCount ? (
          <Table
            mb="70px"
            variant="striped"
            sx={{
              "tr:nth-child(even)": {
                background: "#F1F1F1",
              },
              th: {
                background: "#E5E5E5",
              },
            }}
          >
            <Thead>
              <Tr height="50px" borderRadius="10px">
                <Th
                  color="black"
                  fontWeight="600"
                  fontSize="xl"
                  textTransform="none"
                  letterSpacing="normal"
                  border="none"
                  borderTopLeftRadius="10px"
                  borderBottomLeftRadius="10px"
                >
                  Laikas
                </Th>
                <Th
                  color="black"
                  fontWeight="600"
                  fontSize="xl"
                  textTransform="none"
                  letterSpacing="normal"
                  border="none"
                >
                  Paslauga
                </Th>
                <Th
                  color="black"
                  fontWeight="600"
                  fontSize="xl"
                  textTransform="none"
                  letterSpacing="normal"
                  border="none"
                >
                  Trukmė
                </Th>
                <Th
                  color="black"
                  fontWeight="600"
                  fontSize="xl"
                  textTransform="none"
                  letterSpacing="normal"
                  border="none"
                >
                  Klientas
                </Th>
                <Th
                  color="black"
                  fontWeight="600"
                  fontSize="xl"
                  textTransform="none"
                  letterSpacing="normal"
                  border="none"
                >
                  Darbuotojas
                </Th>
                <Th
                  color="black"
                  fontWeight="600"
                  fontSize="xl"
                  textTransform="none"
                  letterSpacing="normal"
                  border="none"
                >
                  Kaina
                </Th>
                <Th
                  color="black"
                  fontWeight="600"
                  fontSize="xl"
                  textTransform="none"
                  letterSpacing="normal"
                  border="none"
                  borderTopRightRadius="10px"
                  borderBottomRightRadius="10px"
                >
                  Statusas
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {todaysOrders.map((order) => (
                <OrderTableRow order={order} key={order.id} />
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text mb="70px">Šiandien užsakymų nėra</Text>
        )}
      </Box>
    </Box>
  )
}

export default Dashboard
