//React

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isError, useQuery } from "react-query";

import FlecheRetour from "../../../components/ui/ArrowBack";
import PleaseSignIn from "@components/core/PleaseSignIn";

//Context

import { useRouter } from "next/router";
import useAuth from "@context/context";

//Services

import { getComments, deleteCommentsId } from "@services/commentaire";

//Styles

import { Layout } from "@components/core/Layout";

import {
  Box,
  Button,
  Heading,
  Input,
  useToast,
  Center,
  Wrapper,
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

export default function GestionCommentaire() {
  //Context
  const { isAuthenticated, loading } = useAuth();

  //Router
  const router = useRouter();

  //Gestion Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Gestion erreur
  const toast = useToast();

  //Appel de la fonction getComments
  const { isLoading, isError, data: comments, refetch } = useQuery(
    "comments",
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    getComments
  );

  //Requete delete comment
  const deleteComment = async (id) => {
    try {
      await deleteCommentsId(id);

      toast({
        position: "top",
        title: "Le commentaire a bien été supprimé",
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
    <PleaseSignIn permissions={["ROLE_ADMIN"]}>
      <Layout h="100vh">
        <Box w="30px" ml={["10px", "initial"]}>
          <FlecheRetour></FlecheRetour>
        </Box>
        <Heading
          as="h1"
          textAlign="center"
          marginTop={10}
          ml={2}
          mr={2}
          mb={10}
        >
          Gestion des commentaires
        </Heading>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalForm onClose={onClose} callUsers={refetch} />
        </Modal>
        <Center>
          <Box
            width={["80%", "80%"]}
            h="35px"
            bg="#F8F8FF"
            color="#000"
            display={["none", "flex"]}
            fontWeight="semibold"
            justifyContent="space-around"
            pr={20}
            pl={10}
            fontSize="22px"
            mb="20px"
            borderRadius="10px"
          >
            <Text w="100px">Id user</Text>

            <Text w="220px">Date de publication</Text>

            <Text>Gérer</Text>
          </Box>
        </Center>

        <SimpleGrid minChildWidth="100%" spacing="5px">
          {comments.data["hydra:member"].map((e, i) => (
            <>
              <Center>
                <Box
                  marginTop={5}
                  pr={[5, 10]}
                  pl={[5, 10]}
                  borderWidth="1px"
                  bg="#F8F8FF"
                  borderRadius="md"
                  h={["200px", "100px"]}
                  width={["80%", "80%"]}
                  display="flex"
                  flexDirection={["column", "row"]}
                  justifyContent="space-around"
                  alignItems="center"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  mb="10px"
                  borderRadius="10px"
                >
                  <Box w={["initial", "100px"]}>
                    <Text
                      fontSize="18px"
                      fontWeight="semibold"
                      lineHeight="short"
                      key={i}
                    >
                      N°{e.id}
                    </Text>
                  </Box>

                  <Box w={["initial", "150px"]}>
                    <Text
                      fontSize="18px"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {e.PublishedAt.substr(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection={["row", "column"]}
                    justifyContent={["space-around"]}
                    h={["50px", "100%"]}
                    w={["100%", "initial"]}
                  >
                    <Button
                      onClick={() => {
                        deleteComment(e.id);
                      }}
                      bg="#89E98A"
                      _hover={{
                        background: "#8ae98a",
                      }}
                      boxShadow="lg"
                      fontSize="17px"
                      fontWeight="bold"
                      p={5}
                    >
                      Supprimer
                    </Button>
                  </Box>
                </Box>
              </Center>
              <Center>
                <Box w="80%" minHeight={["110px", "100px"]}>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Text
                              fontSize="20px"
                              fontWeight="bold"
                              textAlign="center"
                              key={i}
                            >
                              Voir le commentaire
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Box
                          p={1}
                          w="100%"
                          borderRadius="5px"
                          border="solid #000 2px"
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          minHeight="150px"
                        >
                          <Box>
                            {e.comment_content.split(" ").map((e, i) => (
                              <>
                                {e === "salaud" ||
                                e === "encule" ||
                                e === "merde" ||
                                e === "connard" ? (
                                  <>
                                    <Text mb="5px" fontSize="16px">
                                      {e.comment_content}
                                    </Text>
                                    <Text
                                      p={1}
                                      borderRadius="5px"
                                      backgroundColor="#d63e3e"
                                      color="#fff"
                                      mb="5px"
                                      fontSize="16px"
                                      fontWeight="bold"
                                    >
                                      Mots interdit : {e}
                                    </Text>
                                  </>
                                ) : (
                                  <Text mb="5px" fontSize="18px">
                                    {e.comment_content}
                                  </Text>
                                )}
                              </>
                            ))}
                          </Box>
                          <Text mb="5px" fontSize="18px" key={i}>
                            {e.comment_content}
                          </Text>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </Center>
            </>
          ))}
        </SimpleGrid>
      </Layout>
    </PleaseSignIn>
  );
}

const ModalForm = ({ userToModified, onClose, defaultValues, callUsers }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: userToModified,
  });

  const onSubmit = async (data) => {
    await putUserId(userToModified.id, data);
    onClose();
    callUsers();
  };

  return (
    <ModalContent backgroundColor="#fff" color="#000">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Modifier l'user</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input name="firstName" ref={register} />
          <Input name="lastName" ref={register} />
          <Input
            name="email"
            ref={register({
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              },
            })}
          />
          {errors.email?.type === "pattern" &&
            "L'addresse email doit être sous la forme jean@gmail.com"}

          <Text count={2} />
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue" mr={3}>
            Accepter
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Fermer
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  );
};
