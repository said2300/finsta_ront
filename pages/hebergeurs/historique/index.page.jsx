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
  Lorem,
  Img,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { uploadPhoto } from "@services/photo";
import FlecheRetour from "../../../components/ui/ArrowBack";

import {
  addDays,
  formatDistanceStrict,
  format,
  getTime,
  isSameDay,
} from "date-fns";
import {
  getPropertiesUser,
  getReservationProprio,
  handleReservation,
  getPropertiesId,
} from "@services/properties";
import { postComments } from "@services/commentaire";
import { useEffect, useState } from "react";
import useAuth from "@context/context";

import { useForm } from "react-hook-form";
import { isError, useQuery } from "react-query";

export default function Historique() {
  const { mesBiens, isLoading: isLoadingMesbiens } = useMesBiens();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, loading, user } = useAuth();
  const mutation = useMutation((infos) => {
    const { id, status } = infos;
    handleBien(id, status);
  });

  const router = useRouter();

  const [userToModified, setUserToModified] = useState({
    id: 1,
    role: "User",
    nom: "Barre",
    mail: "barre@gmail.com",
  });

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
    <Layout>
      {mesBiens?.length ? (
        <Box maxWidth="1600px" minH={["68vh"]}>
          <Box w="30px" ml={["10px", "initial"]}>
            <FlecheRetour></FlecheRetour>
          </Box>
          <Heading
            as="h1"
            textAlign="center"
            pt="20px"
            pb="20px"
            mb={5}
            size="xl"
          >
            Mon historique
          </Heading>
          {mutation.isSuccess ? (
            <div>Le changement a été pris en compte</div>
          ) : null}
          <Center>
            <Box
              maxWidth="1600px"
              width={["80%", "90%"]}
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
              <Box w="300px">
                <Text>Votre atypik house</Text>
              </Box>
              <Box w="150px">
                <Text pr="40px">Date</Text>
              </Box>
              <Box w="150px">
                <Text>Montant</Text>
              </Box>
              <Box w="150px">
                <Text>Status</Text>
              </Box>
            </Box>
          </Center>
          <SimpleGrid minChildWidth="100%" spacing="5px">
            {reservations?.["hydra:member"].map((e, i) => {
              return (
                <Center>
                  <Box
                    maxWidth="1600px"
                    borderWidth="1px"
                    bg="#F8F8FF"
                    borderRadius="md"
                    h={["260px", "120px"]}
                    width={["85%", "90%"]}
                    display="flex"
                    flexDirection={["column", "row"]}
                    justifyContent={["space-around", "space-around"]}
                    alignItems="center"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    mb="10px"
                    borderRadius="10px"
                  >
                    <Box
                      w={["100%", "300px"]}
                      fontSize={["20px", "20px"]}
                      fontWeight="bold"
                      lineHeight="short"
                      key={i}
                      display={["flex", "initial"]}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text>{e.property.title}</Text>
                    </Box>
                    <Box
                      w={["100%", "180px"]}
                      fontSize={["20px", "20px"]}
                      fontWeight="bold"
                      lineHeight="short"
                      display="flex"
                      flexDirection="column"
                      alignItems={["center", "initial"]}
                      key={i}
                    >
                      <Text>
                        <Text>
                          {e?.historical?.dateStart.date
                            .substr(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </Text>
                      </Text>
                      <Text>
                        {e?.historical?.dateEnd.date
                          .substr(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}
                      </Text>
                    </Box>
                    <Box
                      w={["100%", "100px"]}
                      fontSize={["20px", "20px"]}
                      fontWeight="bold"
                      lineHeight="short"
                      key={i}
                      display={["flex", "initial"]}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text>{e?.historical?.montant} €</Text>
                    </Box>

                    <Box
                      w={["100%", "200px"]}
                      display={["flex", "initial"]}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        _hover={{ backgroundColor: "#1bd142" }}
                        bg="#1bd142"
                        color="#FFF"
                        boxShadow="lg"
                        fontSize="18px"
                        h="40px"
                        w="150px"
                        fontWeight="bold"
                        borderRadius="5px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        m={2}
                        textAlign="center"
                      >
                        {e.status === "aceptee" ? "Effectué" : "Non effectué"}
                      </Box>
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
  activities,
  pictures,
}) {
  const router = useRouter();

  const { isLoading, isError, data: properties, refetch } = useQuery(
    "properties",
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    getPropertiesId(id)
  );
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
