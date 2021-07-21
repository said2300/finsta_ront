import { useEffect, useState } from "react";

import { Layout } from "@components/core/Layout";
import PleaseSignIn from "@components/core/PleaseSignIn";
import { isError, useQuery } from "react-query";
import { getNotificationsHebergeur } from "@services/notifications";
import useAuth from "@context/context";

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

export default function Notifications() {
  const { isAuthenticated, loading, user } = useAuth();
  console.log("dayactual", dayActuel);

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
      {isError && "Une erreur est survenu !"}

      <Box
        h="120px"
        maxWidth="1400px"
        w="600px"
        display="flex"
        flexDirection="column"
        ml="20px"
      >
        <Link href="/hebergeurs/notifications">
          <Box display="flex" alignItems="center">
            <Box w="40px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                width="100%"
                viewBox="0 0 510 510"
              >
                <rect width="100%" height="100%" fill="none" />
                <g class="currentLayer">
                  <g class="selected" fill="#8ae98a">
                    <path d="M180.556 435.556a74.538 74.538 0 006.28 30l34.36 10 34.36-10 10-15-10-15-37.5-10z" />
                    <path d="M330.556 435.556l-37.5-10-37.5 10v30l34.359 10 34.36-10a74.541 74.541 0 006.28-30zM186.837 465.556c11.806 26.936 38.532 45 68.719 45l10-22.5-10-22.5h-68.72z" />
                    <path d="M324.275 465.556h-68.72v45c30.25 0 56.94-18.123 68.72-45zM90.556 165.556h-30c0-57.897 47.103-105 105-105v30c-41.355 0-75 33.645-75 75z" />
                    <path d="M30.556 165.556h-30c0-90.981 74.019-165 165-165v30c-74.44 0-135 60.56-135 135zM345.556 60.556v30c41.353 0 75 33.644 75 75h30c0-57.896-47.101-105-105-105z" />
                    <path d="M480.556 165.556h30c0-90.98-74.016-165-165-165v30c74.438 0 135 60.559 135 135zM135.556 255.556v71.459l60 10 60-10 10-35.73-10-35.73-60-10z" />
                    <path d="M375.556 255.556l-60-10-60 10v71.459l60 10 60-10v-71.46zM103.785 390.556l-22.5 45h174.27l10-22.5-10-22.5-75.884-10z" />
                    <path d="M407.327 390.556l-75.885-10-75.886 10v45h174.27l-22.5-45zM135.556 225.556v30h120l10-75-10-75c-66.167 0-120 53.83-120 120z" />
                    <path d="M375.556 225.556c0-66.167-53.83-120-120-120v150h120v-30zM135.556 327.015l-31.771 63.54h151.77l10-31.77-10-31.77h-120z" />
                    <path d="M375.556 327.015h-120v63.54h151.77l-31.77-63.54z" />
                  </g>
                </g>
              </svg>
            </Box>
            <Text ml="5px">Notifications</Text>
          </Box>
        </Link>
        <Box h="300px" overflow=" auto" overflow-x=" hidden">
          {notifications?.data["hydra:member"].reverse().map((e, i) => {
            return (
              <>
                <Box
                  w="650px"
                  maxWidth="1400px"
                  display="flex"
                  fontSize="18px"
                  mb="10px"
                  mt="20px"
                >
                  {e.createdAt.substr(0, 10).split("-").reverse().join("/") ===
                  dayActuel ? (
                    <>
                      <Box
                        w="400px"
                        display="flex"
                        justifyContent="center"
                        textAlign="center"
                      >
                        <Text fontSize="14px" fontWeight="bold">
                          {e.notificationText}
                        </Text>
                      </Box>

                      <Box w="100px" fontSize="14px"></Box>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </>
            );
          })}
        </Box>
      </Box>
    </PleaseSignIn>
  );
}
