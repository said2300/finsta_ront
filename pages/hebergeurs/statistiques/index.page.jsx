//React
import { useEffect, useState } from "react";

//Hook
import useMesBiens from "@root/hooks/useMesBiens";
import useMesReservations from "@root/hooks/useMesReservation";

//Composant
import FlecheRetour from "../../../components/ui/ArrowBack";
import PleaseSignIn from "@components/core/PleaseSignIn";

//Styles
import { Layout } from "@components/core/Layout";
import { Box, Heading, Text, Spinner, Center } from "@chakra-ui/react";

export default function StatistiquesPage() {
  //Hook
  const { mesBiens, isLoading, isError } = useMesBiens();
  const { mesReservations, data } = useMesReservations();

  const [mesBienStatus, setMesBienStatus] = useState({
    biensEnAttente: [],
    biensAcceptee: [],
    biensRefusee: [],
  });

  const [mesReservationStatus, setMesReservationStatus] = useState({
    reservationsEnAttente: [],
    reservationsAcceptee: [],
    reservationsRefusee: [],
  });

  //Permet au chargement de la page de filtrer (filter) les biens et les réservations pour les comparer avec les 3 valeurs en attente - accepté - refusé

  useEffect(() => {
    if (!mesBiens?.length) return;

    const biensEnAttente = mesBiens.filter((e) => e.status === "en attente");
    const biensAcceptee = mesBiens.filter((e) => e.status === "acceptee");
    const biensRefusee = mesBiens.filter((e) => e.status === "refusee");

    setMesBienStatus({ biensEnAttente, biensAcceptee, biensRefusee });
  }, [mesBiens]);

  useEffect(() => {
    if (!mesReservations?.length) return;

    const reservationsEnAttente = mesReservations.filter(
      (e) => e.status === "en attente"
    );
    const reservationsAcceptee = mesReservations.filter(
      (e) => e.status === "aceptee"
    );
    const reservationsRefusee = mesReservations.filter(
      (e) => e.status === "refusee"
    );

    setMesReservationStatus({
      reservationsEnAttente,
      reservationsAcceptee,
      reservationsRefusee,
    });
  }, [mesReservations]);

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

  return (
    <PleaseSignIn permissions={["ROLE_PROPRIO"]}>
      <Layout>
        <Box minHeight="68vh">
          <FlecheRetour></FlecheRetour>
          <Heading
            as="h1"
            textAlign="center"
            pt="10px"
            mb={20}
            mt="20px"
            size="xl"
          >
            Vos statistiques
          </Heading>

          {isError && "Une erreur est survenu !"}
          <Box
            display="flex"
            w="98%"
            justifyContent="space-around"
            fontWeight="semibold"
            fontSize={["16px", "22px"]}
          >
            <Text>Bien en attente</Text>
            <Text w={["initial", "130px"]}> Bien accepté</Text>
            <Text>Bien refusé</Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            w="100%"
            pt={10}
            fontSize="28px"
            color="#000"
          >
            <Box
              h="60px"
              w="60px"
              borderRadius="100%"
              justifyContent="center"
              alignItems="cenetr"
              bg="#8ae98a"
              display="flex"
            >
              <Text p={2} fontWeight="bold">
                {mesBienStatus.biensEnAttente?.length}
              </Text>
            </Box>
            <Box
              h="60px"
              w="60px"
              borderRadius="100%"
              justifyContent="center"
              alignItems="cenetr"
              bg="#8ae98a"
              display="flex"
            >
              <Text p={2} fontWeight="bold">
                {mesBienStatus.biensAcceptee?.length}
              </Text>
            </Box>
            <Box
              h="60px"
              w="60px"
              borderRadius="100%"
              justifyContent="center"
              alignItems="cenetr"
              bg="#8ae98a"
              display="flex"
            >
              <Text p={2} fontWeight="bold">
                {mesBienStatus.biensRefusee?.length}
              </Text>
            </Box>
          </Box>
          <Box
            display="flex"
            w="100%"
            justifyContent="space-around"
            fontWeight="semibold"
            fontSize={["16px", "22px"]}
            textAlign="center"
            mt={["50px", "100px"]}
          >
            <Text>Réservation en attente</Text>
            <Text> Réservation accepté</Text>
            <Text>Réservation refusé</Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            w="100%"
            pt={10}
            fontSize="28px"
            color="#000"
          >
            <Box
              h="60px"
              w="60px"
              borderRadius="100%"
              justifyContent="center"
              alignItems="cenetr"
              bg="#8ae98a"
              display="flex"
            >
              <Text p={2} fontWeight="bold">
                {mesReservationStatus.reservationsEnAttente?.length}
              </Text>
            </Box>
            <Box
              h="60px"
              w="60px"
              borderRadius="100%"
              justifyContent="center"
              alignItems="cenetr"
              bg="#8ae98a"
              display="flex"
            >
              <Text p={2} fontWeight="bold">
                {mesReservationStatus.reservationsAcceptee?.length}
              </Text>
            </Box>
            <Box
              h="60px"
              w="60px"
              borderRadius="100%"
              justifyContent="center"
              alignItems="cenetr"
              bg="#8ae98a"
              display="flex"
            >
              <Text p={2} fontWeight="bold">
                {mesReservationStatus.reservationsAcceptee?.length}
              </Text>
            </Box>
          </Box>
        </Box>
      </Layout>
    </PleaseSignIn>
  );
}
