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

export default function Categories({ properties }) {
  const [isClicked, setIsClicked] = useState(false);

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
              Informations COVID 19
            </Heading>
          </Box>

          <Box
            margin={20}
            paddingRight={20}
            paddingLeft={20}
            paddingTop={10}
            paddingBottom={10}
          >
            En raison de la situation sanitaire (Coronavirus, Covid-19), vous
            souhaitez plus de renseignement sur l'hygiène et la sécurité dans
            les établissements ? Tout d'abord, il faut savoir que les
            hébergements insolites sont très souvent complètement isolés les uns
            des autres. Cela vous permettra d'éviter le contact avec d'autres
            clients. Loin des villes, loin des foules, et loin du tourisme de
            masse, c'est l'occasion de profiter de vacances seuls au monde, pour
            un moment de répit loin de l'agitation et du stress actuels !?
            <br />
            <br />
            <strong>● Avant votre arrivée :</strong>
            <br />
            <br />
            Communiquer votre heure d'arrivée dans l'établissement afin de
            prendre connaissance des mesures de précaution et d'une éventuelle
            procédure d'accueil spécifique. <br />
            <br />
            <strong> ● Lors de votre séjour : </strong>
            <br />
            <br />
            Respectez scrupuleusement les consignes communiquées par vos hôtes
            (distanciation physique, utilisation de gel hydroalcoolique, port du
            masque, etc...).
            <br />
            <br />
            (Si rien n'est spécifié, patience, cela vient d'être mis en place,
            nos hébergeurs partenaires mettront régulièrement leur annonce à
            jour dans les jours à venir !)
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}

//Requête axios qui tape dans l'API au chargement de la page
// properties: [Array],

// <div >
//   <img
//     src="/fondecran.jpg"
//     alt="Image of the logo"
//     width={300}
//     height={140}
//   />
//   <div>{e.typeProperty.title}</div>

//   <div> {} </div>

//   <div>
//     <Link
//       href={`/categorie/${e.typeProperty["@id"].split("/")[3]}`}
//       passHref
//     >
//       <button>Voir plus...</button>
//     </Link>
//   </div>
// </div>
