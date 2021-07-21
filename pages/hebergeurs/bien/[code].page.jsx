import { Layout } from "@components/core/Layout";
import { useRouter } from "next/router";
//Hook
import useMesBiens from "@root/hooks/useMesBiens";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Center,
  Wrapper,
  Text,
  Link,
  Grid,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Divider,
  Img,
} from "@chakra-ui/react";
import FlecheRetour from "../../../components/ui/ArrowBack";

import {
  getPropertiesUser,
  putCalendrierProperties,
  deletePropertiesId,
} from "@services/properties";
import { useEffect, useState } from "react";
import useAuth from "@context/context";
import DayPicker, { DateUtils } from "react-day-picker";
import {
  locale,
  MONTHS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
} from "@root/utils/dateFr";
import "react-day-picker/lib/style.css";

import { useForm } from "react-hook-form";
import { isError, useQuery } from "react-query";
import { format } from "date-fns";
import { splitId } from "@root/utils/sliceId";

export default function GestionBienUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, loading, user } = useAuth();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDaysToSend, setSelectedDaysToSend] = useState([]);
  const router = useRouter();

  const [bienSelected, setBienSelected] = useState({});
  const { mesBiens, isLoading: isLoadingMesbiens } = useMesBiens();
  const { isLoading, isError, data: biens, refetch } = useQuery(
    ["biens", user],
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    () => user && getPropertiesUser(user?.id),
    {
      onSuccess: (data) => {},
    }
  );

  const handleDayClick = (day, { selected }) => {
    const selectedDay = [...selectedDays];
    const selectedDayToSend = [...selectedDaysToSend];
    if (selected) {
      const selectedIndex = selectedDay.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDayToSend.splice(selectedIndex, 1);
      selectedDay.splice(selectedIndex, 1);
    } else {
      selectedDayToSend.push({
        jourDispo: format(day, "yyyy MM dd").split(" ").join("-"),
      });
      selectedDay.push(day);
    }

    setSelectedDaysToSend(selectedDayToSend);
    setSelectedDays(selectedDay);
  };

  const onSubmit = () => {
    try {
      biens?.data["hydra:member"].map((e, i) => {
        putCalendrierProperties(splitId(e["@id"]), {
          disponibilities: selectedDaysToSend,
        });
      });

      refetch();
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  const deleteBien = async (id) => {
    try {
      await deletePropertiesId(id.split("/")[3]);
      toast({
        position: "top",
        title: "L'annonce a bien été supprimé",
        description: "",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      refetch();
    } catch (error) {
      console.log("error");
    }
  };

  const toast = useToast();

  if (isLoading || isLoadingMesbiens) {
    return (
      <Layout h="100vh">
        <Box h="70vh" display="flex" justifyContent="center">
          <Center>
            <Spinner size="xl" />
          </Center>
        </Box>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout h="100vh">Une erreur est survenu au chargements des users</Layout>
    );
  }

  return (
    <Layout>
      {mesBiens?.length ? (
        <Box minHeight="70vh">
          <FlecheRetour></FlecheRetour>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection={["column", "row"]}
          >
            <Heading as="h1" textAlign="center" pb="10px" pt="30px" size="xl">
              Ajouter une nouvelle location ou gérer vos biens
            </Heading>
            <Link href="/hebergeurs/ajouter-un-bien">
              <Box
                display="flex"
                w={["100%", "150px"]}
                pt={["10px", "60px"]}
                pl={["0", "30px"]}
                justifyContent={["center", "initial"]}
                pb={["10px", 0]}
              >
                <Box w="30px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 512 512"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <path
                        d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 0"
                        fill="#8ae98a"
                      />
                      <path
                        d="M368 277.332h-90.668V368c0 11.777-9.555 21.332-21.332 21.332s-21.332-9.555-21.332-21.332v-90.668H144c-11.777 0-21.332-9.555-21.332-21.332s9.555-21.332 21.332-21.332h90.668V144c0-11.777 9.555-21.332 21.332-21.332s21.332 9.555 21.332 21.332v90.668H368c11.777 0 21.332 9.555 21.332 21.332s-9.555 21.332-21.332 21.332zm0 0"
                        fill="#fafafa"
                      />
                    </g>
                  </svg>
                </Box>
                <Box w="60px" mr="20px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 512.003 512.003"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <path
                        d="M275.33 47.416l23.159-28.495L275.208 0l-19.207 23.633L236.794 0l-23.281 18.921 23.159 28.495L22.481 310.958H66.05v201.045h379.903V310.958h43.569L275.33 47.416zm31.004 434.586H205.668v-60.664c0-27.754 22.58-50.333 50.333-50.333s50.333 22.58 50.333 50.333v60.664zm109.619 0h-79.619v-60.664c0-44.296-36.037-80.333-80.333-80.333s-80.333 36.038-80.333 80.333v60.664H96.05V310.958h319.903v171.044zM85.522 280.957L256.001 71.198 426.48 280.957H85.522z"
                        fill="#8ae98a"
                      />
                    </g>
                  </svg>
                </Box>
              </Box>
            </Link>
          </Box>
          <Box w="100%" display="flex" justifyContent="center" mb={10}>
            <Box
              border="#8ae98a solid 3px"
              pt="15px"
              _hover={{
                border: "#8ae98a solid 3px",
                transition: "0.2s",
              }}
              display="flex"
              flexDirection="column"
              p={1}
              w="500px"
              h={["550px", "500px"]}
              fontSize="18px"
              alignItems="center"
              borderRadius="10px"
            >
              <Text fontWeight="bold" mb="10px" fontSize="20px" mt="10px">
                Modifier les disponibilités de l'ensemble de vos biens
              </Text>
              <Text textAlign="center" fontSize="14px" mb="5px">
                Pensez à renseigner les disponilités de tout vos biens grâce au
                calendrier ci dessous. Modifier ensuite les disponibilités bien
                par bien si besoin.
              </Text>
              <DayPicker
                months={MONTHS}
                weekdaysLong={WEEKDAYS_LONG}
                weekdaysShort={WEEKDAYS_SHORT}
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
                disabledDays={[
                  {
                    before: new Date(Date.now()),
                  },
                ]}
              />
              <Button
                type="button"
                onClick={onSubmit}
                bg="#89E98A"
                _hover={{
                  background: "#8ae98a",
                }}
                mt={3}
                h="40px"
                w="300px"
                textAlign="center"
              >
                <Text
                  _hover={{
                    borderBottom: "1px",
                  }}
                >
                  Valider ces dates pour tout vos biens
                </Text>
              </Button>
            </Box>
          </Box>

          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalForm
              bienSelected={bienSelected}
              onClose={onClose}
              refetch={refetch}
            />
          </Modal>

          <Center>
            <Box
              width={["80%", "90%"]}
              h="38px"
              bg="#F8F8FF"
              color="#000"
              display={["none", "flex"]}
              fontWeight="semibold"
              justifyContent="space-between"
              pr={10}
              pl={5}
              fontSize="22px"
              mb="20px"
              borderRadius="10px"
            >
              <Box minWidth="90px">
                <Text>Numéro</Text>
              </Box>
              <Box minWidth="150px">
                <Text>Catégorie</Text>
              </Box>
              <Box minWidth="240px">
                <Text>Titre de l'annonce</Text>
              </Box>
              <Box minWidth="150px">
                <Text>Status</Text>
              </Box>
              <Box minWidth="180px">
                <Text>Modification</Text>
              </Box>
            </Box>
          </Center>
          <SimpleGrid minChildWidth="100%" spacing="5px">
            {biens?.data["hydra:member"].map((e, i) => {
              return (
                <Center>
                  <Box
                    pr={[0, 10]}
                    pl={[0, 10]}
                    borderWidth="1px"
                    bg="#F8F8FF"
                    borderRadius="md"
                    h={["350px", "120px"]}
                    width={["90%", "90%"]}
                    display="flex"
                    flexDirection={["column", "row"]}
                    justifyContent={["space-around", "space-between"]}
                    alignItems="center"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    mb="10px"
                    borderRadius="10px"
                  >
                    <Text
                      fontSize={["20px", "20px"]}
                      fontWeight="bold"
                      lineHeight="short"
                      key={i}
                    >
                      {e["@id"].split("/")[3]}
                    </Text>
                    <Box
                      display={["flex", "initial"]}
                      justifyContent="center"
                      maxWidth={["100%", "180px"]}
                      w={["100%", "200px"]}
                      ml={["0", "20px"]}
                    >
                      <Text
                        fontSize={["20px", "20px"]}
                        fontWeight="bold"
                        lineHeight="short"
                        key={i}
                      >
                        {e.typeProperty.title}
                      </Text>
                    </Box>
                    <Box
                      display={["flex", "initial"]}
                      justifyContent="center"
                      maxWidth={["100%", "180px"]}
                      w={["100%", "200px"]}
                      ml={["0", "20px"]}
                    >
                      <Text
                        fontSize="18px"
                        fontWeight="semibold"
                        // lineHeight="short"
                      >
                        {e.title}
                      </Text>
                    </Box>

                    <Box>
                      {e.status === "draft" || e.status === "en attente" ? (
                        <>
                          <Box
                            maxWidth="150px"
                            color="#FF8C00"
                            color="white"
                            borderRadius="3px"
                            p={1}
                            w="100%"
                          >
                            <Text
                              color="#FF8C00"
                              textAlign="center"
                              fontSize="20px"
                              fontWeight="semibold"
                            >
                              En attente de validation
                            </Text>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Text fontSize="20px" fontWeight="semibold">
                            Status:
                          </Text>
                          <Box
                            backgroundColor="#32CD32"
                            color="white"
                            borderRadius="3px"
                            p={1}
                          >
                            <Text
                              textAlign="center"
                              fontSize="20px"
                              fontWeight="semibold"
                            >
                              Validé
                            </Text>
                          </Box>
                        </>
                      )}
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-around"
                      mr="5px"
                    >
                      <Button
                        onClick={() => {
                          // setUserToModified({
                          //   id: e.id,
                          //   email: e.email,
                          //   firstName: e.firstName,
                          //   lastName: e.lastName,
                          //   phone: e.phone,
                          // });
                          setBienSelected(e);
                          onOpen();
                        }}
                        bg="#8ae98a"
                        color="#000"
                        boxShadow="lg"
                        fontSize="18px"
                        p={3}
                        m={2}
                      >
                        Modifier le planning
                      </Button>

                      <Button
                        onClick={() => {
                          deleteBien(e["@id"]);
                        }}
                        bg="#BA2F2F"
                        color="#FFF"
                        boxShadow="lg"
                        fontSize="18px"
                        p={3}
                        m={2}
                      >
                        Supprimer l'annonce
                      </Button>
                    </Box>
                  </Box>
                </Center>
              );
            })}
          </SimpleGrid>
        </Box>
      ) : (
        <Box
          h="69vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text fontSize="30px" mb="50px" fontWeight="bold">
            Veuillez ajoutez votre premier bien pour commencer à utiliser la
            plateforme
          </Text>
          <Link href="/hebergeurs/ajouter-un-bien">
            <Button
              boxShadow=" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
              background="#67E767"
              p={10}
              fontSize="24px"
              _hover={{
                background: "#67E767",
              }}
            >
              Ajouter mon premier bien
            </Button>
          </Link>
        </Box>
      )}
    </Layout>
  );
}

const ModalForm = ({ bienSelected, onClose, refetch }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDaysToSend, setSelectedDaysToSend] = useState([]);

  useEffect(() => {
    setSelectedDays(
      bienSelected.disponibilities.map((e) => new Date(e.jourDispo))
    );
    setSelectedDaysToSend(
      bienSelected.disponibilities.map((e) => {
        return {
          jourDispo: format(new Date(e.jourDispo), "yyyy MM dd")
            .split(" ")
            .join("-"),
        };
      })
    );
  }, []);

  const handleDayClick = (day, { selected }) => {
    const selectedDay = [...selectedDays];
    const selectedDayToSend = [...selectedDaysToSend];
    if (selected) {
      const selectedIndex = selectedDay.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDayToSend.splice(selectedIndex, 1);
      selectedDay.splice(selectedIndex, 1);
    } else {
      selectedDayToSend.push({
        jourDispo: format(day, "yyyy MM dd").split(" ").join("-"),
      });
      selectedDay.push(day);
    }

    setSelectedDaysToSend(selectedDayToSend);
    setSelectedDays(selectedDay);
  };

  const onSubmit = async () => {
    try {
      await putCalendrierProperties(splitId(bienSelected["@id"]), {
        disponibilities: selectedDaysToSend,
      });

      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  return (
    <>
      <ModalOverlay />

      <ModalContent backgroundColor="#fff" color="#000">
        <div>
          <ModalHeader>Modifier le calendrier</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DayPicker
              selectedDays={selectedDays}
              onDayClick={handleDayClick}
              disabledDays={[
                {
                  before: new Date(Date.now()),
                },
              ]}
            />
          </ModalBody>

          <ModalFooter>
            <Button type="button" onClick={onSubmit} colorScheme="blue" mr={3}>
              Modifier
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </div>
      </ModalContent>
    </>
  );
};
