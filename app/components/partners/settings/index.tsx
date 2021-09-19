import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import { TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { Textarea } from "@chakra-ui/textarea"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import CustomTabSettings from "./../customTab/CustomTabSettings"
import ImageUploading from "react-images-uploading"
import ImageIcon from "./../icons/ImageIcon"
import { Image, useQuery } from "blitz"
import { Button } from "@chakra-ui/button"
import updateServiceAvatar from "app/partners/mutations/updateServiceAvatar"
import NotificationsIcon from "./../icons/NotificationsIcon"
import InfoIcon from "./../icons/InfoIcon"
import EmployeesIcon from "./../icons/EmployeesIcon"
import SubscriptionIcon from "./../icons/SubscriptionIcon"
import ContactsIcon from "./../icons/ContactsIcon"
import { Avatar } from "@chakra-ui/avatar"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import PlusIcon from "./../icons/PlusIcon"
import DropHereIcon from "./../icons/DropHereIcon"
import { useToast } from "@chakra-ui/toast"
import WarningToast from "../../index/toast/WarningToast"
import sha1 from "sha1"
import updateServiceInfo from "app/partners/mutations/updateServiceInfo"
import SuccessToast from "../../index/toast/SuccessToast"
import checkServiceUrl from "app/partners/mutations/checkServiceUrl"
import createServiceImages from "app/partners/mutations/createServiceImages"
import updateServiceImages from "app/partners/mutations/updateServiceImages"
import getServiceImages from "app/partners/queries/getServiceImages"
import deleteServiceImages from "app/partners/mutations/deleteServiceImages"
import OtherIcon from "./../icons/OtherIcon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table"
import EditIcon from "./../icons/EditIcon"
import DeleteIcon from "./../icons/DeleteIcon"
import AddIcon from "./../icons/AddIcon"
import getEmployees from "app/partners/queries/getEmployees"
import { useDisclosure } from "@chakra-ui/hooks"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import createEmployee from "app/partners/mutations/createEmployee"
import deleteEmployee from "app/partners/mutations/deleteEmployee"
import updateEmployee from "app/partners/mutations/updateEmployee"
import { CircularProgress } from "@chakra-ui/progress"
import updateServiceAddress from "app/partners/mutations/updateServiceAddress"
import MapGL, { FlyToInterpolator, Marker } from "react-map-gl"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import Geocoder from "react-map-gl-geocoder"

type Props = {
  isMenuOpen: boolean
  activeService: number
  avatarUrl: string
  refetchOther: () => void
  url: string
  name: string
  description: string
  plan: string
  email: string
  phone: string
  city: string
  street: string
  house: string
  latitude: number
  longitude: number
}

const Pin = (props) => {
  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`
  const pinStyle = {
    fill: "#6500e6",
    stroke: "none",
  }
  const { size = 20 } = props
  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  )
}
const Map = ({ address, changes, onChanges, onAddressChange, city, street, house }) => {
  const handleChanges = useCallback(() => {
    changes.splice(6, 1, true)
    onChanges(changes)
  }, [onChanges])
  const handleAddressChange = useCallback(
    (newAddress) => {
      onAddressChange(newAddress)
    },
    [onAddressChange]
  )
  const [viewport, setViewport] = useState({
    latitude: address.latitude,
    longitude: address.longitude,
    zoom:
      address.latitude == 55.32953572348781 && address.longitude == 23.905501899207678 ? 6.5 : 18,
    bearing: 0,
    pitch: 0,
  })
  const [marker, setMarker] = useState({
    latitude: address.latitude,
    longitude: address.longitude,
  })
  const [addressTemp, setAddressTemp] = useState({
    city: "",
    street: "",
    house: "",
    latitude: marker.latitude,
    longitude: marker.longitude,
  })
  const onMarkerDragEnd = useCallback(
    (event) => {
      setMarker({
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      })
      handleChanges()
      if (addressTemp.city.length) {
        handleAddressChange({
          ...addressTemp,
          latitude: event.lngLat[1],
          longitude: event.lngLat[0],
        })
      } else {
        handleAddressChange({
          ...address,
          latitude: event.lngLat[1],
          longitude: event.lngLat[0],
        })
      }
    },
    [addressTemp]
  )
  const mapRef = useRef(null)
  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport)
    handleChanges()
  }, [])
  useEffect(() => {
    handleViewportChange({
      latitude: addressTemp.latitude,
      longitude: addressTemp.longitude,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      zoom: 18,
    })
    setMarker({
      latitude: addressTemp.latitude,
      longitude: addressTemp.longitude,
    })
  }, [addressTemp])
  const handleQuery = useCallback((result) => {
    handleChanges()
    const tempAddress = result.result.place_name.split(/[\s, ]+/)
    handleAddressChange({
      city:
        tempAddress[
          tempAddress.findIndex(
            (string) => parseInt(string) >= 10000 && parseInt(string) <= 99999
          ) - 1
        ],
      street:
        tempAddress[tempAddress.findIndex((string) => string === "g." || string === "G.") - 1] +
        " g.",
      house: tempAddress[2].match(/^\d/) ? tempAddress[2] : "",
      latitude: result.result.center[1],
      longitude: result.result.center[0],
    })
    setAddressTemp({
      city:
        tempAddress[
          tempAddress.findIndex(
            (string) => parseInt(string) >= 10000 && parseInt(string) <= 99999
          ) - 1
        ],
      street:
        tempAddress[tempAddress.findIndex((string) => string === "g." || string === "G.") - 1] +
        " g.",
      house: tempAddress[2].match(/^\d/) ? tempAddress[2] : "",
      latitude: result.result.center[1],
      longitude: result.result.center[0],
    })
  }, [])
  const handleResult = useCallback(
    (result) => {
      return handleQuery(result)
    },
    [handleQuery]
  )
  const handleInitilisation = useCallback((event) => {
    setTimeout(() => {
      event._inputEl.parentElement.children[2].children[0].style.display = "none"
    }, 500)
  }, [])
  const handleInit = useCallback(
    (event) => {
      return handleInitilisation(event)
    },
    [handleInitilisation]
  )
  return (
    <Box height="300px">
      <MapGL
        {...viewport}
        ref={mapRef}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/y3llow/ckodau4t60mk417ol99dbzqmi"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.BLITZ_PUBLIC_MAPBOX_TOKEN}
        minZoom={6}
        attributionControl={false}
      >
        <Geocoder
          mapRef={mapRef}
          mapboxApiAccessToken={process.env.BLITZ_PUBLIC_MAPBOX_TOKEN}
          position="top-left"
          marker={false}
          reverseGeocode={true}
          onResult={handleResult}
          onInit={handleInit}
          limit={3}
          language="lt"
          countries="lt"
          zoom={18}
          placeholder="Įveskite adresą"
          minLength={4}
          inputValue={
            street.length && city.length ? `${street} ${house}, ${city}` : city.length ? city : ""
          }
        />
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>
      </MapGL>
    </Box>
  )
}
const Settings: FC<Props> = ({
  isMenuOpen,
  activeService,
  avatarUrl,
  refetchOther,
  url,
  name,
  description,
  plan,
  email,
  phone,
  city,
  street,
  house,
  latitude,
  longitude,
}: Props) => {
  const [isMapLoading, setIsMapLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsMapLoading(false)
    }, 7000)
  }, [])
  const [address, setAddress] = useState({
    city: city,
    street: street,
    house: house,
    latitude: latitude != null ? latitude : 55.32953572348781,
    longitude: longitude != null ? longitude : 23.905501899207678,
  })
  const [image, setImage] = useState([])
  const onChange = (imageList) => {
    setImage(imageList)
  }
  const [uploadState, setUploadState] = useState("NONE")
  const changesArray = [false, false, false, false, false, false, false]
  const [changes, setChanges] = useState(changesArray)
  const uploadImage = async (e) => {
    setUploadState("UPLOADING")
    const files = e[0].file
    const data = new FormData()
    const apiSecret = process.env.BLITZ_PUBLIC_CLOUDINARY_API_SECRET
    const timestamp = Math.round(new Date().getTime() / 1000)
    const preset = process.env.BLITZ_PUBLIC_CLOUDINARY_PRESET
    const payloadToSign = `public_id=${activeService}&timestamp=${timestamp}&upload_preset=${preset}${apiSecret}`
    const signature = sha1(payloadToSign)
    data.append("file", files)
    data.append("api_key", process.env.BLITZ_PUBLIC_CLOUDINARY_API_KEY!)
    data.append("public_id", activeService.toString())
    data.append("timestamp", timestamp.toString())
    data.append("signature", signature)
    data.append("upload_preset", preset!)
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.BLITZ_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
    await res.json().then(async (file) => {
      await updateServiceAvatar({
        where: {
          id: activeService,
        },
        data: {
          avatarUrl: file.secure_url,
        },
      })
      setUploadState("UPLOADED")
      refetchOther()
    })
  }
  const maxImages = plan === "PREMIUM" ? 6 : 3
  const toast = useToast()
  const toastIdRef = useRef<any>()
  const [serviceActiveImages] = useQuery(getServiceImages, {
    where: { carServiceId: activeService },
  })
  const getItems = (count, start = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `${k + start}-${new Date().getTime()}-item`,
      content: (
        <Flex
          width="100px"
          height="100px"
          border="1px solid #E0E3EF"
          borderRadius="5px"
          alignItems="center"
          justifyContent="center"
          sx={{
            ":hover > div svg": {
              color: "#0B132A",
            },
            ":hover > div": {
              background: "#E3E3E3",
            },
          }}
        >
          <Flex
            width="32px"
            height="32px"
            background="#EFF0F3"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            transition="all 0.2s"
          >
            <PlusIcon boxSize={3} transition="all 0.2s" color="#787E97" />
          </Flex>
        </Flex>
      ),
      data_url: "",
      file: new File([""], "item", { type: "image/png" }),
    }))
  const getImageAsFile = async (fileUrl) => {
    return new Promise(async (resolve) => {
      await fetch(fileUrl)
        .then((r) => r.blob())
        .then((blobFile) => resolve(new File([blobFile], "file", { type: `image/png` })))
    })
  }
  const getImageAsBlob = (fileUrl) => {
    return new Promise(async (resolve, reject) => {
      await fetch(fileUrl)
        .then((r) => r.blob())
        .then((blobFile) => {
          const reader = new FileReader()
          reader.onerror = reject
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(blobFile)
        })
    })
  }
  const getFill = new Promise(async (resolve) => {
    const fillImages = new Array()
    await Promise.all(
      serviceActiveImages.map(async (file) => {
        const tempUrl = await getImageAsBlob(file.imageUrl)
        const tempFile = await getImageAsFile(file.imageUrl)
        fillImages.push({
          data_url: tempUrl,
          file: tempFile,
        })
      })
    ).then(() => {
      resolve(fillImages)
    })
  })
  const [imagesLoading, setImagesLoading] = useState(true)
  const [finalImagesLoading, setFinalImagesLoading] = useState(true)
  useEffect(() => {
    getFill.then((x: any) => {
      setImages(x)
      const tempImg = Array.from({ length: x.length }, (v, k) => k).map((k) => ({
        id: `${k}-${new Date().getTime()}`,
        content: (
          <Flex
            width="100px"
            height="100px"
            borderRadius="5px"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={x[k]["data_url"]} width="100px" height="100px" objectFit="cover" />
          </Flex>
        ),
        data_url: x[k]["data_url"],
        file: x[k].file,
      }))
      const fill = maxImages - x.length
      const fillItems = getItems(fill, x.length)
      const finalList = tempImg.concat(fillItems)
      setImagesState({ items: finalList })
      setTimeout(() => {
        setImagesLoading(false)
        setTimeout(() => {
          setFinalImagesLoading(false)
        }, 2000)
      }, 2000)
    })
  }, [imagesLoading])
  const fillOldImagesState: any = Array.from(serviceActiveImages, (v) => v).map((v, i) => ({
    id: `${v.carServiceImageId}-${new Date().getTime()}`,
    content: (
      <Flex
        width="100px"
        height="100px"
        borderRadius="5px"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={v.imageUrl} width="100px" height="100px" objectFit="cover" />
      </Flex>
    ),
    data_url: getImageAsBlob(v.imageUrl),
    file: getImageAsFile(v.imageUrl),
  }))
  const fillNewImagesState: any = getItems(
    maxImages - serviceActiveImages.length,
    serviceActiveImages.length
  )
  const fillImagesState = fillOldImagesState.concat(fillNewImagesState)
  const [images, setImages] = useState([])
  const onChanges = (imageList) => {
    const tempImg = Array.from({ length: imageList.length }, (v, k) => k).map((k) => ({
      id: `${k}-${new Date().getTime()}`,
      content: (
        <Flex
          width="100px"
          height="100px"
          borderRadius="5px"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={imageList[k]["data_url"]} width="100px" height="100px" objectFit="cover" />
        </Flex>
      ),
      data_url: imageList[k]["data_url"],
      file: imageList[k].file,
    }))
    const fill = maxImages - imageList.length
    const fillItems = getItems(fill, imageList.length)
    const finalList = tempImg.concat(fillItems)
    changesArray.splice(3, 1, true)
    setChanges(changesArray)
    setImagesState({ items: finalList })
    setImages(imageList)
  }
  const onErrors = (error) => {
    if (error.maxNumber) {
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <WarningToast
            heading="Kažkas netaip!"
            text={`Jūs viršijote leistiną nuotraukų kiekį. Maksimalus jūsų planui galimas įkelti nuotraukų kiekis: ${maxImages}`}
            id={toastIdRef.current}
          />
        ),
      })
    }
  }
  const reorder = (list, startIndex, endIndex) => {
    const result: any = Array.from(list)
    if (!result[startIndex].id.endsWith("item") && !result[endIndex].id.endsWith("item")) {
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
    }
    return result
  }
  const [imagesState, setImagesState] = useState<any>({
    items: fillImagesState.sort((a, b) => a.id[0] - b.id[0]),
  })
  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = reorder(imagesState.items, result.source.index, result.destination.index)
    setImagesState({ items })
  }
  const format = /[a-zA-Z0-9-_]/
  const formatUrlFinal = /^(?!-.*$)(?!_.*$)([A-Za-z0-9-_](?!\-$)(?!\_$))+$/gm
  const [serviceName, setServiceName] = useState(name)
  const onServiceNameChange = (value) => {
    changesArray.splice(0, 1, true)
    setChanges(changesArray)
    setServiceName(value)
  }
  const [serviceUrl, setServiceUrl] = useState(url)
  const [isInvalidUrl, setIsInvalidUrl] = useState(false)
  const onServiceUrlChange = (value) => {
    if (value.length) {
      if (!format.test(value.charAt(value.length - 1))) {
        setIsInvalidUrl(true)
        toastIdRef.current = toast({
          duration: 3000,
          render: () => (
            <WarningToast
              heading="Kažkas netaip!"
              text={`Simbolis, kurį bandėte panaudoti, yra neleistinas.`}
              id={toastIdRef.current}
            />
          ),
        })
        setTimeout(() => {
          setIsInvalidUrl(false)
        }, 3000)
      } else {
        changesArray.splice(1, 1, true)
        setChanges(changesArray)
        setServiceUrl(value)
        setIsInvalidUrl(false)
      }
    } else {
      changesArray.splice(1, 1, true)
      setChanges(changesArray)
      setServiceUrl(value)
      setIsInvalidUrl(false)
    }
  }
  const [serviceDescription, setServiceDescription] = useState(description)
  const onServiceDescriptionChange = (value) => {
    changesArray.splice(2, 1, true)
    setChanges(changesArray)
    setServiceDescription(value)
  }
  const [serviceEmail, setServiceEmail] = useState(email)
  const onServiceEmailChange = (value) => {
    changesArray.splice(4, 1, true)
    setChanges(changesArray)
    setServiceEmail(value)
  }
  const [servicePhone, setServicePhone] = useState(phone)
  const onServicePhoneChange = (value) => {
    changesArray.splice(5, 1, true)
    setChanges(changesArray)
    setServicePhone(value)
  }
  const [employeeName, setEmployeeName] = useState("")
  const onEmployeeNameChange = (value) => {
    setEmployeeName(value)
  }
  const [employeeSurname, setEmployeeSurname] = useState("")
  const onEmployeeSurnameChange = (value) => {
    setEmployeeSurname(value)
  }
  const [employeePosition, setEmployeePosition] = useState("")
  const onEmployeePositionChange = (value) => {
    if (value.length) {
      var firstLetter = value[0]
      if (isNaN(firstLetter)) {
        if (firstLetter.toUpperCase() + value.substring(1) !== "Savininkas") {
          setEmployeePosition(value)
        } else {
          toastIdRef.current = toast({
            duration: 5000,
            render: () => (
              <WarningToast
                heading="Kažkas netaip!"
                text={`Pridėti papildomą savininką draudžiama. Jei norite pakeisti savininką, susisiekite su mumis per pagalbos centrą arba pagalba@wheelter.lt`}
                id={toastIdRef.current}
              />
            ),
          })
        }
      } else {
        toastIdRef.current = toast({
          duration: 5000,
          render: () => (
            <WarningToast
              heading="Kažkas netaip!"
              text={`Pareigos negali prasidėti skaitmeniu.`}
              id={toastIdRef.current}
            />
          ),
        })
      }
    } else {
      setEmployeePosition(value)
    }
  }
  const uploadImages = (e) => {
    return new Promise(async (resolve) => {
      const oldImages = Array.from(serviceActiveImages, (v) => v).map((v) => v.carServiceImageId)
      await Promise.all(
        e.map(async (element, i) => {
          const files = element.file
          if (!files.size) {
            serviceActiveImages.forEach(async (element) => {
              if (element.carServiceImageId === i) {
                const data = new FormData()
                const apiSecret = process.env.BLITZ_PUBLIC_CLOUDINARY_API_SECRET
                const timestamp = Math.round(new Date().getTime() / 1000)
                const payloadToSign = `public_id=images/carServices/${activeService}_${i}&timestamp=${timestamp}${apiSecret}`
                const signature = sha1(payloadToSign)
                data.append("api_key", process.env.BLITZ_PUBLIC_CLOUDINARY_API_KEY!)
                data.append("public_id", "images/carServices/" + activeService + "_" + i)
                data.append("timestamp", timestamp.toString())
                data.append("signature", signature)
                const res = await fetch(
                  `https://api.cloudinary.com/v1_1/${process.env.BLITZ_PUBLIC_CLOUDINARY_CLOUDNAME}/image/destroy`,
                  {
                    method: "POST",
                    body: data,
                  }
                )
                await res.json().then(async () => {
                  await deleteServiceImages({
                    where: {
                      carServiceImageId: i,
                      carServiceId: activeService,
                    },
                  })
                })
              } else return
            })
          } else {
            const data = new FormData()
            const apiSecret = process.env.BLITZ_PUBLIC_CLOUDINARY_API_SECRET
            const timestamp = Math.round(new Date().getTime() / 1000)
            const preset = process.env.BLITZ_PUBLIC_CLOUDINARY_PRESET_IMAGES
            const payloadToSign = `public_id=${activeService}_${i}&timestamp=${timestamp}&upload_preset=${preset}${apiSecret}`
            const signature = sha1(payloadToSign)
            data.append("file", files)
            data.append("api_key", process.env.BLITZ_PUBLIC_CLOUDINARY_API_KEY!)
            data.append("public_id", activeService + "_" + i)
            data.append("timestamp", timestamp.toString())
            data.append("signature", signature)
            data.append("upload_preset", preset!)
            const res = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.BLITZ_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
              {
                method: "POST",
                body: data,
              }
            )
            await res.json().then(async (file) => {
              var found = false
              oldImages.forEach(async (element) => {
                if (element === i) {
                  found = true
                  await updateServiceImages({
                    where: {
                      carServiceImageId: i,
                      carServiceId: activeService,
                    },
                    data: {
                      imageUrl: file.secure_url,
                    },
                  })
                } else return
              })
              if (!found) {
                await createServiceImages({
                  data: {
                    imageUrl: file.secure_url,
                    carServiceId: activeService,
                    carServiceImageId: i,
                  },
                })
              }
            })
          }
        })
      ).then(() => {
        resolve(1)
      })
    })
  }
  const [changing, setChanging] = useState(false)
  const onChanging = async () => {
    const isChanged = changes.includes(true)
    if (isChanged) {
      const urlCount = await checkServiceUrl({
        where: {
          url: serviceUrl,
        },
      })
      setChanging(true)
      if (!formatUrlFinal.test(serviceUrl)) {
        setIsInvalidUrl(true)
        toastIdRef.current = toast({
          duration: 3000,
          render: () => (
            <WarningToast
              heading="Kažkas netaip!"
              text={`Nuoroda negali prasidėti ir/ar baigtis simboliu.`}
              id={toastIdRef.current}
            />
          ),
        })
        setTimeout(() => {
          setIsInvalidUrl(false)
        }, 3000)
        setChanging(false)
      } else if (urlCount && serviceUrl !== url) {
        setIsInvalidUrl(true)
        toastIdRef.current = toast({
          duration: 5000,
          render: () => (
            <WarningToast
              heading="Kažkas netaip!"
              text={`Tokia partnerio profilio nuoroda jau egzistuoja. Pamėginkite kitą nuorodą.`}
              id={toastIdRef.current}
            />
          ),
        })
        setChanging(false)
      } else {
        if (changes[3]) {
          await uploadImages(imagesState.items).then(async () => {
            await updateServiceInfo({
              where: {
                id: activeService,
              },
              data: {
                url: serviceUrl,
                name: serviceName,
                description: serviceDescription,
                email: serviceEmail,
                phone: servicePhone,
              },
            })
            await updateServiceAddress({
              where: {
                carServiceId: activeService,
              },
              data: {
                city: address.city,
                street: address.street,
                house: address.house,
                coordinateX: address.longitude,
                coordinateY: address.latitude,
              },
            })
            refetchOther()
            toastIdRef.current = toast({
              duration: 5000,
              render: () => (
                <SuccessToast
                  heading="Pavyko!"
                  text={`Jūsų partnerio profilio puslapio informacija sėkmingai atnaujinta.`}
                  id={toastIdRef.current}
                />
              ),
            })
            setChanging(false)
          })
        } else {
          await updateServiceInfo({
            where: {
              id: activeService,
            },
            data: {
              url: serviceUrl,
              name: serviceName,
              description: serviceDescription,
              email: serviceEmail,
              phone: servicePhone,
            },
          })
          await updateServiceAddress({
            where: {
              carServiceId: activeService,
            },
            data: {
              city: address.city,
              street: address.street,
              house: address.house,
              coordinateX: address.longitude,
              coordinateY: address.latitude,
            },
          })
          refetchOther()
          toastIdRef.current = toast({
            duration: 5000,
            render: () => (
              <SuccessToast
                heading="Pavyko!"
                text={`Jūsų partnerio profilio puslapio informacija sėkmingai atnaujinta.`}
                id={toastIdRef.current}
              />
            ),
          })
          setChanging(false)
        }
      }
    } else {
      setChanging(true)
      refetchOther()
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <SuccessToast
            heading="Pavyko!"
            text={`Jūsų partnerio profilio puslapio informacija sėkmingai atnaujinta.`}
            id={toastIdRef.current}
          />
        ),
      })
      setChanging(false)
    }
    changesArray.splice(0, 7, false, false, false, false, false, false, false)
    setChanges(changesArray)
  }
  const [employees, { refetch }] = useQuery(getEmployees, activeService)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isCreatingNewEmployee, setIsCreatingNewEmployee] = useState(false)
  const [updatingEmployeeId, setUpdatingEmployeeId] = useState(-1)
  const onCreateEmployee = async () => {
    if (!employeeName.length || !employeePosition.length) {
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <WarningToast
            heading="Kažkas netaip!"
            text={`Norėdami pridėti naują darbuotoją, užpildykite visus privalomus laukus.`}
            id={toastIdRef.current}
          />
        ),
      })
    } else {
      await createEmployee({
        data: {
          carServiceId: activeService,
          name: employeeName,
          surname: employeeSurname,
          position: employeePosition,
        },
      })
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <SuccessToast
            heading="Pavyko!"
            text={`Darbuotojas sėkmingai pridėtas.`}
            id={toastIdRef.current}
          />
        ),
      })
      refetch()
      onClose()
      setEmployeeName("")
      setEmployeeSurname("")
      setEmployeePosition("")
      setIsCreatingNewEmployee(false)
    }
  }
  const onUpdateEmployee = async (employeeId) => {
    if (!employeeName.length || !employeePosition.length) {
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <WarningToast
            heading="Kažkas netaip!"
            text={`Norėdami pakeisti darbuotojo informaciją, užpildykite visus privalomus laukus.`}
            id={toastIdRef.current}
          />
        ),
      })
    } else {
      await updateEmployee({
        where: {
          id: employeeId,
        },
        data: {
          name: employeeName,
          surname: employeeSurname,
          position: employeePosition,
        },
      })
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <SuccessToast
            heading="Pavyko!"
            text={`Darbuotojo informacija sėkmingai atnaujinta.`}
            id={toastIdRef.current}
          />
        ),
      })
      refetch()
      onClose()
      setEmployeeName("")
      setEmployeeSurname("")
      setEmployeePosition("")
      setIsCreatingNewEmployee(false)
    }
  }
  return (
    <Box mr="70px" ml={isMenuOpen ? "370px" : "170px"} transition="all 0.2s">
      <Heading as="h1">Nustatymai</Heading>
      <Box mt="30px">
        <Tabs variant="unstyled">
          <TabList width="100%" maxWidth="1920px" minWidth="1350px" justifyContent="space-between">
            <CustomTabSettings
              icon={<InfoIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
            >
              Pagrindinė informacija
            </CustomTabSettings>
            <CustomTabSettings
              icon={<EmployeesIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
            >
              Darbuotojai
            </CustomTabSettings>
            <CustomTabSettings
              icon={<NotificationsIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
            >
              Pranešimų nustatymai
            </CustomTabSettings>
            <CustomTabSettings
              icon={<SubscriptionIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
            >
              Prenumerata
            </CustomTabSettings>
            <CustomTabSettings
              icon={<ContactsIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
            >
              Kontaktinė informacija
            </CustomTabSettings>
            <CustomTabSettings
              icon={<OtherIcon boxSize={4} transition="all 0.2s" mr={2} color="#787E97" />}
            >
              Kiti nustatymai
            </CustomTabSettings>
          </TabList>
          <TabPanels>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex justifyContent="space-between" width="100%" maxWidth="1920px" minWidth="1350px">
                <Box width="450px">
                  <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
                    Pavadinimas
                  </Heading>
                  <Text color="#787E97">
                    Pakeiskite savo pavadinimą ir redaguokite nuorodą, per kurią jus galės pasiekti
                    būsimi klientai
                  </Text>
                </Box>
                <Box width="700px">
                  <Input
                    placeholder="Pavadinimas"
                    borderRadius="5px"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#E0E3EF"
                    mb="20px"
                    value={serviceName}
                    onChange={(e) => onServiceNameChange(e.target.value)}
                    focusBorderColor="brand.500"
                  />
                  <InputGroup>
                    <InputLeftAddon
                      color="#787E97"
                      background="#EFF0F3"
                      borderRadius="5px"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="#E0E3EF"
                    >
                      wheelter.lt/partneris/
                    </InputLeftAddon>
                    <Input
                      placeholder="pavadinimas"
                      borderRadius="5px"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="#E0E3EF"
                      value={serviceUrl}
                      onChange={(e) => onServiceUrlChange(e.target.value)}
                      isInvalid={isInvalidUrl}
                      focusBorderColor={isInvalidUrl ? "red" : "brand.500"}
                    />
                  </InputGroup>
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex justifyContent="space-between" width="100%" maxWidth="1920px" minWidth="1350px">
                <Box width="450px">
                  <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
                    Aprašymas
                  </Heading>
                  <Text color="#787E97">
                    Pakeiskite savo aprašymą, kad kuo tiksliau nupasakotumėte savo būsimiems
                    klientams, kokias paslaugas teikiate
                  </Text>
                </Box>
                <Box width="700px">
                  <Textarea
                    placeholder="Aprašymas"
                    resize="none"
                    height="200px"
                    borderRadius="5px"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#E0E3EF"
                    value={serviceDescription}
                    onChange={(e) => onServiceDescriptionChange(e.target.value)}
                    focusBorderColor="brand.500"
                    whiteSpace="pre-wrap"
                  />
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex justifyContent="space-between" width="100%" maxWidth="1920px" minWidth="1350px">
                <Box width="450px">
                  <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
                    Profilio nuotrauka
                  </Heading>
                  <Text color="#787E97">
                    Pakeiskite savo profilio nuotrauką, kuri bus vaizduojama jūsų partnerio profilio
                    puslapyje
                  </Text>
                  <Text color="#787E97" fontSize="sm" mt="10px">
                    Profilio nuotraukos gairės:
                  </Text>
                  <UnorderedList>
                    <ListItem color="#787E97" fontSize="sm">
                      Pločio ir aukščio santykis privalo būti 1:1
                    </ListItem>
                    <ListItem color="#787E97" fontSize="sm">
                      Tinkami formatai: .jpg, .jpeg, .png, .gif, .tif, .tiff
                    </ListItem>
                    <ListItem color="#787E97" fontSize="sm">
                      Rekomenduojama, kad profilio nuotraukos plotis ir aukštis būtų nemažesni nei
                      200px
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box width="700px">
                  <ImageUploading
                    value={image}
                    onChange={onChange}
                    dataURLKey="data_url"
                    resolutionType="ratio"
                    resolutionWidth={300}
                    resolutionHeight={300}
                    acceptType={["jpg", "jpeg", "png", "gif", "tif", "tiff"]}
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageUpdate,
                      onImageRemoveAll,
                      isDragging,
                      dragProps,
                      errors,
                    }) => (
                      <Flex justifyContent="space-between">
                        <Flex direction="column" justifyContent="center">
                          {uploadState === "UPLOADING" ? (
                            <CircularProgress isIndeterminate color="#6500E6" />
                          ) : (
                            <Avatar
                              size="2xl"
                              name={name}
                              src={avatarUrl ? avatarUrl : ""}
                              transition="all 0.2s"
                            />
                          )}
                          {image.length > 0 && uploadState !== "UPLOADING" && (
                            <Button
                              background="#EFF0F3"
                              _hover={{ background: "#E0E3EF" }}
                              width="100px"
                              mt="10px"
                              onClick={async () => {
                                await uploadImage(imageList)
                                onImageRemoveAll
                                setImage([])
                                setUploadState("NONE")
                              }}
                            >
                              Pakeisti
                            </Button>
                          )}
                        </Flex>
                        {image.length ? (
                          imageList.map((img, index) => (
                            <Flex
                              borderRadius="5px"
                              borderWidth="1px"
                              borderStyle="solid"
                              borderColor="#E0E3EF"
                              width="500px"
                              height="250px"
                              alignItems="center"
                              justifyContent="center"
                              direction="column"
                              py="20px"
                              cursor="pointer"
                              onClick={() => onImageUpdate(index)}
                              {...dragProps}
                              key={index}
                            >
                              <img src={img["data_url"]} width="150px" />
                              {errors?.resolution ? (
                                <Text
                                  color="#787E97"
                                  fontSize="sm"
                                  textAlign="center"
                                  width="90%"
                                  mt="10px"
                                >
                                  Nuotrauka, kurią bandėte įkelti, yra netinkamo santykio.
                                  Pamėginkite įkelti nuotrauką, kurios plotis ir aukštis būtų
                                  vienodas (pvz.: plotis - 200px, aukštis - 200px).
                                </Text>
                              ) : isDragging ? (
                                <Text
                                  color="#787E97"
                                  fontSize="sm"
                                  textAlign="center"
                                  width="90%"
                                  mt="10px"
                                >
                                  Paleiskite tempiamas nuotraukas čia
                                </Text>
                              ) : (
                                <Text
                                  color="#787E97"
                                  fontSize="sm"
                                  textAlign="center"
                                  width="90%"
                                  mt="10px"
                                >
                                  Spauskite čia, kad pasirinktumėte kitą nuotrauką, arba nutempkite
                                  nuotrauką čia
                                </Text>
                              )}
                            </Flex>
                          ))
                        ) : (
                          <Flex
                            borderRadius="5px"
                            borderWidth="1px"
                            borderStyle="solid"
                            borderColor="#E0E3EF"
                            width="500px"
                            height="250px"
                            alignItems="center"
                            justifyContent="center"
                            direction="column"
                            py="20px"
                            cursor="pointer"
                            onClick={onImageUpload}
                            {...dragProps}
                            sx={{
                              ":hover > div svg": {
                                color: "#0B132A",
                              },
                              ":hover > div": {
                                background: "#E0E3EF",
                              },
                            }}
                          >
                            {errors?.resolution ? (
                              <Text color="#787E97" fontSize="sm" textAlign="center" width="90%">
                                Nuotrauka, kurią bandėte įkelti, yra netinkamo santykio. Pamėginkite
                                įkelti nuotrauką, kurios plotis ir aukštis būtų vienodas (pvz.:
                                plotis - 200px, aukštis - 200px).
                              </Text>
                            ) : isDragging ? (
                              <>
                                <Box
                                  background="#EFF0F3"
                                  borderRadius="full"
                                  padding="12px"
                                  mb="10px"
                                  transition="all 0.2s"
                                >
                                  <ImageIcon boxSize={6} color="#787E97" transition="all 0.2s" />
                                </Box>
                                <Text color="#787E97" fontSize="sm" textAlign="center" width="90%">
                                  Tempkite nuotraukas čia
                                </Text>
                              </>
                            ) : (
                              <>
                                <Box
                                  background="#EFF0F3"
                                  borderRadius="full"
                                  padding="12px"
                                  mb="10px"
                                  transition="all 0.2s"
                                >
                                  <ImageIcon boxSize={6} color="#787E97" transition="all 0.2s" />
                                </Box>
                                <Text color="#787E97" fontSize="sm" textAlign="center" width="90%">
                                  Spauskite čia, kad pasirinktumėte kitą nuotrauką, arba nutempkite
                                  nuotrauką čia
                                </Text>
                              </>
                            )}
                          </Flex>
                        )}
                      </Flex>
                    )}
                  </ImageUploading>
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex justifyContent="space-between" width="100%" maxWidth="1920px" minWidth="1350px">
                <Box width="450px">
                  <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
                    Nuotraukos
                  </Heading>
                  <Text color="#787E97">
                    Pridėkite nuotraukų, kad jūsų būsimi klientai žinotų, kur bus atliekamos jų
                    pasirinktos paslaugos
                  </Text>
                  <Text color="#787E97" fontSize="sm" mt="10px">
                    Nuotraukų gairės:
                  </Text>
                  <UnorderedList>
                    <ListItem color="#787E97" fontSize="sm">
                      Tinkami formatai: .jpg, .jpeg, .png, .gif, .tif, .tiff
                    </ListItem>
                    <ListItem color="#787E97" fontSize="sm">
                      Nuotraukų plotis ir aukštis privalo būti nemažesni nei 500px
                    </ListItem>
                    <ListItem color="#787E97" fontSize="sm">
                      Maksimalus su jūsų planu galimas įkelti nuotraukų kiekis: {maxImages}
                      <br />
                      {maxImages === 3 && (
                        <Link color="brand.500">
                          Pakeiskite planą, kad galėtumėte įkelti 6 nuotraukas
                        </Link>
                      )}
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box width="696px">
                  <Flex
                    justifyContent={finalImagesLoading ? "center" : "flex-end"}
                    alignItems="center"
                  >
                    {finalImagesLoading ? (
                      <CircularProgress isIndeterminate color="#6500E6" />
                    ) : (
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                          {(provided) => (
                            <Flex
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              justifyContent="flex-end"
                            >
                              {imagesState.items.map((item, idx) => (
                                <Draggable key={item.id} draggableId={item.id} index={idx}>
                                  {(provided) => (
                                    <ImageUploading
                                      multiple
                                      value={images}
                                      onChange={onChanges}
                                      onError={onErrors}
                                      maxNumber={maxImages}
                                      dataURLKey="data_url"
                                    >
                                      {({
                                        onImageUpload,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                      }) => (
                                        <Box
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          padding={2}
                                          position="relative"
                                        >
                                          {item.data_url.length ? (
                                            <Box>
                                              {item.content}
                                              <Flex
                                                position="absolute"
                                                top="0"
                                                right="0"
                                                background="#EFF0F3"
                                                borderRadius="full"
                                                alignItems="center"
                                                justifyContent="center"
                                                width="20px"
                                                height="20px"
                                                onClick={() => {
                                                  onImageRemove(idx)
                                                }}
                                                _hover={{ background: "#E0E3EF" }}
                                                transition="all 0.2s"
                                                sx={{
                                                  ":hover > p": {
                                                    color: "#0B132A",
                                                  },
                                                }}
                                              >
                                                <Text
                                                  fontSize="sm"
                                                  color="#787E97"
                                                  transition="all 0.2s"
                                                >
                                                  x
                                                </Text>
                                              </Flex>
                                            </Box>
                                          ) : (
                                            <Box onClick={onImageUpload} {...dragProps}>
                                              <Flex
                                                width="100px"
                                                height="100px"
                                                border="1px solid #E0E3EF"
                                                borderRadius="5px"
                                                alignItems="center"
                                                justifyContent="center"
                                                sx={{
                                                  ":hover > div svg": {
                                                    color: "#0B132A",
                                                  },
                                                  ":hover > div": {
                                                    background: "#E0E3EF",
                                                  },
                                                }}
                                              >
                                                <Flex
                                                  width="32px"
                                                  height="32px"
                                                  background="#EFF0F3"
                                                  alignItems="center"
                                                  justifyContent="center"
                                                  borderRadius="full"
                                                  transition="all 0.2s"
                                                >
                                                  {isDragging ? (
                                                    <DropHereIcon
                                                      boxSize={3}
                                                      transition="all 0.2s"
                                                      color="#787E97"
                                                    />
                                                  ) : (
                                                    <PlusIcon
                                                      boxSize={3}
                                                      transition="all 0.2s"
                                                      color="#787E97"
                                                    />
                                                  )}
                                                </Flex>
                                              </Flex>
                                            </Box>
                                          )}
                                        </Box>
                                      )}
                                    </ImageUploading>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </Flex>
                          )}
                        </Droppable>
                      </DragDropContext>
                    )}
                  </Flex>
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex
                justifyContent="center"
                width="100%"
                maxWidth="1920px"
                minWidth="1400px"
                mb="70px"
              >
                <Button
                  background="#EFF0F3"
                  _hover={{ background: "#E0E3EF" }}
                  isLoading={changing}
                  width="200px"
                  onClick={onChanging}
                >
                  Tvirtinti pakeitimus
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" mt="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Table variant="unstyled" width="100%" maxWidth="1920px" minWidth="1350px">
                <Thead>
                  <Tr borderBottom="1px solid #E0E3EF">
                    <Th
                      textTransform="none"
                      fontWeight="500"
                      fontSize="md"
                      letterSpacing="0"
                      height="100px"
                    >
                      Darbuotojas
                    </Th>
                    <Th
                      textTransform="none"
                      fontWeight="500"
                      fontSize="md"
                      letterSpacing="0"
                      height="100px"
                    >
                      Pareigos
                    </Th>
                    <Th
                      textTransform="none"
                      fontWeight="500"
                      fontSize="md"
                      letterSpacing="0"
                      height="100px"
                    >
                      Atlikti darbai
                    </Th>
                    <Th
                      textTransform="none"
                      fontWeight="500"
                      fontSize="md"
                      letterSpacing="0"
                      height="100px"
                    >
                      Uždirbta suma
                    </Th>
                    <Th
                      textTransform="none"
                      fontWeight="500"
                      fontSize="md"
                      letterSpacing="0"
                      height="100px"
                    >
                      Įvertinimas
                    </Th>
                    <Th
                      textTransform="none"
                      fontWeight="500"
                      fontSize="md"
                      letterSpacing="0"
                      height="100px"
                    >
                      Priskirti darbai
                    </Th>
                    <Th display="flex" justifyContent="flex-end" alignItems="center" height="100px">
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        background="#EFF0F3"
                        borderRadius="5px"
                        height="40px"
                        px="15px"
                        cursor="pointer"
                        maxWidth="200px"
                        sx={{
                          ":hover > svg": {
                            color: "brand.500",
                          },
                          ":hover > p": {
                            color: "brand.500",
                          },
                        }}
                        onClick={() => {
                          setIsCreatingNewEmployee(true)
                          onOpen()
                        }}
                      >
                        <AddIcon boxSize={5} transition="all 0.2s" mr="10px" />
                        <Text
                          fontWeight="500"
                          transition="all 0.2s"
                          textTransform="none"
                          fontSize="sm"
                          letterSpacing="0"
                        >
                          Pridėti darbuotoją
                        </Text>
                      </Flex>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employees.map((employee) => {
                    var employeeProfit = 0
                    var employeeRating = 0
                    var employeeOrdersCount = 0
                    employee.orders.forEach((order) => {
                      employeeProfit += order.price
                      if (order.review?.isReviewed) {
                        employeeRating += order.review?.rating
                        employeeOrdersCount++
                      }
                    })
                    employeeRating /= employeeOrdersCount
                    return (
                      <Tr
                        transition="all 0.2s"
                        cursor="pointer"
                        _hover={{
                          background: "white",
                          boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.03)",
                        }}
                        _notLast={{ borderBottom: "1px solid #E0E3EF" }}
                        key={employee.id}
                      >
                        <Td height="100px">
                          <Text>
                            {employee.name} {employee.surname}
                          </Text>
                        </Td>
                        <Td height="100px">
                          <Text>{employee.position}</Text>
                        </Td>
                        <Td height="100px">
                          <Text>{employee.completedOrders}</Text>
                        </Td>
                        <Td height="100px">
                          <Text>{employeeProfit} €</Text>
                        </Td>
                        <Td height="100px">
                          <Text>{employeeRating > 0 ? employeeRating.toFixed(2) : "0.00"}</Text>
                        </Td>
                        <Td height="100px">
                          <Link
                            color="brand.500"
                            textDecoration="none !important"
                            _hover={{ color: "brand.200" }}
                            transition="all 0.2s"
                          >
                            Peržiūrėti darbus
                          </Link>
                        </Td>
                        <Td height="100px" textAlign="end">
                          <EditIcon
                            boxSize={6}
                            transition="all 0.2s"
                            cursor="pointer"
                            _hover={{ color: "brand.500" }}
                            onClick={() => {
                              setEmployeeName(employee.name)
                              setEmployeeSurname(employee.surname ? employee.surname : "")
                              setEmployeePosition(employee.position)
                              setIsCreatingNewEmployee(false)
                              setUpdatingEmployeeId(employee.id)
                              onOpen()
                            }}
                          />
                          {employee.position !== "Savininkas" && (
                            <DeleteIcon
                              boxSize={6}
                              transition="all 0.2s"
                              ml="15px"
                              cursor="pointer"
                              _hover={{ color: "brand.500" }}
                              onClick={async () => {
                                await deleteEmployee({
                                  where: {
                                    id: employee.id,
                                  },
                                })
                                toastIdRef.current = toast({
                                  duration: 5000,
                                  render: () => (
                                    <SuccessToast
                                      heading="Pavyko!"
                                      text={`Darbuotojas sėkmingai pašalintas.`}
                                      id={toastIdRef.current}
                                    />
                                  ),
                                })
                                refetch()
                              }}
                            />
                          )}
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Modal
                isOpen={isOpen}
                isCentered
                onClose={onClose}
                size="lg"
                onEsc={() => {
                  setEmployeeName("")
                  setEmployeeSurname("")
                  setEmployeePosition("")
                  setIsCreatingNewEmployee(false)
                  setUpdatingEmployeeId(-1)
                }}
                onOverlayClick={() => {
                  setEmployeeName("")
                  setEmployeeSurname("")
                  setEmployeePosition("")
                  setIsCreatingNewEmployee(false)
                  setUpdatingEmployeeId(-1)
                }}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Pridėti darbuotoją</ModalHeader>
                  <ModalCloseButton
                    onClick={() => {
                      setEmployeeName("")
                      setEmployeeSurname("")
                      setEmployeePosition("")
                      setIsCreatingNewEmployee(false)
                      setUpdatingEmployeeId(-1)
                    }}
                  />
                  <ModalBody>
                    <Input
                      placeholder="Vardas *"
                      borderRadius="5px"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="#E0E3EF"
                      mb="20px"
                      value={employeeName}
                      onChange={(e) => onEmployeeNameChange(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Pavardė"
                      borderRadius="5px"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="#E0E3EF"
                      mb="20px"
                      value={employeeSurname}
                      onChange={(e) => onEmployeeSurnameChange(e.target.value)}
                    />
                    <Input
                      placeholder="Pareigos *"
                      borderRadius="5px"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="#E0E3EF"
                      mb="20px"
                      value={employeePosition}
                      onChange={(e) => onEmployeePositionChange(e.target.value)}
                      required
                      disabled={employeePosition === "Savininkas"}
                    />
                  </ModalBody>
                  <ModalFooter>
                    {isCreatingNewEmployee ? (
                      <Button
                        background="#EFF0F3"
                        _hover={{ background: "#E0E3EF" }}
                        mr={3}
                        onClick={onCreateEmployee}
                      >
                        Pridėti
                      </Button>
                    ) : (
                      <Button
                        background="#EFF0F3"
                        _hover={{ background: "#E0E3EF" }}
                        mr={3}
                        onClick={() => {
                          onUpdateEmployee(updatingEmployeeId)
                        }}
                      >
                        Atnaujinti
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        onClose()
                        setEmployeeName("")
                        setEmployeeSurname("")
                        setEmployeePosition("")
                        setIsCreatingNewEmployee(false)
                        setUpdatingEmployeeId(-1)
                      }}
                    >
                      Atšaukti
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Divider color="#E0E3EF" mb="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex
                justifyContent="center"
                width="100%"
                maxWidth="1920px"
                minWidth="1400px"
                mb="70px"
                mt="30px"
              >
                <Button
                  background="#EFF0F3"
                  _hover={{ background: "#E0E3EF" }}
                  isLoading={changing}
                  width="200px"
                  onClick={onChanging}
                >
                  Tvirtinti pakeitimus
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              Pranešimų nustatymai
              <Flex
                justifyContent="center"
                width="100%"
                maxWidth="1920px"
                minWidth="1400px"
                mb="70px"
              >
                <Button
                  background="#EFF0F3"
                  _hover={{ background: "#E0E3EF" }}
                  isLoading={changing}
                  width="200px"
                  onClick={onChanging}
                >
                  Tvirtinti pakeitimus
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              Prenumerata
              <Flex
                justifyContent="center"
                width="100%"
                maxWidth="1920px"
                minWidth="1400px"
                mb="70px"
              >
                <Button
                  background="#EFF0F3"
                  _hover={{ background: "#E0E3EF" }}
                  isLoading={changing}
                  width="200px"
                  onClick={onChanging}
                >
                  Tvirtinti pakeitimus
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex justifyContent="space-between" width="100%" maxWidth="1920px" minWidth="1350px">
                <Box width="450px">
                  <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
                    Kontaktai
                  </Heading>
                  <Text color="#787E97">
                    Pakeiskite savo el. paštą ir telefono numerį, kad jūsų klientai visada galėtų su
                    jumis susisiekti
                  </Text>
                </Box>
                <Box width="700px">
                  <Input
                    placeholder="El. paštas"
                    borderRadius="5px"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#E0E3EF"
                    mb="20px"
                    value={serviceEmail}
                    onChange={(e) => onServiceEmailChange(e.target.value)}
                    focusBorderColor="brand.500"
                  />
                  <Input
                    placeholder="Tel. nr."
                    borderRadius="5px"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#E0E3EF"
                    value={servicePhone}
                    onChange={(e) => onServicePhoneChange(e.target.value)}
                    focusBorderColor="brand.500"
                  />
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex justifyContent="space-between" width="100%" maxWidth="1920px" minWidth="1350px">
                <Box width="450px">
                  <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
                    Adresas
                  </Heading>
                  <Text color="#787E97" mb="20px">
                    Pakeiskite savo adresą ir patikslinkite vietą žemėlapyje, kad klientams nekiltų
                    problemų jus randant
                  </Text>
                  <Text color="#787E97" display="inline">
                    Nerandate savo adreso?
                  </Text>
                  <Link
                    href="/partners/support"
                    textDecoration="none !important"
                    color="#6500e6"
                    display="inline"
                    ml="5px"
                    _hover={{ opacity: 0.8 }}
                  >
                    Susisiekite su mumis
                  </Link>
                </Box>
                <Box width="700px" display={isMapLoading ? "none" : "block"}>
                  <Map
                    address={address}
                    changes={changesArray}
                    onChanges={setChanges}
                    onAddressChange={setAddress}
                    city={city}
                    street={street}
                    house={house}
                  />
                </Box>
                <Flex
                  width="700px"
                  height="300px"
                  justifyContent="center"
                  alignItems="center"
                  display={isMapLoading ? "flex" : "none"}
                >
                  <CircularProgress isIndeterminate color="#6500E6" />
                </Flex>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              <Flex
                justifyContent="center"
                width="100%"
                maxWidth="1920px"
                minWidth="1400px"
                mb="70px"
              >
                <Button
                  background="#EFF0F3"
                  _hover={{ background: "#E0E3EF" }}
                  isLoading={changing}
                  width="200px"
                  onClick={onChanging}
                >
                  Tvirtinti pakeitimus
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
              Kiti nustatymai
              <Flex
                justifyContent="center"
                width="100%"
                maxWidth="1920px"
                minWidth="1400px"
                mb="70px"
              >
                <Button
                  background="#EFF0F3"
                  _hover={{ background: "#E0E3EF" }}
                  isLoading={changing}
                  width="200px"
                  onClick={onChanging}
                >
                  Tvirtinti pakeitimus
                </Button>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export default Settings
