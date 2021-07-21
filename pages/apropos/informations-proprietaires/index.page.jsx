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
              Informations proptiétaire
            </Heading>
          </Box>

          <Box
            margin={20}
            paddingRight={20}
            paddingLeft={20}
            paddingTop={10}
            paddingBottom={10}
          >
            Atypik'House est une centrale de réservation spécialisée dans la
            location d'hébergements insolites.
            <br />
            <br />
            Les services proposés reposent sur ces 3 principes fondamentaux :
            <br />
            <br />
            - Sélection des offres : les hébergements référencés sont soumis à
            une étude préalable (caractère insolite et cohérence de l'offre,
            qualité des prestations...). La structure de l'hébergement doit être
            atypique et proposer une expérience insolite ;<br />
            <br />
            - Réservation instantanée : le calendrier des disponibilités doit
            être mis à jour en temps réel (nous vous proposons plusieurs
            solutions techniques) ;<br />
            <br />
            - Système à la performance : il ne s'agit pas d'un annuaire, il n'y
            a donc pas d'abonnement, uniquement un commissionnement sur les
            réservations.
            <br />
            <br />
            Pour être contacté par notre service commercial, il vous suffit de
            compléter ce formulaire de contact
            <br />
            <br />
            Si votre offre est éligible, les conditions de collaboration vous
            seront envoyées par email, et un rendez-vous téléphonique vous sera
            proposé.
            <br />
            <br />
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}

//Requête axios qui tape dans l'API au chargement de la page

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
