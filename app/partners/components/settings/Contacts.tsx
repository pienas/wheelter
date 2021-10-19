import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  Button,
  Divider,
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Link,
  CircularProgress,
} from "@chakra-ui/react"
import MapGL, { FlyToInterpolator, Marker } from "react-map-gl"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import Geocoder from "react-map-gl-geocoder"

type MapProps = {
  address: object
  changes: boolean[]
  onChanges: (changes: boolean[]) => void
  onAddressChange: (address: object) => void
  city: string
  street: string
  house: string
}

type ContactsProps = {
  changing: boolean
  onChanging: () => void
  city: string
  street: string
  house: string
  setChanges: React.Dispatch<React.SetStateAction<boolean[]>>
  changesArray: boolean[]
  serviceEmail: string
  setServiceEmail: React.Dispatch<React.SetStateAction<string>>
  servicePhone: string
  setServicePhone: React.Dispatch<React.SetStateAction<string>>
  address: object
  setAddress: React.Dispatch<React.SetStateAction<object>>
}

const Pin = (props) => {
  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
    c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
    C20.1,15.8,20.2,15.8,20.2,15.7z`
  const pinStyle = {
    fill: "#923ffb",
    stroke: "none",
  }
  const { size = 20 } = props
  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  )
}
const Map = ({ address, changes, onChanges, onAddressChange, city, street, house }: MapProps) => {
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
    latitude: address["latitude"],
    longitude: address["longitude"],
    zoom:
      address["latitude"] == 55.32953572348781 && address["longitude"] == 23.905501899207678
        ? 6.5
        : 18,
    bearing: 0,
    pitch: 0,
  })
  const [marker, setMarker] = useState({
    latitude: address["latitude"],
    longitude: address["longitude"],
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

const Contacts = ({
  changing,
  onChanging,
  city,
  street,
  house,
  setChanges,
  changesArray,
  serviceEmail,
  setServiceEmail,
  servicePhone,
  setServicePhone,
  address,
  setAddress,
}: ContactsProps) => {
  const onServiceEmailChange = (value) => {
    changesArray.splice(4, 1, true)
    setChanges(changesArray)
    setServiceEmail(value)
  }
  const onServicePhoneChange = (value) => {
    changesArray.splice(5, 1, true)
    setChanges(changesArray)
    setServicePhone(value)
  }
  const [isMapLoading, setIsMapLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsMapLoading(false)
    }, 7000)
  }, [])
  return (
    <>
      <Divider color="#E0E3EF" my="30px" width="100%" maxWidth="1920px" minWidth="1350px" />
      <Flex justifyContent="space-between" width="100%" maxWidth="1920px" minWidth="1350px">
        <Box width="450px">
          <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
            Kontaktai
          </Heading>
          <Text color="#787E97">
            Pakeiskite savo el. paštą ir telefono numerį, kad jūsų klientai visada galėtų su jumis
            susisiekti
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
            Pakeiskite savo adresą ir patikslinkite vietą žemėlapyje, kad klientams nekiltų problemų
            jus randant
          </Text>
          <Text color="#787E97" display="inline">
            Nerandate savo adreso?
          </Text>
          <Link
            href="/partners/support"
            textDecoration="none !important"
            color="brand.500"
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
      <Flex justifyContent="center" width="100%" maxWidth="1920px" minWidth="1400px" mb="70px">
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
    </>
  )
}

export default Contacts
