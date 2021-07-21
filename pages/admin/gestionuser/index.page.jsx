//React
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { isError, useQuery } from "react-query";

//Context
import { useRouter } from "next/router";
import useAuth from "@context/context";

//Services
import { getUsers, deleteUserId, putUserId } from "@services/user";

//Composant
import FlecheRetour from "../../../components/ui/ArrowBack";

//Styles

import { Layout } from "@components/core/Layout";
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
  Img,
} from "@chakra-ui/react";

export default function GestionUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, loading } = useAuth();

  const router = useRouter();

  const [userToModified, setUserToModified] = useState({
    id: 1,
    role: "User",
    nom: "Barre",
    mail: "barre@gmail.com",
  });

  const { isLoading, isError, data: users, refetch } = useQuery(
    "users",
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    getUsers
  );

  const toast = useToast();

  const deleteUser = async (id) => {
    try {
      await deleteUserId(id);

      toast({
        position: "top",
        title: "L'utilisateur a bien été supprimé",
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
    <Layout h="100vh">
      <Box w="30px" ml={["10px", "initial"]}>
        <FlecheRetour></FlecheRetour>
      </Box>
      <Heading as="h1" textAlign="center" marginTop={10} ml={2} mr={2} mb={10}>
        Gestion des utilisateurs
      </Heading>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalForm
          userToModified={userToModified}
          onClose={onClose}
          callUsers={refetch}
        />
      </Modal>
      <Center>
        <Box
          width={["80%", "90%"]}
          h="35px"
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
          <Text w="100px">Id user</Text>
          <Text w="100px">Nom</Text>
          <Text w="220px">Mail</Text>

          <Text>Gérer</Text>
        </Box>
      </Center>

      <SimpleGrid minChildWidth="100%" spacing="5px">
        {users.data["hydra:member"].map((e, i) => (
          <Center>
            <Box
              pr={[5, 10]}
              pl={[5, 10]}
              borderWidth="1px"
              bg="#F8F8FF"
              borderRadius="md"
              h={["200px", "100px"]}
              width={["80%", "90%"]}
              display="flex"
              flexDirection={["column", "row"]}
              justifyContent="space-between"
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

              <Box w={["initial", "100px"]}>
                <Text fontSize="18px" fontWeight="semibold" lineHeight="short">
                  {e.lastName}
                </Text>
              </Box>
              <Box w={["initial", "220px"]}>
                <Text fontSize="18px" fontWeight="semibold" lineHeight="short">
                  {e.email}
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
                    setUserToModified({
                      id: e.id,
                      email: e.email,
                      firstName: e.firstName,
                      lastName: e.lastName,
                      phone: e.phone,
                    });
                    onOpen();
                  }}
                  bg="#89E98A"
                  _hover={{
                    background: "#8ae98a",
                  }}
                  boxShadow="lg"
                  fontSize="15px"
                >
                  Modifier
                </Button>

                <Button
                  onClick={() => {
                    deleteUser(e.id);
                  }}
                  bg="#BA2F2F"
                  color="#FFF"
                  boxShadow="lg"
                  fontSize="15px"
                >
                  Supprimer
                </Button>
              </Box>
            </Box>
          </Center>
        ))}
      </SimpleGrid>
    </Layout>
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
