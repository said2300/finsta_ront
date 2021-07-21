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
              C.G.U.V
            </Heading>
          </Box>

          <Box
            margin={20}
            paddingRight={20}
            paddingLeft={20}
            paddingTop={10}
            paddingBottom={10}
            textAlign="center"
          >
            <strong>CONDITIONS GÉNÉRALES</strong>
            <br />
            <br />
            Les présentes conditions générales régissent l’utilisation de ce
            site https://f2i-dev14-ab-cp-ak.fr. Ce site appartient est géré par
            SARL AtypikHouse.
            <br />
            En utilisant ce site, vous indiquez que vous avez lu et compris les
            conditions d’utilisation et que vous acceptez de les respecter en
            tout temps.
            <br />
            Type de site : e-commerce
            <br />
            <br />
            <strong>Propriété intellectuelle</strong>
            <br />
            <br />
            Tout contenu publié et mis à disposition sur ce site est la
            propriété de SARL AtypikHouse et de ses créateurs. Cela comprend,
            mais n’est pas limité aux images, textes, logos, documents, fichiers
            téléchargeables et tout ce qui contribue à la composition de ce
            site.
            <br />
            <br />
            <strong>Contributions d'utilisateur</strong>
            <br />
            <br />
            Les utilisateurs peuvent publier les informations suivantes sur
            notre site :<br />
            • Photos
            <br />
            • Commentaires du public
            <br />
            • Annonces
            <br />
            En affichant publiquement sur notre site, vous acceptez de ne pas
            agir illégalement ou violer les conditions d’utilisation acceptable
            énumérées dans ce document.
            <br />
            Chaque élément publié fera l’objet d’une vérification par les
            modérateurs du site.
            <br />
            <br />
            <strong>Comptes</strong>
            <br />
            <br />
            Lorsque vous créez un compte sur notre site, vous acceptez ce qui
            suit :<br />
            1. Que vous êtes seul responsable de votre compte et de la sécurité
            et la confidentialité de votre compte, y compris les mots de passe
            ou les renseignements de nature délicate joints à ce compte, et que
            tous les renseignements personnels que vous nous fournissez par
            l’entremise de votre compte sont à jour, exacts et véridiques et que
            vous mettez à jour vos renseignements personnels s’ils changent.
            <br />
            Nous nous réservons le droit de suspendre ou de résilier votre
            compte si vous utilisez notre site illégalement ou si vous violez
            les conditions d’utilisation acceptable.
            <br />
            Ventes des biens et services.
            <br />
            Ce document régit la vente des services mis à disposition sur notre
            site.
            <br />
            Les services que nous offrons comprennent :<br />
            · Commercialisation d'hébergements insolites et atypiques
            <br />
            Les services liés à ce document sont les services qui sont affichés
            sur notre site au moment où vous y accédez. Toutes les informations,
            descriptions ou images que nous fournissons sur nos services sont
            décrites et présentées avec la plus grande précision possible.
            Cependant, nous ne sommes pas légalement tenus par ces informations,
            descriptions ou images car nous ne pouvons pas garantir l’exactitude
            de chaque produit ou service que nous fournissons. Vous acceptez
            d’acheter ces services à vos propres risques.
            <br />
            Vendus par des tiers
            <br />
            Notre site peut offrir des services de sociétés tierces. Nous ne
            pouvons pas garantir la qualité ou l’exactitude des services mis à
            disposition par des tiers sur notre site.
            <br />
            <br />
            <strong>Paiements</strong>
            <br />
            <br />
            Nous acceptons les modes de paiement suivants sur ce site :<br />
            • Carte bancaire
            <br />
            • PayPal
            <br />
            Lorsque vous nous fournissez vos renseignements de paiement, vous
            nous confirmez que vous avez autorisé l’utilisation et l’accès à
            l’instrument de paiement que vous avez choisi d’utiliser. En nous
            fournissant vos détails de paiement, vous confirmez que vous nous
            autorisez à facturer le montant dû à cet instrument de paiement.
            <br />
            Si nous estimons que votre paiement a violé une loi ou l’une de nos
            conditions d’utilisation, nous nous réservons le droit d’annuler
            votre transaction.
            <br />
            <br />
            <strong>Services</strong>
            <br />
            <br />
            Les services seront facturés en totalité à la commande du service.
            <br />
            <br />
            <strong>Limitation de responsabilité</strong>
            <br />
            <br />
            SARL AtypikHouse ou l’un de ses employés sera tenu responsable de
            tout problème découlant de ce site. Néanmoins, SARL AtypikHouse et
            ses employés ne seront pas tenus responsables de tout problème
            découlant de toute utilisation irrégulière de ce site.
            <br />
            <br />
            <strong>Indemnité</strong>
            <br />
            <br />
            En tant qu’utilisateur, vous indemnisez par les présentes SARL
            AtypikHouse de toute responsabilité, de tout coût, de toute cause
            d’action, de tout dommage ou de toute dépense découlant de votre
            utilisation de ce site ou de votre violation de l’une des
            dispositions énoncées dans le présent document.
            <br />
            <br />
            <strong>Lois applicables</strong>
            <br />
            <br />
            Ce document est soumis aux lois applicables en France et vise à se
            conformer à ses règles et règlements nécessaires. Cela inclut la
            réglementation à l’échelle de l’UE énoncée dans le RGPD.
            <br />
            <br />
            <strong> Divisibilité</strong>
            <br />
            <br />
            Si, à tout moment, l’une des dispositions énoncées dans le présent
            document est jugée incompatible ou invalide en vertu des lois
            applicables, ces dispositions seront considérées comme nulles et
            seront retirées du présent document. Toutes les autres dispositions
            ne seront pas touchées par les lois et le reste du document sera
            toujours considéré comme valide.
            <br />
            <br />
            <strong>Modifications</strong>
            <br />
            <br />
            Ces conditions générales peuvent être modifiées de temps à autre
            afin de maintenir le respect de la loi et de refléter tout
            changement à la façon dont nous gérons notre site et la façon dont
            nous nous attendons à ce que les utilisateurs se comportent sur
            notre site. Nous recommandons à nos utilisateurs de vérifier ces
            conditions générales de temps à autre pour s’assurer qu’ils sont
            informés de toute mise à jour. Au besoin, nous informerons les
            utilisateurs par courriel des changements apportés à ces conditions
            où nous afficherons un avis sur notre site.
            <br />
            <br />
            <strong>Contact</strong>
            <br />
            <br />
            Veuillez communiquer avec nous si vous avez des questions ou des
            préoccupations. Nos coordonnées sont les suivantes :<br />
            contact@atypikhouse.com
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}
