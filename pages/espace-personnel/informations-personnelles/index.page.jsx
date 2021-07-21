//React NextJS
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isError, useQuery } from "react-query";

//Services
import { getUserId, deleteUserId, putUserId } from "@services/user";

//Context
import useAuth from "@context/context";
import { useForm } from "react-hook-form";

//Composant
import FlecheRetour from "../../../components/ui/ArrowBack";
import PleaseSignIn from "@components/core/PleaseSignIn";

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
  Link,
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
  Checkbox,
} from "@chakra-ui/react";

export default function GestionUser() {
  // Fonctionnement modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  //Utiliser le context
  const { isAuthenticated, loading, user } = useAuth();
  //Router utilisé pour manipuler les routes
  const router = useRouter();
  //State pour modifier les informations users
  const [userToModified, setUserToModified] = useState({
    id: 1,
    role: "User",
    nom: "Barre",
    mail: "barre@gmail.com",
  });
  //UseQuery => permet de lancer la requete getUserId à chaque chargement
  const { isLoading, isError, data: usersdata, refetch } = useQuery(
    ["usersdata", user],
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    () => user && getUserId(user?.id)
  );
  //useToast pour les messages de validation/refus
  const toast = useToast();
  const [checkedNewsLetters, setCheckedNewsLetters] = useState();
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
  //Permet d'attendre que les données soit chargé avec de lancer la page
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
        <Box w="30px" ml={["10px", "initial"]} mb="30px">
          <FlecheRetour></FlecheRetour>
        </Box>
        <Heading as="h1" textAlign="center" pt="40px" ml={2} mr={2} mb={10}>
          Gestion de mes informations personnelles
        </Heading>
        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <ModalForm
            userToModified={userToModified}
            onClose={onClose}
            callUsers={refetch}
          />
        </Modal>
        <Center>
          <Box
            w={["300px", "600px"]}
            boxShadow=" rgba(0, 0, 0, 0.35) 0px 5px 15px;"
            borderRadius="10px"
            mb={["40px", "80px"]}
          >
            <Box
              display="flex"
              flexDirection={["column", "initial"]}
              mb="40px"
              justifyContent="center"
            >
              <Box
                pl={[5, 10]}
                bg="#FFF"
                borderRadius="md"
                h={["200px", "300px"]}
                width={["80%", "100%"]}
                display={["none", "flex"]}
                flexDirection={["column", "column"]}
                justifyContent={["center", "space-around"]}
                textOverflow="ellipsis"
                overflow="hidden"
                borderRadius="10px"
                fontSize="22px"
              >
                <Text>Nom</Text>
                <Text>Prénom</Text>
                <Text>Mail</Text>
                <Text>Téléphone</Text>
                <Text>Newsletter</Text>
              </Box>

              <Box
                bg="#FFF"
                borderRadius="md"
                h={["200px", "300px"]}
                width={["100%", "100%"]}
                display="flex"
                flexDirection={["column", "column"]}
                justifyContent={["space-around", "space-around"]}
                alignItems={["center", "initial"]}
                textOverflow="ellipsis"
                overflow="hidden"
                borderRadius="10px"
                fontSize="22px"
                mt="5px"
              >
                <Box>
                  <Text
                    fontSize="22px"
                    fontWeight="semibold"

                    // key={i}
                  >
                    {usersdata.data?.firstName}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="22px" fontWeight="semibold">
                    {usersdata.data.lastName}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="22px" fontWeight="semibold">
                    {/* {e.email} */}
                    {usersdata.data.email}
                  </Text>
                </Box>
            
                <Box w="270px">
                  {usersdata.data.phone === null ? (
                    <Text
                      fontSize="16px"
                      lineHeight="short"
                      minHeight="30px"
                      color="#949494"
                      textAlign={["center", "initial"]}
                    >
                      {/* {e.email} */}
                      Modifier vos informations pour ajoutez votre numéro de
                      téléphone
                    </Text>
                  ) : (
                    <Text
                      fontSize="22px"
                      fontWeight="semibold"
                      lineHeight="short"
                      minHeight="30px"
                    >
                      {/* {e.email} */}
                      {usersdata.data.phone}
                    </Text>
                  )}
                </Box>
                <Box>
                {usersdata.data.checkedNewsLetters === false ? (
                    <Text
                      fontSize="16px"
                      lineHeight="short"
                      minHeight="30px"
                      color="#949494"
                      textAlign={["center", "initial"]}
                    >
                      {/* {e.email} */}
                     Vous n'etes pas abonnée
                    </Text>
                  ) : (
                    <Text
                      fontSize="22px"
                      fontWeight="semibold"
                      lineHeight="short"
                      minHeight="30px"
                    >
                     Abonnées 
                  </Text>
                   )}
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection={["column", "row "]}
              alignItems={["center", "initial"]}
              justifyContent={["space-around"]}
              h={["100px", "initial"]}
              w={["100%", "initial"]}
              pb={["5px", "20px"]}
              mb="20px"
            >
              <Button
                onClick={() => {
                  setUserToModified({
                    id: usersdata.data.id,
                    email: usersdata.data.email,
                    firstName: usersdata.data.firstName,
                    lastName: usersdata.data.lastName,
                    phone: usersdata.data.phone,
                    checkedNewsLetters: usersdata.data.checkedNewsLetters,
                  });
                  onOpen();
                }}
                bg="#89E98A"
                _hover={{
                  background: "#8ae98a",
                }}
                boxShadow="lg"
                fontSize="17px"
                w={["220px", "250px"]}
              >
                Modifier mes informations
              </Button>

              <Button
                _hover={{
                  background: "#c74d4d",
                }}
                w={["220px", "250px"]}
                bg="#c74d4d"
                color="#FFF"
                boxShadow="lg"
                fontSize="17px"
              >
                Supprimer mon compte
              </Button>
            </Box>
          </Box>
        </Center>
      </Layout>
    </PleaseSignIn>
  );
}
//Modal modification des informations
const ModalForm = ({ userToModified, onClose, defaultValues, callUsers }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: userToModified,
  });
  const [checkedNewsLetters, setCheckedNewsLetters] = useState(checkedNewsLetters);

  const onSubmit = async (data) => {
    try {
      await putUserId(userToModified.id, data,checkedNewsLetters);
      onClose();userToModified
      callUsers();
    } catch (err) {
      alert(err.response.data["hydra:description"]);
    }
  };
 
  return (
    <>
      <ModalOverlay />

      <ModalContent backgroundColor="#fff" color="#000">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader textAlign="center">
            Modifier mes informations
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Vos changements seront pris en compte après avoir valider.
            </Text>
            <FormLabel fontWeight="semibold">Nom</FormLabel>
            <Input name="firstName" ref={register} mb="10px" />
            <FormLabel fontWeight="semibold">Prénom</FormLabel>
            <Input name="lastName" ref={register} mb="10px" />
            <FormLabel fontWeight="semibold">Adresse email</FormLabel>
            <Input
              mb="10px"
              name="email"
              ref={register({
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              })}
            />
            {errors.email?.type === "pattern" &&
              "L'addresse email doit être sous la forme jean@gmail.com"}
            <FormLabel fontWeight="semibold">Numéro de téléphone</FormLabel>
            <Input name="phone" ref={register} mb="10px" />
            <Checkbox
                  name="checkedNewsLetters"
                  colorScheme="green"
                  ref={register}
                  onChange={(e) => setCheckedNewsLetters(e.target.checked)}
                  mt={["0px", "10px"]}
                  mr={["2px", "10px"]}>
                   S'inscrire à la newsletter
            </Checkbox>
            <Text count={2} />
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              bg="#2caf20"
              mr={3}
              color="#FFF"
              _hover={{ bg: "#2caf20" }}
            >
              Accepter
            </Button>
            <Button
              bg="#BA2F2F"
              onClick={onClose}
              color="#FFF"
              _hover={{ bg: "#BA2F2F" }}
            >
              Fermer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </>
  );
};
