//React
import { isError, useQuery, useMutation } from "react-query";
import { useState } from "react";
import { useRouter } from "next/router";

//Services
import { handleReservation, getReservationProprio } from "@services/properties";
import useAuth from "@context/context";

//Composants
import FlecheRetour from "../../../components/ui/ArrowBack";
import PleaseSignIn from "@components/core/PleaseSignIn";

//Styles
import { Layout } from "@components/core/Layout";
import {
  Box,
  Button,
  Heading,
  useToast,
  Center,
  Text,
  SimpleGrid,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

export default function GestionReservation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, loading, user } = useAuth();
  const mutation = useMutation((infos) => {
    const { id, status } = infos;
    handleBien(id, status);
  });

  const router = useRouter();

  const { isLoading, isError, data: reservations, refetch } = useQuery(
    ["reservations", user],

    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect

    () => user && getReservationProprio(),

    { refetchOnWindowFocus: false }
  );

  const toast = useToast();

  if (isLoading) {
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
    <PleaseSignIn permissions={["ROLE_USER"]}>
      <Layout>
        <Box maxWidth="1600px" h={["initial", "initial"]} mb="20px">
          <FlecheRetour></FlecheRetour>
          <Heading as="h1" textAlign="center" pt="40px" mb={10} size="xl">
            Mes réservations
          </Heading>
          {mutation.isSuccess ? (
            <div>Le changement a été pris en compte</div>
          ) : null}
          <Center>
            <Box
              width={["80%", "90%"]}
              h="60px"
              bg="#F8F8FF"
              color="#000"
              display={["none", "flex"]}
              fontWeight="semibold"
              justifyContent="space-between"
              alignItems="center"
              pr={10}
              pl={10}
              fontSize="22px"
              mb="20px"
              borderRadius="10px"
            >
              <Text>Votre atypik house</Text>
              <Text>Date d'arrivée</Text>
              <Text>Date de départ</Text>
              <Text>Montant</Text>

              <Text pr="40px">Status</Text>
            </Box>
          </Center>
          <SimpleGrid minChildWidth="100%" spacing="5px">
            {reservations?.["hydra:member"].map((e, i) => {
              return (
                <Center>
                  <Box
                    mt="20px"
                    pr={[5, 10]}
                    pl={[5, 10]}
                    borderWidth="1px"
                    bg="#F8F8FF"
                    borderRadius="md"
                    h={["260px", "120px"]}
                    width={["85%", "90%"]}
                    display="flex"
                    flexDirection={["column", "row"]}
                    justifyContent={["space-around", "space-between"]}
                    alignItems="center"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    mb="10px"
                    borderRadius="10px"
                  >
                    <Box w={["initial", "230px"]}>
                      <Text
                        fontSize={["20px", "20px"]}
                        fontWeight="bold"
                        lineHeight="short"
                        key={i}
                      >
                        <Text>{e.property.title}</Text>
                      </Text>
                    </Box>
                    <Box
                      m={2}
                      display="flex"
                      flexDirection={["column", "column"]}
                      justifyContent="center"
                      alignItems="center"
                      w={["250px", "140px"]}
                    >
                      <Text fontWeight="semibold" fontSize={["20px", "22px"]}>
                        {e.dateStart
                          .substr(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}
                      </Text>
                    </Box>
                    <Box
                      m={2}
                      display="flex"
                      flexDirection={["column", "column"]}
                      justifyContent="center"
                      alignItems="center"
                      w={["250px", "240px"]}
                    >
                      <Text fontWeight="semibold" fontSize={["20px", "22px"]}>
                        {e.dateEnd.substr(0, 10).split("-").reverse().join("-")}
                      </Text>
                    </Box>
                    <Box w={["initial", "100px"]}>
                      <Text
                        fontSize="22px"
                        fontWeight="bold"
                        lineHeight="short"
                        key={i}
                        pb={[2, 0]}
                      >
                        {e.montant} €
                      </Text>
                    </Box>

                    <Box w="140px" display="flex" justifyContent="center">
                      {e.status === "en attente" ? (
                        <>
                          <Box
                            backgroundColor="#F8F8FF"
                            color="#c97b23"
                            borderRadius="3px"
                            w={["40px", "60px"]}
                            pb={2}
                            _hover={{
                              transform: "rotate(360deg)",
                              transition: "3s",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              viewBox="0 0 468.293 468.293"
                            >
                              <rect width="100%" height="100%" fill="none" />
                              <g class="currentLayer">
                                <path
                                  d="M278.496 257.872c64.139 57.539 101.931 112.884 106.521 193.738H83.277c4.59-80.853 42.382-136.199 106.521-193.738l26.467-23.743-26.467-23.689C125.659 152.901 87.867 97.556 83.277 16.702h301.74c-4.59 80.854-42.382 136.2-106.521 193.738l-26.466 23.689 26.466 23.743z"
                                  class="selected"
                                  fill="#fff"
                                />
                                <path
                                  d="M80.375 34.867h307.543c10.349 0 18.737-7.526 18.737-16.809S398.267 1.25 387.918 1.25H80.375c-10.349 0-18.737 7.526-18.737 16.809s8.388 16.808 18.737 16.808z"
                                  fill="#c74d4d"
                                />
                                <path
                                  d="M170.633 355.893c-38.559 19.982-62.309 56.895-62.309 96.841h249.144c0-39.947-23.752-76.859-62.31-96.841l-51.66-26.77v-146.01l36.52-18.924c24.984-12.947 41.752-35.286 46.06-60.418 1.156-6.746-4.574-12.873-12.183-12.873H151.898c-7.609 0-13.34 6.126-12.183 12.873 4.308 25.131 21.078 47.471 46.061 60.418l39.053 20.237-.001 143.384-54.195 28.083z"
                                  fill="#67e767"
                                />
                                <path
                                  d="M387.918 435.925H80.375c-10.349 0-18.737 7.526-18.737 16.809 0 9.282 8.388 16.809 18.737 16.809h307.543c10.349 0 18.737-7.526 18.737-16.809 0-9.282-8.388-16.809-18.737-16.809z"
                                  fill="#c74d4d"
                                />
                              </g>
                            </svg>
                          </Box>
                        </>
                      ) : e.status === "rejetee" ? (
                        <>
                          <Box
                            backgroundColor="#000"
                            w={["40px", "60px"]}
                            color="white"
                            borderRadius="3px"
                            p={1}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              viewBox="0 0 512.002 512.002"
                            >
                              <rect width="100%" height="100%" fill="none" />
                              <g class="currentLayer">
                                <path
                                  fill="#c74d4d"
                                  d="M504.5 95.181l-160.82 160.82 160.82 160.82-21.21 21.22-272.04-182.04 272.04-182.03z"
                                />
                                <path
                                  fill="#c74d4d"
                                  d="M482.04 75.221L300 257.251l182.04 182.04-66.47 66.46-160.82-160.82-160.82 160.82-87.68-87.68 160.82-160.82L6.25 96.431l87.68-87.68 160.82 160.82L415.57 8.751z"
                                />
                                <path d="M354.288 256.001l155.516-155.515a7.5 7.5 0 000-10.607L422.123 2.198a7.499 7.499 0 00-10.607-.001L256 157.713 100.486 2.198a7.502 7.502 0 00-10.607 0L2.197 89.879a7.501 7.501 0 00-.001 10.608l155.517 155.514L93.212 320.5a7.5 7.5 0 0010.607 10.607l69.804-69.803a7.502 7.502 0 000-10.608L18.107 95.183l77.075-77.075 155.515 155.516a7.502 7.502 0 0010.607 0L416.82 18.108l77.074 77.075-155.516 155.515a7.5 7.5 0 000 10.607L493.894 416.82l-77.074 77.075-155.516-155.516a7.502 7.502 0 00-10.607 0L95.182 493.895 18.107 416.82l64.5-64.499A7.5 7.5 0 0072 341.714L2.197 411.516a7.5 7.5 0 000 10.607l87.682 87.682c1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196L256 354.289l155.516 155.516a7.502 7.502 0 0010.608 0l87.681-87.682a7.5 7.5 0 000-10.607L354.288 256.001z" />
                              </g>
                            </svg>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box
                            backgroundColor="#F8F8FF"
                            color="#32CD32"
                            borderRadius="3px"
                            p={1}
                            w={["40px", "60px"]}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              viewBox="0 0 512 511"
                            >
                              <rect width="100%" height="100%" fill="none" />
                              <g class="currentLayer">
                                <path
                                  d="M405.813 11.75L207.688 209.875l-101.5-101.5L10 204.563 207.688 402.25 502 107.937zm0 0"
                                  fill="#67e767"
                                />
                                <path d="M207.688 411a10 10 0 01-7.07-2.93L2.93 210.383a10 10 0 010-14.145l96.187-96.183c3.906-3.907 10.238-3.907 14.14 0l94.43 94.43L398.743 3.43a10 10 0 0114.14 0l96.188 96.187c3.907 3.906 3.907 10.238 0 14.145L380.934 241.898c-3.907 3.903-10.239 3.903-14.145 0-3.906-3.906-3.906-10.238 0-14.144l121.066-121.066-82.043-82.047-191.054 191.054a10 10 0 01-14.14 0l-94.43-94.43-82.043 82.047 183.542 183.543 102.536-102.53c3.902-3.907 10.234-3.907 14.14 0s3.907 10.237 0 14.144L214.758 408.07a10 10 0 01-7.07 2.93zm0 0" />
                                <path d="M345.66 273.188c-2.64 0-5.21-1.067-7.07-2.93a10.023 10.023 0 01-2.93-7.07 10.02 10.02 0 012.93-7.067 10.063 10.063 0 017.07-2.933c2.63 0 5.211 1.07 7.07 2.933a10.07 10.07 0 012.93 7.067c0 2.632-1.07 5.21-2.93 7.07a10.063 10.063 0 01-7.07 2.93zm0 0" />
                              </g>
                            </svg>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </Center>
              );
            })}
          </SimpleGrid>
        </Box>
      </Layout>
    </PleaseSignIn>
  );
}
