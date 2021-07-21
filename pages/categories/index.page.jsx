import { useState } from "react";
import { Layout } from "@components/core/Layout";
import Link from "next/link";

import { getProperties, getTypePropertiesAll } from "@root/services/properties";
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
  SimpleGrid,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

//Permet d'autoriser les requêtes non sécurisés

export default function Categories({ properties }) {
  const [isClicked, setIsClicked] = useState(false);

  const breakpoints = createBreakpoints({
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  });

  return (
    <Box>
      <Layout>
        <Box>
          <Heading
            letterSpacing="1px"
            as="h1"
            textAlign="center"
            p={10}
            mb={["10px", "40px"]}
            textShadow=" 
           1px 2px 3px rgba(0,0,0,0.3)
            "
          >
            Le choix d'un univers insolite.
          </Heading>
          <Center>
            <SimpleGrid
              minChildWidth={["340px", "340px", "250px", "300px", "350px"]}
              spacing="30px"
              width="90%"
              placeItems="center"
              maxWidth="1200px"
              mb={["50px"]}
            >
              {properties.map((e, i) => (
                <Box
                  key={i}
                  p="2"
                  display={["flex", "initial", "block", "block", "initial"]}
                  flexDirection={["column", "row", "row", "row", "row"]}
                  justifyContent="space-around"
                  w={[340, 340, 300, 350]}
                  height="450px"
                  borderWidth="1px"
                  bg="#F8F8FF"
                  boxShadow=" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                  borderRadius="10px"
                >
                  {e.title === "Cabanes dans les arbres" ? (
                    <Image
                      borderRadius="md"
                      src="/cabanedanslesarbres.png"
                      objectFit="cover"
                      alt="cabane-dans-les-arbres"
                    />
                  ) : e.title === "Cabanes sur l'eau" ? (
                    <Image
                      borderRadius="md"
                      src="cabaneau.png"
                      objectFit="cover"
                      alt="cabane-sur-leau"
                    />
                  ) : e.title === "Yourtes" ? (
                    <Image
                      borderRadius="md"
                      src="yourte.png"
                      objectFit="cover"
                      alt="yourte"
                    />
                  ) : e.title === "Chalets" ? (
                    <Image
                      borderRadius="md"
                      src="chaletmontagne.png"
                      objectFit="cover"
                      alt="chalet"
                    />
                  ) : e.title === "Bateaux" ? (
                    <Image
                      borderRadius="md"
                      src="bateau.png"
                      objectFit="cover"
                      alt="bateaux"
                    />
                  ) : e.title === "Bulles" ? (
                    <Image
                      borderRadius="md"
                      src="bulle.png"
                      objectFit="cover"
                      alt="bulle"
                    />
                  ) : e.title === "Tipis" ? (
                    <Image
                      alt="tipi"
                      borderRadius="md"
                      src="tipi.png"
                      objectFit="cover"
                    />
                  ) : (
                    <Image
                      borderRadius="md"
                      src="iglou.png"
                      objectFit="cover"
                      alt="rest"
                    />
                  )}

                  <Text
                    p={1}
                    mt="10px"
                    fontWeight="bold"
                    fontSize="xl"
                    color="#000"
                  >
                    {e.title}
                  </Text>
                  <Box minHeight="90px">
                    <Text p={1} mb="10px" mt="5px">
                      {e.description}
                    </Text>
                  </Box>

                  <Center>
                    <Link href={`/categorie/${e["@id"].split("/")[3]}`}>
                      <Button
                        bg="#67E767"
                        _hover={{
                          background: "#67E767",
                        }}
                        p={6}
                        w="160px"
                        textAlign="center"
                        justifyContent="center"
                        alignItems="center"
                        mt={2}
                        color="#000"
                        display="flex"
                        right="0"
                        boxShadow="lg"
                        fontSize="18px"
                        fontWeight="bold"
                      >
                        Découvrir
                      </Button>
                    </Link>
                  </Center>
                </Box>
              ))}
            </SimpleGrid>
          </Center>
        </Box>
      </Layout>
    </Box>
  );
}

//Requête axios qui tape dans l'API au chargement de la page
// properties: [Array],
export const getStaticProps = async () => {
  try {
    const { data } = await getTypePropertiesAll();
    // console.log(data["hydra:member"]);
    return {
      props: {
        properties: data["hydra:member"],
      },
      revalidate: 1,
    };
  } catch (error) {
    throw Error(error);
  }
};

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
