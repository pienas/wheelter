import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/layout"
import { TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { Textarea } from "@chakra-ui/textarea"
import React, { FC, useEffect, useRef, useState } from "react"
import CustomTabSettings from "./CustomTabSettings"
import ImageUploading from "react-images-uploading"
import ImageIcon from "./ImageIcon"
import { Image, useQuery } from "blitz"
import { Button } from "@chakra-ui/button"
import updateServiceAvatar from "app/partners/mutations/updateServiceAvatar"
import { Spinner } from "@chakra-ui/spinner"
import NotificationsIcon from "./NotificationsIcon"
import InfoIcon from "./InfoIcon"
import EmployeesIcon from "./EmployeesIcon"
import SubscriptionIcon from "./SubscriptionIcon"
import ContactsIcon from "./ContactsIcon"
import { Avatar } from "@chakra-ui/avatar"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import PlusIcon from "./PlusIcon"
import DropHereIcon from "./DropHereIcon"
import { useToast } from "@chakra-ui/toast"
import WarningToast from "../index/WarningToast"
import sha1 from "sha1"
import updateServiceInfo from "app/partners/mutations/updateServiceInfo"
import SuccessToast from "../index/SuccessToast"
import checkServiceUrl from "app/partners/mutations/checkServiceUrl"
import createServiceImages from "app/partners/mutations/createServiceImages"
import updateServiceImages from "app/partners/mutations/updateServiceImages"
import getServiceImages from "app/partners/queries/getServiceImages"
import deleteServiceImages from "app/partners/mutations/deleteServiceImages"

type Props = {
  isOpen: boolean
  activeService: number
  avatarUrl: string
  refetchOther: () => void
  url: string
  name: string
  description: string
  plan: string
}

const Settings: FC<Props> = ({
  isOpen,
  activeService,
  avatarUrl,
  refetchOther,
  url,
  name,
  description,
  plan,
}: Props) => {
  const [image, setImage] = useState([])
  const onChange = (imageList) => {
    setImage(imageList)
  }
  const [uploadState, setUploadState] = useState("NONE")
  const uploadImage = async (e) => {
    setUploadState("UPLOADING")
    const files = e[0].file
    const data = new FormData()
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    const timestamp = Math.round(new Date().getTime() / 1000)
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
    const payloadToSign = `public_id=${activeService}&timestamp=${timestamp}&upload_preset=${preset}${apiSecret}`
    const signature = sha1(payloadToSign)
    data.append("file", files)
    data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
    data.append("public_id", activeService.toString())
    data.append("timestamp", timestamp.toString())
    data.append("signature", signature)
    data.append("upload_preset", preset!)
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
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
  const [serviceActiveImages, { refetch }] = useQuery(getServiceImages, {
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
            <Image src={x[k]["data_url"]} width="100px" height="100px" />
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
        <Image src={v.imageUrl} width="100px" height="100px" />
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
          <Image src={imageList[k]["data_url"]} width="100px" height="100px" />
        </Flex>
      ),
      data_url: imageList[k]["data_url"],
      file: imageList[k].file,
    }))
    const fill = maxImages - imageList.length
    const fillItems = getItems(fill, imageList.length)
    const finalList = tempImg.concat(fillItems)
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
  const [serviceName, setServiceName] = useState(name)
  const onServiceNameChange = (value) => {
    setServiceName(value)
  }
  const [isInvalidUrl, setIsInvalidUrl] = useState(false)
  const [serviceUrl, setServiceUrl] = useState(url)
  const onServiceUrlChange = (value) => {
    setServiceUrl(value)
    setIsInvalidUrl(false)
  }
  const [serviceDescription, setServiceDescription] = useState(description)
  const onServiceDescriptionChange = (value) => {
    setServiceDescription(value)
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
                const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
                const timestamp = Math.round(new Date().getTime() / 1000)
                const payloadToSign = `public_id=images/carServices/${activeService}_${i}&timestamp=${timestamp}${apiSecret}`
                const signature = sha1(payloadToSign)
                data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
                data.append("public_id", "images/carServices/" + activeService + "_" + i)
                data.append("timestamp", timestamp.toString())
                data.append("signature", signature)
                const res = await fetch(
                  `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/destroy`,
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
            const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
            const timestamp = Math.round(new Date().getTime() / 1000)
            const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_IMAGES
            const payloadToSign = `public_id=${activeService}_${i}&timestamp=${timestamp}&upload_preset=${preset}${apiSecret}`
            const signature = sha1(payloadToSign)
            data.append("file", files)
            data.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
            data.append("public_id", activeService + "_" + i)
            data.append("timestamp", timestamp.toString())
            data.append("signature", signature)
            data.append("upload_preset", preset!)
            const res = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
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
    const urlCount = await checkServiceUrl({
      where: {
        url: serviceUrl,
      },
    })
    setChanging(true)
    if (urlCount && serviceUrl !== url) {
      setIsInvalidUrl(true)
      toastIdRef.current = toast({
        duration: 5000,
        render: () => (
          <WarningToast
            heading="Kažkas netaip!"
            text={`Tokia partnerio profilio nuoruoda jau egzistuoja. Pamėginkite kitą nuoruodą.`}
            id={toastIdRef.current}
          />
        ),
      })
      setChanging(false)
    } else {
      console.log(imagesState.items)
      await uploadImages(imagesState.items).then(async () => {
        await updateServiceInfo({
          where: {
            id: activeService,
          },
          data: {
            url: serviceUrl,
            name: serviceName,
            description: serviceDescription,
          },
        })
        refetchOther()
        refetch()
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
    }
  }
  return (
    <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
      <Heading as="h1">Nustatymai</Heading>
      <Box mt="30px">
        <Tabs variant="unstyled">
          <TabList width="1400px" justifyContent="space-between">
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
          </TabList>
          <TabPanels>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              <Flex justifyContent="space-between" width="1400px">
                <Box width="450px">
                  <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
                    Pavadinimas
                  </Heading>
                  <Text color="#787E97">
                    Pakeiskite savo pavadinimą ir redaguokite nuorodą, per kurią jus galės pasiekti
                    būsimi klientai
                  </Text>
                </Box>
                <Box width="500px">
                  <Input
                    placeholder="Pavadinimas"
                    borderRadius="5px"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#E0E3EF"
                    mb="20px"
                    value={serviceName}
                    onChange={(e) => onServiceNameChange(e.target.value)}
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
                    />
                  </InputGroup>
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              <Flex justifyContent="space-between" width="1400px">
                <Box width="450px">
                  <Heading as="h5" fontSize="2xl" mb="15px" fontWeight="500">
                    Aprašymas
                  </Heading>
                  <Text color="#787E97">
                    Pakeiskite savo aprašymą, kad kuo tiksliau nupasakotumėte savo būsimiems
                    klientams, kokias paslaugas teikiate
                  </Text>
                </Box>
                <Box width="500px">
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
                  />
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              <Flex justifyContent="space-between" width="1400px">
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
                <Box width="500px">
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
                            <Spinner
                              thickness="4px"
                              speed="0.65s"
                              emptyColor="#EFF0F3"
                              color="#6500E6"
                              size="xl"
                            />
                          ) : (
                            <Avatar
                              size="xl"
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
                              width="350px"
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
                            width="350px"
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
                                  Paleiskite tempiamas nuotraukas čia
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
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              <Flex justifyContent="space-between" width="1400px">
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
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box width="696px">
                  <Flex direction="column" justifyContent="center" alignItems="center">
                    {finalImagesLoading ? (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="#EFF0F3"
                        color="#6500E6"
                        size="xl"
                      />
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
                                          {item.content.props.children.type.name === "Image" ? (
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
                                                  // imagesState.items.splice(idx, 1)
                                                  // imagesState.items.forEach((i, index) => {
                                                  //   if (index < idx) return
                                                  //   else i.id = index + i.id.substring(1)
                                                  // })
                                                  // imagesState.items.push(getItems(1, 5)[0])
                                                  // setImagesState({ items: imagesState.items })
                                                }}
                                                _hover={{ background: "#E3E3E3" }}
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
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              <Flex justifyContent="center" width="1400px" mb="70px">
                <Button
                  background="#EFF0F3"
                  _hover={{ background: "#E0E3EF" }}
                  isLoading={changing}
                  width="150px"
                  onClick={onChanging}
                >
                  Atnaujinti
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              Darbuotojai
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              Pranešimų nustatymai
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              Prenumerata
            </TabPanel>
            <TabPanel padding="0">
              <Divider color="#E0E3EF" my="30px" width="1400px" />
              Kontaktinė informacija
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export default Settings
