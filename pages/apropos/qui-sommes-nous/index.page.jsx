import { useState } from "react";
import { Layout } from "@components/core/Layout";
import Link from "next/link";

import { getProperties } from "@root/services/properties";
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

//Permet d'autoriser les requêtes non sécurisés

export default function Categories() {
  return (
    <Layout>
      <Center>
        <Box
          display="float"
          alignItems="center"
          border="solide"
          boxShadow="-moz-initial"
          w={[1000, 1000, 1000, 1000]}
          height="auto"
          borderWidth="1px"
          bg="#F8F8FF"
          borderRadius="md"
          marginTop={10}
          marginBottom={10}
        >
          <Box textAlign="center" margin={10}>
            <Heading as="h1" textAlign="center" fontStyle="italic">
              Qui sommes nous ?
            </Heading>
          </Box>

          <Box
            margin={20}
            paddingRight={20}
            paddingLeft={20}
            paddingTop={10}
            paddingBottom={10}
          >
            <strong>● Marc MANET</strong>
            <br />
            32 ans, Chef de Produit chez Groupon, société fermée en 2018
            Passionné de voyages, bricolage, & surf <br />
            <br />
            <strong> ● Justine VENTURY </strong>
            <br />
            29 ans, Chef de Projet chez Food Comedy Passionnée par les cuisines
            du monde, voyages, et l’entrepreneuriat
            <br />
            <br />
            <strong> ● Justine VENTURY </strong>
            <br />
            28 ans, parti faire le tour du Monde à la fin de ses études
            Aventurier, il voyage depuis tout petit avec ses parents puis en
            solo désormais, il parle beaucoup de langues et à de nombreuses
            connaissances.
            <br />
            <br />
            <Center textAlign="center">
              <text>
                Ces trois entrepreneurs sont issus de l'ISG Paris - 16e où ils
                se sont rencontrés. Leur amitié étant réunie autour des mêmes
                intérêts, des voyages partagés, des week-ends, ils mûrissent le
                souhait AtypikHouse depuis un an.
                <br />
                Ils ont l’idée de changer les habitudes de location, en mettant
                en relation propriétaires et locataires
                <br />
                pour ces types de logements encore trop peu exploités et connus.
                C’est la génération des millenials concernés par la nature,
                l'écologie, la pollution, le bien-être, le retour aux sources
                près de la nature...
                <br />
                <br />
              </text>
            </Center>
            <strong> ⇒ Ambitions d’AtypikHouse :</strong>
            <br />
            <br />
            ● Créer une vraie image de marque qui inspire la confiance ainsi que
            d’avoir une notoriété autour d’AtypikHouse.
            <br />
            ● Devenir un des leaders de la location d'habitats alternatifs en
            France puis en Europe.
            <br />
            ● Faire évoluer/changer les mentalités des utilisateurs qui ont
            l’habitude de réserver des locations de week-end ou vacances
            classiques (hôtel, maison de vacances…) vers des habitats insolites
            plus respectueux de l’environnement et des écosystèmes
            <br />
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}
