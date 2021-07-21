import { Layout } from "@components/core/Layout";
import Notifications from "../../components/core/Notif";
//React
import { useEffect, useState } from "react";

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
  Image,
  Spinner,
} from "@chakra-ui/react";
import PleaseSignIn from "@components/core/PleaseSignIn";
import useAuth from "@context/context";

import { isError, useQuery } from "react-query";
import { getUserId } from "@services/user";

export default function DashboardProprio() {
  const { mesBiens, isLoading: isLoadingMesbiens } = useMesBiens();
  const [mesBienStatus, setMesBienStatus] = useState({
    biensCompteur: [],
  });

  const { isAuthenticated, loading, user } = useAuth();
  const { isLoading, isError, data: userdata, refetch } = useQuery(
    ["userdata", user],
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect

    () => user && getUserId(user?.id)
  );
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if (isLoading || isLoadingMesbiens) {
    return (
      <Layout h="100vh">
        <Box h="71vh" display="flex" justifyContent="center">
          <Center>
            <Spinner size="xl" />
          </Center>
        </Box>
      </Layout>
    );
  }
  return (
    <PleaseSignIn permissions={["ROLE_PROPRIO"]}>
      <Layout>
        {mesBiens?.length ? (
          <Center>
            <Box
              h={["82vh", "71vh"]}
              w="75%"
              maxWidth="1400px"
              mb={["60px", "0"]}
            >
              <Text textAlign="end" fontWeight="bold" fontSize="15px">
                {user?.roles}
              </Text>

              <Box
                pt="20px"
                mb="30px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text mr="8px" fontSize="30px">
                  Bonjour
                </Text>

                <Text fontWeight="bold" fontSize="30px">
                  {userdata?.data.firstName},
                </Text>
              </Box>
              <Box h="100px">
                <Notifications></Notifications>
              </Box>
              <Box
                display={["flex"]}
                flexDirection={["column", "row"]}
                justifyContent="space-around"
                alignItems="center"
                w={["100%", "100%", "100%", "100%"]}
                p={[0, 0, 0, 10]}
                mt="20px"
              >
                <Link
                  href="/hebergeurs/reservation"
                  _hover={{
                    textDecoration: "#8ae98a solid 3px",
                  }}
                >
                  <Box
                    w={["300px", "300px", "300px", "400px"]}
                    minHeight={["100px", "150px"]}
                    _hover={{
                      border: "#8ae98a solid 5px",
                      transition: "0.2s",
                    }}
                    borderRadius="10px"
                    textColor="#000"
                    minWidth="250px"
                    bg="#F8F8FF"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    opacity="0.8"
                    fontSize="2xl"
                    boxShadow=" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                    mb={["10px", "initial"]}
                    mr={[0, 0, "10px", "10px", 0]}
                  >
                    <Box mr="20px" w={["40px", "60px"]}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 682.67 682"
                      >
                        <rect width="100%" height="100%" fill="none" />
                        <g class="currentLayer">
                          <path
                            d="M312.336 136.48h-18.75v-18.75h18.75zm-31.25 0h-18.75v-18.75h18.75zm0 0M560.098 621.25H17.082V212.844h-18.75V640h580.516V212.844h-18.75zm0 0M164.055 137.73l15.25-15.253V15.25L164.055 0h-41.649l-15.254 15.25v107.227l15.254 15.253zM125.902 23.016l4.266-4.266h26.121l4.266 4.266v91.695l-4.266 4.27h-26.121l-4.266-4.27zm0 0M454.773 137.73l15.254-15.253V15.25L454.773 0h-41.648l-15.25 15.25v107.227l15.25 15.253zM416.625 23.016l4.266-4.266h26.12l4.266 4.266v91.695l-4.265 4.27H420.89l-4.266-4.27zm0 0"
                            fill="#8ae98a"
                          />
                          <path
                            d="M485.652 59.488v18.75h74.446v100.23H17.082V78.239h74.445v-18.75H-1.668v137.73h580.516V59.489zm0 0"
                            fill="#8ae98a"
                          />
                          <path
                            d="M194.93 59.488h187.32v18.75H194.93zm0 0"
                            fill="#8ae98a"
                          />
                          <path
                            d="M398.945 247.61L243.23 403.32l-64.996-64.996-75.355 75.356 140.348 140.347 231.07-231.062zM129.398 413.68l48.836-48.836 64.996 64.996 155.715-155.715 48.836 48.84-204.55 204.55zm0 0"
                            fill="#484848"
                          />
                        </g>
                      </svg>
                    </Box>
                    <Text>Mes réservations</Text>
                  </Box>
                </Link>
                {user && (
                  <Link
                    href={`/hebergeurs/bien/${user?.id}`}
                    _hover={{
                      textDecoration: "#8ae98a solid 3px",
                    }}
                  >
                    <Box
                      w={["300px", "300px", "300px", "400px"]}
                      minHeight={["100px", "150px"]}
                      _hover={{
                        border: "#8ae98a solid 5px",
                        transition: "0.2s",
                      }}
                      borderRadius="10px"
                      textColor="#000"
                      minWidth="250px"
                      bg="#F8F8FF"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      opacity="0.8"
                      fontSize="2xl"
                      boxShadow=" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                    >
                      <Box mr="20px" w={["40px", "60px"]}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 510 510"
                        >
                          <rect width="100%" height="100%" fill="none" />
                          <g class="currentLayer">
                            <path
                              d="M464.984 390.19v-76.03H269.889v-44.864h102.96v-15c0-51.256-32.863-94.974-78.624-111.208 22.514-13.445 37.63-38.047 37.63-66.122C331.856 34.527 297.33 0 254.89 0S177.92 34.527 177.92 76.967c0 28.075 15.117 52.677 37.63 66.122-45.76 16.234-78.623 59.952-78.623 111.208v15h102.96v44.864H44.795v76.03H-1.111V512h121.81V390.19H74.794v-46.03h165.095v46.03h-45.905V512h121.81V390.19H269.89v-46.03h165.095v46.03h-45.905V512h121.81V390.19h-45.905zm-374.285 30V482h-61.81v-61.81h61.81zM207.92 76.967C207.92 51.069 228.99 30 254.889 30c25.897 0 46.967 21.069 46.967 46.967s-21.07 46.967-46.967 46.967-46.968-21.069-46.968-46.967zm77.873 343.223V482h-61.811v-61.81h61.81zM168.207 239.297c7.14-41.382 43.292-72.961 86.682-72.961s79.542 31.579 86.682 72.961H168.207zM480.889 482h-61.81v-61.81h61.81V482z"
                              fill="#8ae98a"
                            />
                          </g>
                        </svg>
                      </Box>
                      <Box>
                        <Text>Gestion des biens </Text>
                      </Box>
                    </Box>
                  </Link>
                )}
              </Box>

              <Box
                display="flex"
                flexDirection={["column", "row"]}
                justifyContent="space-around"
                alignItems="center"
                w="100%"
                p={[0, 10]}
                mt={["10px", "20px"]}
              >
                <Link
                  href="/hebergeurs/historique"
                  _hover={{
                    textDecoration: "#8ae98a solid 3px",
                  }}
                >
                  <Box
                    w={["300px", "300px", "300px", "400px"]}
                    minHeight={["100px", "150px"]}
                    _hover={{
                      border: "#8ae98a solid 5px",
                      transition: "0.2s",
                    }}
                    borderRadius="10px"
                    textColor="#000"
                    minWidth="250px"
                    bg="#F8F8FF"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    opacity="0.8"
                    fontSize="2xl"
                    boxShadow=" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                    mb={["10px", "initial"]}
                    mr={[0, 0, "10px", "10px", 0]}
                  >
                    <Box mr="20px" w={["40px", "60px"]}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 448 448"
                      >
                        <rect width="100%" height="100%" fill="none" />
                        <g class="currentLayer">
                          <g fill="#8ae98a">
                            <path d="M234.667 138.667v106.666l91.306 54.187 15.36-25.92-74.666-44.267v-90.666z" />
                            <path d="M255.893 32C149.76 32 64 117.973 64 224H0l83.093 83.093 1.493 3.093L170.667 224h-64c0-82.453 66.88-149.333 149.333-149.333S405.333 141.547 405.333 224 338.453 373.333 256 373.333c-41.28 0-78.507-16.853-105.493-43.84L120.32 359.68C154.987 394.453 202.88 416 255.893 416 362.027 416 448 330.027 448 224S362.027 32 255.893 32z" />
                          </g>
                        </g>
                      </svg>
                    </Box>
                    <Text>Mon historique global</Text>
                  </Box>
                </Link>
                <Link
                  href={`/hebergeurs/statistiques`}
                  _hover={{
                    textDecoration: "#8ae98a solid 3px",
                  }}
                >
                  <Box
                    w={["300px", "300px", "300px", "400px"]}
                    minHeight={["100px", "150px"]}
                    _hover={{
                      border: "#8ae98a solid 5px",
                      transition: "0.2s",
                    }}
                    borderRadius="10px"
                    textColor="#000"
                    minWidth="250px"
                    bg="#F8F8FF"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    opacity="0.8"
                    fontSize="2xl"
                    boxShadow=" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                  >
                    <Box w={["40px", "60px"]} mr="20px">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 478 478"
                      >
                        <rect width="100%" height="100%" fill="none" />
                        <g class="currentLayer">
                          <path
                            d="M119.5 187.75H17.1c-9.4 0-17 7.6-17.1 17.1v256c0 9.5 7.7 17.1 17.1 17.1h102.4c9.5 0 17.1-7.7 17.1-17.1v-256c0-9.5-7.7-17.1-17.1-17.1zM290.2.05H187.8c-9.4 0-17.1 7.6-17.1 17v443.8c0 9.5 7.7 17.1 17.1 17.1h102.4c9.5 0 17.1-7.7 17.1-17.1V17.15c0-9.5-7.7-17.1-17.1-17.1zM460.9 136.55H358.5c-9.5 0-17.1 7.6-17.1 17.1v307.2c0 9.5 7.7 17.1 17.1 17.1h102.4c9.5 0 17.1-7.7 17.1-17.1v-307.2c0-9.5-7.7-17.1-17.1-17.1z"
                            fill="#8ae98a"
                          />
                        </g>
                      </svg>
                    </Box>
                    <Text>Mes statistiques</Text>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Center>
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
    </PleaseSignIn>
  );
}
