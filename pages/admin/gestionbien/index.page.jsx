import { useState } from "react";

import useValidBien from "@hooks/useValidBien";
import useGetProperties from "@hooks/useGetProperties";
import useDeleteBien from "@hooks/useDeleteBien";
import FlecheRetour from "../../../components/ui/ArrowBack";
import PleaseSignIn from "@components/core/PleaseSignIn";

// Utils
import { splitId } from "@root/utils/sliceId";

// Styles
import { Layout } from "@components/core/Layout";
import {
  Box,
  Flex,
  Text,
  Center,
  Heading,
  Button,
  Spinner,
} from "@chakra-ui/react";

export default function ListBien() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, mesBiens } = useGetProperties({ page });
  const { mutate: modifyStatus, isSuccess } = useValidBien({
    onSuccess: () => {
      alert("Les biens sont a jours");
    },
  });

  const { mutate: deleteBien } = useDeleteBien({
    onSuccess: () => {
      alert("Le bien est supprimé");
    },
  });

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
        <FlecheRetour></FlecheRetour>

        <Heading as="h1" textAlign="center" margin={5}>
          Gestion des biens
        </Heading>
        {page > 1 && (
          <Box
            onClick={() => setPage(page - 1)}
            display="flex"
            fontWeight="bold"
            justifyContent="flex-end"
            mr="20px"
            mb="20px"
            mr={["20px", "100px"]}
          >
            <Button
              w={["140px", "200px"]}
              bg="#89E98A"
              _hover={{
                background: "#8ae98a",
              }}
            >
              Page précédente
            </Button>
          </Box>
        )}

        <Box
          onClick={() => setPage(page + 1)}
          display="flex"
          fontWeight="bold"
          fontSize="18px"
          justifyContent="flex-end"
          mr={["20px", "100px"]}
          mb="20px"
        >
          <Button
            w={["140px", "200px"]}
            bg="#89E98A"
            _hover={{
              background: "#8ae98a",
            }}
          >
            Page suivante
          </Button>
        </Box>

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
            <Text w="80px">Id</Text>
            <Text w="180px">Catégorie</Text>
            <Text w="150px">Titre</Text>
            <Text w="140px">Prix/nuit</Text>
            <Text w="90px">Gérer</Text>
          </Box>
        </Center>
        {isSuccess ? <div>Le changement a été pris en compte</div> : null}
        <Center>
          <Box m="5px" w="100%">
            {mesBiens?.reverse()?.map((habitation, i) => (
              <Center>
                <Box
                  pr={[5, 20]}
                  pl={[5, 10]}
                  borderWidth="1px"
                  bg="#F8F8FF"
                  borderRadius="md"
                  h={["280px", "120px"]}
                  width={["80%", "90%"]}
                  display="flex"
                  flexDirection={["column", "row"]}
                  justifyContent={["space-around", "space-between"]}
                  alignItems="center"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  borderRadius="10px"
                  fontSize="20px"
                  mb={["20px", "20px"]}
                >
                  <Box w={["initial", "60px"]}>
                    <Text
                      mt={2}
                      fontSize="l"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {habitation["@id"].split("/")[3]}
                    </Text>
                  </Box>
                  <Box w={["initial", "180px"]}>
                    <Text
                      mt={2}
                      fontSize="l"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {habitation.typeProperty.title}
                    </Text>
                  </Box>

                  <Box w={["initial", "180px"]}>
                    <Text
                      mt={2}
                      fontSize="l"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {habitation.title}
                    </Text>
                  </Box>
                  <Box w={["nitial", "90px"]}>
                    <Text
                      mt={2}
                      fontSize="l"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {habitation.rate} €
                    </Text>
                  </Box>

                  <Flex flexDirection="column">
                    {habitation.status === "en attente" ||
                    habitation.status === "draft" ? (
                      <Box w={["120px", "110px"]}>
                        <Button
                          w={["120px", "120px"]}
                          onClick={() =>
                            modifyStatus({
                              id: habitation["@id"].split("/")[3],
                              status: "acceptee",
                            })
                          }
                          mt={2}
                          bg="#89E98A"
                          _hover={{
                            background: "#8ae98a",
                          }}
                          boxShadow="lg"
                          fontSize="18px"
                        >
                          Accepter
                        </Button>
                        <Button
                          fontSize="18px"
                          w={["120px", "120px"]}
                          onClick={() =>
                            modifyStatus({
                              id: habitation["@id"].split("/")[3],
                              status: "rejetee",
                            })
                          }
                          mt={2}
                          bg="#BA2F2F"
                          color="#FFF"
                          boxShadow="lg"
                        >
                          Refuser
                        </Button>
                      </Box>
                    ) : (
                      <Flex flexDirection="column">
                        <Button
                          fontSize="18px"
                          w={["120px", "120px"]}
                          onClick={() => {
                            deleteBien({ id: splitId(habitation["@id"]) });
                          }}
                          mt={2}
                          bg="#FFF"
                          color="#BA2F2F"
                          boxShadow="lg"
                        >
                          Supprimer
                        </Button>
                      </Flex>
                    )}
                  </Flex>
                </Box>
              </Center>
            ))}
          </Box>
        </Center>
        {page > 1 && (
          <Box
            onClick={() => setPage(page - 1)}
            display="flex"
            fontWeight="bold"
            justifyContent="flex-end"
            mr="20px"
            mb="20px"
            mr={["20px", "100px"]}
          >
            <Button
              w={["140px", "200px"]}
              bg="#89E98A"
              _hover={{
                background: "#8ae98a",
              }}
            >
              Page précédente
            </Button>
          </Box>
        )}

        <Box
          onClick={() => setPage(page + 1)}
          display="flex"
          fontWeight="bold"
          fontSize="18px"
          justifyContent="flex-end"
          mr={["20px", "100px"]}
          mb="20px"
        >
          <Button
            w={["140px", "200px"]}
            bg="#89E98A"
            _hover={{
              background: "#8ae98a",
            }}
          >
            Page suivante
          </Button>
        </Box>
      </Layout>
    </PleaseSignIn>
  );
}
