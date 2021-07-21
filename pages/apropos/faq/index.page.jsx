import { useState } from "react";
import { Layout } from "@components/core/Layout";

import { Box, Center, Heading, Button } from "@chakra-ui/react";

export default function Categories() {
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
              F.A.Q
            </Heading>
          </Box>

          <Box
            margin={20}
            paddingRight={20}
            paddingLeft={20}
            paddingTop={10}
            paddingBottom={10}
          >
            Une question concernant la situation sanitaire actuelle
            (Coronavirus, Covid-19) ?<br />
            <br />
            <strong>
              ● Les établissements sont-ils ouverts, est-ce que ma réservation
              est possible ou maintenue{" "}
            </strong>
            <br />
            <br />
            Les établissements sont autorisés à rester ouverts et ont mis en
            place des mesures pour vous accueillir en toute sécurité. Il vous
            suffit de consulter le planning le planning des disponibilités.{" "}
            <br />
            <br />
            <strong>
              {" "}
              ● J'aimerais réserver un séjour, mais je souhaite en savoir plus
              sur les mesures d'hygiène{" "}
            </strong>
            <br />
            <br />
            Nos partenaires ont reçu les consignes nécessaires afin de respecter
            les mesures d’hygiène mises en place pour assurer votre sécurité.
            <br />
            <br />
            <strong> ● Le spa est-il toujours accessible ? </strong>
            <br />
            <br />
            Les spas privatifs sont toujours accessibles. Pour les spas communs,
            cela dépend du type d'équipement et de la période de votre séjour.
            Cette information est évolutive en saison de la situation sanitaire.
            <br />
            Vous pourrez vous renseigner auprès de vos hôtes aux coordonnées
            indiquées sur votre confirmation de séjour.
            <br />
            <br />
            <strong>
              ● J'aimerais réserver un séjour, mais je souhaite connaître les
              conditions d'annulation
            </strong>
            <br />
            <br />
            Les conditions d’annulation et de modification de votre séjour sont
            consultables sur les conditions générales de vente de
            l’établissement. Celles-ci sont consultables sur le formulaire de
            réservation via un lien en bas de chaque page, ou encore après
            réservation, sur votre confirmation de séjour.
            <br />
            Toutefois, en cas de mesures gouvernementales (confinement,
            restrictions...), pas d'inquiétude, votre séjour sera reporté !{" "}
            <br />
            <br />
            <strong>
              {" "}
              ● Malgré les mesures de confinement, je souhaite me rendre dans
              l'établissement auprès duquel j'ai effectué une réservation{" "}
            </strong>
            <br />
            <br />
            - Certains établissements peuvent prendre la décision de fermer
            leurs portes durant une période de confinement. Il est indispensable
            de vous assurer de la capacité de l'établissement à vous accueillir
            dans le respect des mesures mises en place, en les contactant aux
            coordonnées indiquées sur votre confirmation de séjour. - Si
            l'établissement peut vous accueillir, votre responsabilité est
            toutefois engagée pour toute infraction à la réglementation en
            vigueur.
            <br />
            <br />
            <strong>
              {" "}
              ● J'ai un séjour prévu, mais je n'ose pas m'y rendre
            </strong>
            <br />
            <br />
            Rassurez-vous, les locations insolites sont le plus généralement
            situées en pleine nature, loin de toute promiscuité. Vous aurez plus
            de chance d’y croiser des écureuils et hérissons que d’autres
            humains !<br />
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}
