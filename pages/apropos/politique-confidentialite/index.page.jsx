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
              Politique de confidentialité
            </Heading>
          </Box>

          <Box
            margin={20}
            paddingRight={20}
            paddingLeft={20}
            paddingTop={10}
            paddingBottom={10}
          >
            <strong>
              Les données à caractère personnelles des “Propriétaires” et
              “Locataires” recueillies via les formulaires présents sur “notre
              Site”
            </strong>
            <br />
            <br />
            Atypik'House s’engage à respecter la vie privée des “Propriétaires”
            et ‘Locataires” de “AtypikHouse.com” et de garantir la
            confidentialité des données personnelles recueillies. Celles-ci
            résultent de la communication volontaire d’informations via les
            formulaires présents sur “AtypikHouse.com”. Certaines données, qui
            doivent être fournies obligatoirement, sont identifiées
            visuellement. Les données recueillies, à la demande d’Atypik'House,
            le responsable du traitement, font l’objet d’un traitement
            informatique destiné à la gestion de fichiers clients et prospects.
            <br />
            <br />
            Les données des “Propriétaires” sont nécessaires à l’inscription sur
            “AtypikHouse.com”, à la publication des annonces sur
            “AtypikHouse.com”, à la gestion commerciale et à la qualité de nos
            services. Les données collectées sont confidentielles et ne font pas
            l’objet de transmission à des tiers, sauf en cas de réquisition
            judiciaire ou de demande par une autorité habilitée.
            <br />
            <br />
            Les données des “Locataires” peuvent être nécessaires pour pouvoir
            entrer en contact avec un “Propriétaire”, et sont utilisées
            également à des fins de prospection. Les données collectées sont
            confidentielles et ne font pas l’objet de transmission à des tiers,
            sauf en cas de réquisition judiciaire ou de demande par une autorité
            habilitée, ou en cas d'accord de transmission exprimé par les
            "Locataires" (par exemple, pour récolter des avis sur leur séjour,
            les "Locataires" peuvent être mis en relation avec SAS NET REVIEWS,
            propriétaire du site internet www.avis-verifies.com)
            <br />
            <br />
            En conformité avec la loi du 6 janvier 1978 relative à
            l’informatique, aux fichiers et aux libertés, modifiée par la loi du
            6 août 2004, le traitement automatisé des données nominatives
            réalisé sur “AtypikHouse.com” a fait l’objet d’une déclaration
            auprès de la Commission nationale de l’informatique et des libertés
            (CNIL) enregistrée sous le numéro 1476211.
            <br />
            <br />
            Conformément aux articles 38 et suivants de la loi n° 78-17 du 6
            janvier 1978 modifiée par la loi du 6 août 2004 relative à
            l’informatique, aux fichiers et aux libertés, toute personne peut
            obtenir communication et, le cas échéant, modification,
            rectification ou suppression des informations le concernant, en
            s’adressant au 21, impasse de l'amandier 84210 Saint-Didier.
            <br />
            <br />
            Conformément à l’article 92 du décret N°2005-1309 du 20 octobre
            2005, les demandes doivent être signées et accompagnées de la
            photocopie d’un titre d’identité portant la signature du titulaire.
            Les demandes doivent également préciser l’adresse à laquelle doit
            parvenir la réponse.
            <br />
            <br />
            Conformément à l’article 94 du décret N°2005-1309 du 20 octobre
            2005, le responsable du traitement répond à la demande présentée par
            l’intéressé dans le délai de 2 mois suivant sa réception. Si la
            demande est imprécise ou ne comporte pas tous les éléments, le
            responsable du traitement invite l’intéressé à les lui fournir.
            <br />
            <br />
            <strong>Protection des données collectées</strong>
            <br />
            <br />
            Certains de ces destinataires ont leur siège social aux Etats-Unis.
            La transmission des données aux destinataires situés en dehors de
            l’Union Européenne est destinée à faire des statistiques d’analyse
            de l’audience, de fréquentation et du trafic sur “AtypikHouse.com".
            <br />
            <br />
            Les garanties suivantes ont été prises pour s’assurer d’un niveau de
            protection suffisant de ces données personnelles: Les destinataires
            adhèrent aux principes du Safe Harbour et du règlement n° 2016/679,
            règlement général sur la protection des données (RGPD). Le Safe
            Harbour est un ensemble de principes de protection des données
            personnelles, négociées entre les autorités américaines et la
            Commission Européenne en 2001. Les sociétés adhérant à ces principes
            auprès du Département du Commerce américain sont autorisées à
            recevoir des données en provenance de l’Union Européenne. Pour plus
            d’informations concernant le “Safe Harbor”, nous vous invitons à
            cliquer sur le lien suivant: http://export.gov/safeharbor/
            <br />
            <br />
            Le Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27
            avril 2016 relatif à la protection des personnes physiques à l'égard
            du traitement des données à caractère personnel et à la libre
            circulation de ces données (RGPD) est un ensemble de principes de
            protection des données personnelles auxquels doivent adhérer les
            organisations traitants les données personnelles de personnes
            résidant dans l'Union Européenne. Pour plus d’informations
            concernant le RGPD, nous vous invitons à cliquer sur le lien
            suivant: https://www.cnil.fr/reglement-europeen-protection-donnees
            <br />
            <br />
            Conformément aux articles 39 et suivants de la loi N°78-17 du 6
            janvier 1978 modifiée en 2004 relatives à l’informatique, aux
            fichiers et aux libertés, toute personne peut obtenir communication
            et, le cas échéant, rectification ou suppression des informations la
            concernant, en s’adressant au 21, impasse de l'amandier 84210
            Saint-Didier.
            <br />
            <br />
            Depuis l’ordonnance du 24 août 2011 relative aux communications
            électroniques, transposant les deux directives du 25 novembre 2009
            dites “Paquet Télécom”, l’ “Utilisateur” doit être informé de
            l’existence des cookies.
            <br />
            <br />
            Cependant, il existe deux exceptions à l’obligation d’obtenir
            l’autorisation des “Utilisateurs”. Il s’agit des cookies qui ont
            pour finalité exclusive de permettre ou faciliter la communication
            par voie électronique et des cookies qui sont strictement
            nécessaires à la fourniture d’un service expressément demandé par
            l’internaute (comme les cookies permettant de créer des paniers
            d’achat).
            <br />
            <br />
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}
