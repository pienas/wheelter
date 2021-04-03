import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, List, ListItem, Text, UnorderedList } from "@chakra-ui/layout"
import { TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"
import { Textarea } from "@chakra-ui/textarea"
import React, { FC, useRef, useState } from "react"
import CustomTabSettings from "./CustomTabSettings"
import ImageUploading from "react-images-uploading"
import ImageIcon from "./ImageIcon"
import { Image } from "blitz"
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

type Props = {
  isOpen: boolean
  activeService: number
  avatarUrl: string
  refetch: () => void
  url: string
  name: string
  description: string
  plan: string
}

const Settings: FC<Props> = ({
  isOpen,
  activeService,
  avatarUrl,
  refetch,
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
    data.append("file", files)
    data.append("upload_preset", "zfkkozzg")
    const res = await fetch("https://api.cloudinary.com/v1_1/wheelter/image/upload", {
      method: "POST",
      body: data,
    })
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
      refetch()
    })
  }
  const maxImages = plan === "PREMIUM" ? 6 : 3
  const toast = useToast()
  const toastIdRef = useRef<any>()
  const [images, setImages] = useState([])
  const onChanges = (imageList, index) => {
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
    }))
    const fill = maxImages - imageList.length
    const fillItems = getItems(fill)
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
  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}-${new Date().getTime()}`,
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
    }))
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }
  const [imagesState, setImagesState] = useState<any>({ items: getItems(maxImages) })
  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = reorder(imagesState.items, result.source.index, result.destination.index)
    setImagesState({ items })
  }
  return (
    <Box mr="70px" ml={isOpen ? "370px" : "170px"} transition="all 0.2s">
      <Heading as="h1">Nustatymai</Heading>
      <Box mt="30px">
        <Tabs variant="unstyled">
          <TabList>
            <CustomTabSettings>
              <InfoIcon boxSize={4} transition="all 0.2s" mr={2} />
              Pagrindinė informacija
            </CustomTabSettings>
            <CustomTabSettings>
              <EmployeesIcon boxSize={4} transition="all 0.2s" mr={2} />
              Darbuotojai
            </CustomTabSettings>
            <CustomTabSettings>
              <NotificationsIcon boxSize={4} transition="all 0.2s" mr={2} />
              Pranešimų nustatymai
            </CustomTabSettings>
            <CustomTabSettings>
              <SubscriptionIcon boxSize={4} transition="all 0.2s" mr={2} />
              Prenumerata
            </CustomTabSettings>
            <CustomTabSettings>
              <ContactsIcon boxSize={4} transition="all 0.2s" mr={2} />
              Kontaktinė informacija
            </CustomTabSettings>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              <Flex justifyContent="space-between" width="1200px">
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
                    value={name}
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
                      value={url}
                    />
                  </InputGroup>
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              <Flex justifyContent="space-between" width="1200px">
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
                    value={description ? description : ""}
                  />
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              <Flex justifyContent="space-between" width="1200px">
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
                                background: "#E3E3E3",
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
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              <Flex justifyContent="space-between" width="1200px">
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
                  {/* <Button
                    onClick={() => {
                      setImagesState([...imagesState, []])
                    }}
                  >
                    Add new group
                  </Button>
                  <Button
                    onClick={() => {
                      setImagesState([...imagesState, getItems(1)])
                    }}
                  >
                    Add new item
                  </Button> */}
                  <Flex direction="column">
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
                                    {({ onImageUpload, onImageRemove, isDragging, dragProps }) => (
                                      <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        padding={2}
                                        position="relative"
                                      >
                                        {item.content.props.children.type.name === "Image" ? (
                                          <Box>
                                            <>
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
                                                  imagesState.items.splice(idx, 1)
                                                  imagesState.items.push(getItems(1)[0])
                                                  setImagesState({ items: imagesState.items })
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
                                            </>
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
                  </Flex>
                </Box>
              </Flex>
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              <Flex justifyContent="center" width="1200px" mb="70px">
                <Button background="#EFF0F3" _hover={{ background: "#E0E3EF" }}>
                  Atnaujinti
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              Darbuotojai
            </TabPanel>
            <TabPanel>
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              Pranešimų nustatymai
            </TabPanel>
            <TabPanel>
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              Prenumerata
            </TabPanel>
            <TabPanel>
              <Divider color="#E0E3EF" my="30px" width="1200px" />
              Kontaktinė informacija
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export default Settings
