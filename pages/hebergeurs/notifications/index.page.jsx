import { useEffect, useState } from "react";

import { Layout } from "@components/core/Layout";
import PleaseSignIn from "@components/core/PleaseSignIn";
import { isError, useQuery } from "react-query";
import { getNotificationsHebergeur } from "@services/notifications";
import useAuth from "@context/context";
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
} from "@chakra-ui/react";
import { dayActuel } from "@root/utils/dayActuel";

export default function NotificationsPage() {
  const { isAuthenticated, loading, user } = useAuth();
  const { mesBiens, isLoading: isLoadingMesbiens } = useMesBiens();

  const { isLoading, isError, data: notifications, refetch } = useQuery(
    ["notifications", user],
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    () => user && getNotificationsHebergeur(user?.id),
    {
      onSuccess: (data) => {},
    }
  );
  if (isLoading) {
    return (
      <Layout>
        <Text m="30px 0" textAlign="center" fontSize="30px">
          Chargements de vos statistiques...
        </Text>
      </Layout>
    );
  }

  return (
    <PleaseSignIn permissions={["ROLE_PROPRIO"]}>
      <Layout>
        {mesBiens?.length ? (
          <Box>
            <Heading
              as="h1"
              textAlign="center"
              pt="30px"
              pb="30px"
              mb={5}
              mt="10px"
              size="xl"
            >
              Vos notifications
            </Heading>

            {isError && "Une erreur est survenu !"}
            <Center>
              <Box
                width={["80%", "90%"]}
                h="38px"
                bg="#F8F8FF"
                color="#000"
                display={["none", "flex"]}
                fontWeight="semibold"
                justifyContent="space-between"
                pr={20}
                pl={20}
                fontSize="22px"
                mb="20px"
                borderRadius="10px"
              >
                <Box w="53%">
                  <Text>Notifications</Text>
                </Box>
                <Text>Date</Text>
                <Text>Statut</Text>
              </Box>
            </Center>
            <Center>
              <Box maxWidth="1400px" w="1180px" minHeight="400px">
                {notifications?.data["hydra:member"].reverse().map((e, i) => {
                  return (
                    <Box
                      w="100%"
                      maxWidth="1400px"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      fontSize="18px"
                      mb="10px"
                    >
                      {e.createdAt
                        .substr(0, 10)
                        .split("-")
                        .reverse()
                        .join("/") === dayActuel ? (
                        <>
                          <Box w="650px" minHeight="50px">
                            <Text fontWeight="bold">{e.notificationText}</Text>
                          </Box>
                          <Box w="100px">
                            <Text>
                              {e.createdAt
                                .substr(0, 10)
                                .split("-")
                                .reverse()
                                .join(" ")}
                            </Text>
                          </Box>
                          <Box w="100px">
                            <Text>Nouveauté</Text>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box w="650px" minHeight="50px">
                            <Text fontWeight="bold">{e.notificationText}</Text>
                          </Box>
                          <Box w="100px">
                            <Text>
                              {e.createdAt
                                .substr(0, 10)
                                .split("-")
                                .reverse()
                                .join(" ")}
                            </Text>
                          </Box>
                          <Box w="100px">
                            <Text>Antérieure</Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Center>
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
    </PleaseSignIn>
  );
}
