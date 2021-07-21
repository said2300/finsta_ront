//React
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

//Context
import useAuth from "@context/context";

//Composant
import FlecheRetour from "../../../components/ui/ArrowBack";
import PleaseSignIn from "@components/core/PleaseSignIn";

//Services
import { uploadPhoto } from "@services/photo";
import { postComments } from "@services/commentaire";
import { getReservationProprio } from "@services/properties";

import { isError, useQuery } from "react-query";
//Styles
import { Layout } from "@components/core/Layout";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  Center,
  Text,
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function Historique() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, loading, user } = useAuth();
  const mutation = useMutation((infos) => {
    const { id, status } = infos;
    handleBien(id, status);
  });

  const router = useRouter();

  const [selectComment, setSelectComment] = useState({});

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
        <Box maxWidth="1600px">
          <FlecheRetour />

          <Heading as="h1" textAlign="center" marginTop={10} mb={5} size="xl">
            Donnez votre avis!
          </Heading>
          {mutation.isSuccess ? (
            <div>Le changement a été pris en compte</div>
          ) : null}
          <Center>
            <Box
              maxWidth="1600px"
              width={["80%", "70%"]}
              h="60px"
              bg="#F8F8FF"
              color="#000"
              display={["none", "flex"]}
              fontWeight="semibold"
              justifyContent="space-around"
              alignItems="center"
              fontSize="22px"
              mb="20px"
              borderRadius="10px"
            >
              <Box>
                <Text>Votre atypik house</Text>
              </Box>
              <Box>
                <Text pr="40px">Status</Text>
              </Box>
            </Box>
          </Center>
          <SimpleGrid minChildWidth="100%" spacing="5px">
            {reservations?.["hydra:member"].map((e, i) => {
              return (
                <>
                  <Center>
                    <Box
                      maxWidth="1600px"
                      borderWidth="1px"
                      bg="#F8F8FF"
                      borderRadius="md"
                      h={["240px", "120px"]}
                      width={["85%", "70%"]}
                      display="flex"
                      flexDirection={["column", "row"]}
                      justifyContent="space-around"
                      alignItems="center"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      mb="10px"
                      borderRadius="10px"
                    >
                      <Box
                        fontSize={["20px", "20px"]}
                        fontWeight="bold"
                        lineHeight="short"
                        key={i}
                        w={["initial", "200px"]}
                      >
                        <Text>{e.property.title}</Text>
                      </Box>

                      <Box>
                        <Box
                          color="#a53c3c"
                          fontSize="18px"
                          fontWeight="bold"
                          borderRadius="5px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          m={2}
                          textAlign="center"
                          w="200px"
                        >
                          {e.status === "aceptee" || e.status === "acceptee"
                            ? "Laisse ton avis en cliquant sur commentez les activités!"
                            : "Vous ne pouvez pas laisser de commentaire"}
                        </Box>
                      </Box>
                    </Box>
                  </Center>
                  {e.status === "acceptee" || e.status === "aceptee" ? (
                    <Center>
                      <Accordion allowToggle width={["85%", "70%"]}>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box flex="1" textAlign="left" mb="40px">
                                <Text
                                  fontSize="20px"
                                  fontWeight="bold"
                                  textAlign="center"
                                  key={i}
                                >
                                  Commentez les activités
                                </Text>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          {e.property.activities.map((activities, i) => {
                            return (
                              <AccordionPanel pb={4}>
                                <>
                                  <Box>
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <Text
                                        minW="30%"
                                        fontSize="20px"
                                        mr="20px"
                                        fontWeight="bold"
                                      >
                                        {activities.title}
                                      </Text>
                                      <Button
                                        _hover={{ backgroundColor: "#a53c3c" }}
                                        onClick={() => {
                                          setSelectComment({
                                            dateStart: e.dateStart
                                              .substr(0, 10)
                                              .split("-")
                                              .reverse()
                                              .join("-"),
                                            dateEnd: e.dateEnd
                                              .substr(0, 10)
                                              .split("-")
                                              .reverse()
                                              .join("-"),
                                            id: e.property["@id"].split("/")[3],
                                            idReservation: e["@id"],
                                            user: e.user,
                                            activities: activities["@id"],
                                          });
                                          onOpen();
                                        }}
                                        bg="#89E98A"
                                        _hover={{
                                          background: "#8ae98a",
                                        }}
                                        boxShadow="lg"
                                        fontSize="18px"
                                        w="150px"
                                        p={2}
                                        m={2}
                                      >
                                        Commentez
                                      </Button>
                                    </Box>
                                  </Box>
                                </>
                              </AccordionPanel>
                            );
                          })}
                        </AccordionItem>
                      </Accordion>
                    </Center>
                  ) : (
                    <Text></Text>
                  )}
                </>
              );
            })}
            <Box
              display="flex"
              justifyContent="space-around"
              flexDirection={["row", "column"]}
            >
              <Box>
                <Modal
                  blockScrollOnMount={false}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalConfirmation
                    datestart={selectComment.dateStart}
                    dateEnd={selectComment.dateEnd}
                    id={selectComment.id}
                    idReservation={selectComment.idReservation}
                    user={selectComment.user}
                    activities={selectComment.activities}
                  />
                </Modal>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Layout>
    </PleaseSignIn>
  );
}

function ModalConfirmation({ idReservation, activities, pictures }) {
  const router = useRouter();

  const toast = useToast();

  const { register, watch, control, errors, handleSubmit } = useForm();
  const onSubmit = async ({ comment, pictures }) => {
    try {
      const responseImg = await uploadPhoto(pictures[0]);
      const objectToSend = {
        commentContent: comment,
        activities,
        reservation: idReservation,
        pictures: responseImg["@id"],
      };
      await postComments(objectToSend);

      toast({
        position: "top",
        title: "Le commentaire a bien été posté",
        description: "Merci pour votre participation",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/espace-personnel");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalContent backgroundColor="#fff" color="#000">
      <ModalHeader>Commentez l'activité</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl m="3px">
            <FormLabel fontWeight="bold" color="#000" fontSize="18px">
              Commentaire
            </FormLabel>

            <Input
              _hover={{
                background: "#FFF",
                color: "#534b4f",
              }}
              borderColor={["#696969"]}
              focusBorderColor="#C64D4D"
              fontSize="18px"
              placeholder=" Superbe activité, moniteur au top"
              type="text"
              name="comment"
              ref={register({ required: true })}
              h="60px"
            />
            <input
              name="pictures"
              type="file"
              ref={register({ required: true })}
            />
          </FormControl>
          <Button
            mt="20px"
            type="submit"
            _hover={{ backgroundColor: "#1bd142" }}
            color="white"
            bg="#1bd142"
            mr={3}
          >
            Envoyer le commentaire
          </Button>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button>Fermer</Button>
      </ModalFooter>
    </ModalContent>
  );
}
