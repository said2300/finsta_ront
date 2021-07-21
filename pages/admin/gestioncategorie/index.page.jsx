import { useRouter } from "next/router";
import FlecheRetour from "../../../components/ui/ArrowBack";
import PleaseSignIn from "@components/core/PleaseSignIn";

import { useState } from "react";
import useAuth from "@context/context";

import { Controller, useForm } from "react-hook-form";
import { isError, useMutation, useQuery } from "react-query";

//Services

import { getUsers, deleteUserId, putUserId } from "@services/user";
import { getTypePropertiesAll } from "@services/properties";
import { ajouterCat, deleteCat } from "@services/categorie";

// Styles
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
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function GestionCategorie() {
  //Router
  const router = useRouter();
  //Gestion Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  //Context
  const { isAuthenticated, loading } = useAuth();
  //Gestion error
  const toast = useToast();
  //State pour réaliser des actions sur les catégories
  const [selectedCategorie, setSelectedCategorie] = useState({});

  //Appel de la fonction getTypePropertiesAll qui sert à récuprer toutes les catégories

  const { isLoading, isError, data: categorie, refetch } = useQuery(
    "categorie",
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quelqu'un se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    getTypePropertiesAll
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
    <PleaseSignIn permissions={["ROLE_ADMIN"]}>
      <Layout>
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
          Gestion des catégories et des attributs
        </Heading>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalForm
            onClose={onClose}
            callCategories={refetch}
            selectedCategorie={selectedCategorie}
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
            justifyContent="space-around"
            pr={20}
            pl={10}
            fontSize="22px"
            mb="20px"
            borderRadius="10px"
          >
            <Text w="200px">Numéro catégorie</Text>
            <Text w="240px">Nom catégorie</Text>
            <Text w="90px">Attribut</Text>
          </Box>
        </Center>

        <SimpleGrid minChildWidth="100%" spacing="5px">
          {categorie.data["hydra:member"].map((e, i) => (
            <Box display="flex" flexDirection="column">
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
                  justifyContent="space-around"
                  alignItems="center"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  mb="10px"
                  borderRadius="10px"
                >
                  <Box w={["initial", "200px"]} pl={["0", "80px"]}>
                    <Text
                      fontSize="18px"
                      fontWeight="semibold"
                      lineHeight="short"
                      key={i}
                    >
                      {e["@id"].split("/")[3]}
                    </Text>
                  </Box>

                  <Box w={["initial", "240px"]}>
                    <Text
                      textAlign="center"
                      fontSize="22px"
                      fontWeight="semibold"
                      lineHeight="short"
                      key={i}
                    >
                      {e.title}
                    </Text>
                  </Box>
                  <Button
                    key={i}
                    onClick={() => {
                      setSelectedCategorie(e["@id"]);

                      onOpen();
                    }}
                    w={["initial", "220px"]}
                    bg="#89E98A"
                    _hover={{
                      background: "#8ae98a",
                    }}
                  >
                    <Text
                      fontSize="18px"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      + Ajouter
                    </Text>
                  </Button>
                </Box>
              </Center>
              <Center>
                <Box w="90%" minHeight={["110px", "100px"]}>
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
                              Attributs de la catégorie {e.title}
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <SimpleGrid minChildWidth="150px" spacing="5px">
                          {e.proprietes.map((prop, i) => (
                            <Box
                              p={1}
                              w="130px"
                              borderRadius="5px"
                              border="solid #000 2px"
                              display="flex"
                              flexDirection="column"
                              justifyContent="space-around"
                              alignItems="center"
                              minHeight="150px"
                            >
                              <Text mb="5px" fontSize="16px" key={i}>
                                {prop.name}
                              </Text>
                              <Button
                                h="30px"
                                bg="#89E98A"
                                _hover={{
                                  background: "#8ae98a",
                                }}
                                onClick={() => {
                                  deleteCat(prop["@id"].split("/")[3]);
                                  refetch();
                                }}
                              >
                                Supprimé
                              </Button>
                            </Box>
                          ))}
                        </SimpleGrid>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </Center>
            </Box>
          ))}
        </SimpleGrid>
      </Layout>
    </PleaseSignIn>
  );
}

const type = [
  {
    value: "string",
    text: "Texte",
  },
  {
    value: "integer",
    text: "Nombre",
  },
  {
    value: "booleen",
    text: "Checkbox",
  },
];

const ModalForm = ({ onClose, selectedCategorie, callCategories }) => {
  const { register, handleSubmit, errors, control } = useForm();
  const toast = useToast();
  const { mutate, isLoading, isError, data } = useMutation(
    (newAttribut) => ajouterCat(newAttribut),
    {
      onSuccess: () => {
        toast({
          position: "top",
          title: "L'attribut a bien été ajouté",
          description: "",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        onClose();
        callCategories();
      },
    }
  );

  const onSubmit = async (data) => {
    const newAttribut = {
      name: data.name,
      type: data.type,
      typeProperty: selectedCategorie,
    };
    mutate(newAttribut);
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent backgroundColor="#fff" color="#000">
        {isLoading && "Loading..."}
        {isError && "Une erreur est survenu"}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Ajouter un attribut</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text color="#b62626" fontWeight="bold" mb="20px">
              Veuillez préciser l'unité de vos attributs entre parenthèse si
              besoin
            </Text>
            <Text mb="20px">Exemple: Hauteur de la cabane (m)</Text>
            <FormControl mt={2} id="name">
              <FormLabel>Nom</FormLabel>
              <Input
                borderColor={["#696969"]}
                focusBorderColor="#21b942"
                placeholder="Température de l'eau (°C)"
                type="string"
                name="name"
                ref={register({ required: true })}
              />
            </FormControl>
            <FormControl mt={2} id="type">
              <FormLabel>Type</FormLabel>
              <Controller
                as={
                  <Select
                    placeholder="Selectionner un type"
                    borderColor={["#696969"]}
                    focusBorderColor="#21b942"
                  >
                    {type.map((e, i) => (
                      <option key={i} value={e.value}>
                        {e.text}
                      </option>
                    ))}
                  </Select>
                }
                control={control}
                name="type"
                rules={{ required: true }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              bg="#89E98A"
              _hover={{
                background: "#8ae98a",
              }}
              mr={3}
            >
              Ajouter
            </Button>
            <Button
              colorScheme="red"
              onClick={onClose}
              bg="#b62626"
              _hover={{
                background: "#8ae98a",
              }}
              color="#FFF"
            >
              Fermer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </>
  );
};

