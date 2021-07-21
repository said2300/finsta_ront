import React from "react";
import { useState } from "react";
import useAuth from "@context/context";

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { isError, useQuery } from "react-query";

import { Layout } from "@components/core/Layout";
import { useRouter } from "next/router";
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Grid,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react";
import { getTypePropertiesId } from "@services/properties";
import { deleteCat } from "@services/categorie";

export default function ListBien({ data }) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const { isLoading, isError, data: cat, refetch } = useQuery(
    ["cat", user],
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    () => user && getTypePropertiesId(),
    {
      onSuccess: (data) => {},
    }
  );

  if (router.isFallback) {
    return <div>La page est en train d'etre créée / Loading ...</div>;
  }

  // Les données n'existe pas, data contient un objet vide ex: {}
  if (!data) return <div>La page a un soucis...</div>;

  const deleteCategorie = async (id) => {
    await deleteCat(id.split("/")[3]);
  };

  return (
    <Layout>
      <Heading as="h1" textAlign="center" margin={10}>
        Attribut de la catégorie: {data.title}
      </Heading>
      <Center maxW="1680px">
        <Grid templateColumns="repeat(3, 320px)" gap={10} m="auto">
          {data.proprieteTypeProperties.map((e, i) => (
            <Box
              maxW="320px"
              borderWidth="1px"
              bg="#F3F3F3"
              borderRadius="md"
              p="2"
            >
              <Text
                mt={2}
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
              >
                <>{e.propriete.nom} </>
              </Text>
              <Text
                mt={2}
                fontSize="md"
                fontWeight=""
                lineHeight="short"
              ></Text>

              <Button
                onClick={() => deleteCategorie(e["@id"])}
                mt={2}
                bg="#F3F3F3"
                color="#BA2F2F"
                ml="65%"
                boxShadow="lg"
              >
                Supprimer
              </Button>
            </Box>
          ))}
        </Grid>
      </Center>
    </Layout>
  );
}
