//React
import { useMutation, useQuery, isError } from "react-query";

//Context
import useAuth from "@context/context";
import { useRouter } from "next/router";

//Composant
import ArrowBack from "../../../components/ui/ArrowBack";

//Services
import {
  getPropertiesUser,
  getReservationProprio,
  handleReservation,
} from "@services/properties";

//Styles
import { Layout } from "@components/core/Layout";

import {
  Box,
  Button,
  Heading,
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
  Lorem,
} from "@chakra-ui/react";

export default function GestionReservation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  //Patch reservation
  const mutation = useMutation((infos, onClose) => {
    const { id, status } = infos;
    handleBien(id, status);
    onClose();
  });

  //Get toutes les réservations de l'id hebergeur
  const { isLoading, isError, data: reservations, refetch } = useQuery(
    ["reservations", user],

    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect

    () => user && getReservationProprio(),

    { refetchOnWindowFocus: false }
  );

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
    <Layout>
      <Box maxWidth="1600px" minH={["500px", "675px"]}>
        <ArrowBack />
        <Heading as="h1" textAlign="center" pt="5px" size="xl" margin={10}>
          Gestion des réservations
        </Heading>
        {mutation.isSuccess ? (
          <div>Le changement a été pris en compte</div>
        ) : null}
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
            pl={10}
            fontSize="22px"
            mb="20px"
            borderRadius="10px"
          >
            <Text>Bien</Text>
            <Text>Date d'arrivée/départ</Text>
            <Text>Montant</Text>

            <Text pr="40px">Status</Text>
            <Text>Gérer</Text>
          </Box>
        </Center>
        <SimpleGrid minChildWidth="100%" spacing="5px">
          {reservations?.["hydra:member"].map((e, i) => {
            return (
              <Center>
                <Box
                  pr={[5, 10]}
                  pl={[5, 10]}
                  borderWidth="1px"
                  bg="#F8F8FF"
                  borderRadius="md"
                  h={["240px", "120px"]}
                  width={["85%", "90%"]}
                  display="flex"
                  flexDirection={["column", "row"]}
                  justifyContent="space-between"
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
                    <Text>{e.property["@id"].split("/")[3]}</Text>
                  </Text>

                  <Box
                    m={2}
                    display="flex"
                    flexDirection={["column", "column"]}
                    justifyContent="center"
                    alignItems="center"
                    w={["250px", "200px"]}
                  >
                    {" "}
                    <Text fontWeight="semibold" fontSize={["20px", "20px"]}>
                      Du {e.dateStart.substr(0, 10)}
                    </Text>
                    <Text fontWeight="semibold" fontSize={["20px", "20px"]}>
                      au {e.dateEnd.substr(0, 10)}
                    </Text>
                    <Text fontWeight="semibold" fontSize="20px"></Text>
                  </Box>
                  <Box>
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

                  <Box>
                    {e.status === "en attente" ? (
                      <>
                        <Box
                          backgroundColor="#FF8C00"
                          color="white"
                          borderRadius="3px"
                          pb={2}
                          w={["220px", "220px"]}
                        >
                          <Text
                            textAlign="center"
                            fontSize="18px"
                            fontWeight="semibold"
                          >
                            En attente de validation
                          </Text>
                        </Box>
                      </>
                    ) : e.status === "rejetee" ? (
                      <>
                        <Box
                          backgroundColor="#000"
                          w={["80px", "normal"]}
                          color="white"
                          borderRadius="3px"
                          p={1}
                        >
                          <Text
                            textAlign="center"
                            fontSize="18px"
                            fontWeight="semibold"
                          >
                            Rejeté
                          </Text>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          backgroundColor="#8ae98a"
                          color="#000"
                          borderRadius="3px"
                          p={1}
                        >
                          <Text
                            textAlign="center"
                            fontSize="18px"
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
                    justifyContent="space-around"
                    flexDirection={["row", "column"]}
                  >
                    {e.status === "en attente" ? (
                      <>
                        <Button
                          onClick={() => {
                            setUserToModified({
                              id: e.id,
                              email: e.email,
                              firstName: e.firstName,
                              lastName: e.lastName,
                              phone: e.phone,
                            });
                            onOpen();
                          }}
                          bg="#67E767"
                          _hover={{
                            background: "#67E767",
                          }}
                          color="#000"
                          boxShadow="lg"
                          fontSize="18px"
                          p={5}
                          m={2}
                          w="120px"
                          onClick={onOpen}
                        >
                          Valider
                        </Button>
                        <Modal
                          blockScrollOnMount={false}
                          isOpen={isOpen}
                          onClose={onClose}
                        >
                          <ModalOverlay />
                          <ModalConfirmation
                            datestart={e.dateStart
                              .substr(0, 10)
                              .split("-")
                              .reverse()
                              .join("-")}
                            dateEnd={e.dateEnd
                              .substr(0, 10)
                              .split("-")
                              .reverse()
                              .join("-")}
                            id={e.property["@id"].split("/")[3]}
                            idReservation={e["@id"].split("/")[3]}
                          />
                        </Modal>

                        <Button
                          onClick={() => {
                            toast({
                              position: "top",
                              title:
                                "Veuillez contactez le locataire pour bloquer la réservation",
                              description: "",
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                          bg="#BA2F2F"
                          _hover={{
                            background: "#BA2F2F",
                          }}
                          color="#FFF"
                          boxShadow="lg"
                          fontSize="18px"
                          w="120px"
                          p={5}
                          m={2}
                        >
                          Bloquer
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => {
                            toast({
                              position: "top",
                              title:
                                "Veuillez contactez le locataire pour bloquer la réservation",
                              description: "",
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                          bg="#BA2F2F"
                          _hover={{
                            background: "#BA2F2F",
                          }}
                          color="#FFF"
                          boxShadow="lg"
                          fontSize="18px"
                          w="120px"
                          p={5}
                          m={2}
                        >
                          Bloquer
                        </Button>
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
  );
}

function ModalConfirmation({
  onClose,
  dateStart,
  dateEnd,
  montant,
  user,
  property,
  numberTraveler,
  email,
  numberaddress,
  titlebien,
  tax,
  prix,
  nbday,
  codepostal,
  rue,
  ville,
  datestart,
  id,
  idReservation,
}) {
  const router = useRouter();
  const mutation = useMutation((infos) => {
    const { id, status } = infos;
    handleReservation(id, status);
  });

  return (
    <ModalContent backgroundColor="#fff" color="#000">
      <ModalHeader>Confirmation de la demande de réservation</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Text fontSize="20px" fontWeight="semibold">
          Numéro de votre logement: {id}
        </Text>
        <Text fontSize="20px" fontWeight="semibold">
          Date d'arrivée: {datestart}
        </Text>
        <Text fontSize="20px" mb="20px" fontWeight="semibold">
          Date de départ: {dateEnd}
        </Text>
        <Text color="#DC143C" fontWeight="semibold">
          Attention: Les réservations sur la même période seront automatiquement
          refusés.
        </Text>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={() =>
            mutation.mutate({
              id: idReservation,
              status: "acceptee",
            })
          }
          colorScheme="blue"
          mr={3}
        >
          Accepter
        </Button>
        <Button>Fermer</Button>
      </ModalFooter>
    </ModalContent>
  );
}
