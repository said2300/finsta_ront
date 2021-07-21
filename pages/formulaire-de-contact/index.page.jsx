import { Layout } from "@components/core/Layout";
import { Textarea } from "@chakra-ui/react";
import Router from "next/router";
import { useForm, ValidationError } from "@formspree/react";

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
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

export default function FormContact() {
  const [state, handleSubmit] = useForm("myylylol");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <Layout>
      <Center>
        <Heading
          textShadow="1px 1px 1px rgba(0,0,0,0.2)"
          as="h1"
          size={["2xl"]}
          fontSize={["22px", "24px", "28px", "40px", "2em"]}
          width={["initial", "initial", "70%", "initial"]}
          mr={["initial", "initial", "auto", "initial"]}
          ml={["initial", "initial", "auto", "initial"]}
          textAlign="center"
          pb={["10px", "0"]}
          mt={["10px", "40px"]}
          mb={["10px", "30px"]}
          color="#1E1D1D"
          p={[2, "initial"]}
        >
          Contactez-nous
        </Heading>
      </Center>
      <Box
        maxWidth={["360px", "800px"]}
        w={["355px", "initial"]}
        m="auto"
        p={[4, 3]}
        mb={[10, 0, 10, "20px", "20px"]}
        mt={["0", "0", "50px", "50px", "0"]}
        display="flex"
        flexDirection="column"
        borderRadius="3px"
        justifyContent="center"
        mb={["10px", "20px"]}
        alignItems="center"
      >
        <Text fontSize="18px" mb="20px">
          N’hésitez pas à nous envoyez vos demandes, nous y répondrons avec
          efficacité et dans les meilleurs délais, ici vous contacterez
          uniquement les responsables d’AtypikHouse et du site. Pour contactez
          les propriétaires, un espace est dédié sur chaque page de
          présentation.
        </Text>
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
        <form
          action="https://formspree.io/f/myylylol"
          method="POST"
          width="300px"
        >
          <FormControl id="form-contact">
            <FormLabel
              fontWeight="bold"
              color="#1E1D1D"
              fontSize={["18px", "18px"]}
            >
              Nom*
            </FormLabel>
            <Input
              _hover={{
                background: "#FFF",
                color: "#534b4f",
              }}
              border="solid #8ae98a 2px"
              borderRadius="0"
              focusBorderColor="#8ae98a"
              borderColor="#67E767"
              borderRadius="5px"
              fontSize={["18px", "22px"]}
              h={["30px", "40px"]}
              w={["100%", "450px"]}
              pattern="[a-zA-Z]{2,}$"
              placeholder="Dupont"
              type="text"
              mb={["10px", "20px"]}
              name="lastName"
              title="Votre nom"
            />
            <FormLabel
              fontWeight="bold"
              color="#1E1D1D"
              fontSize={["18px", "18px"]}
            >
              Prénom*
            </FormLabel>
            <Input
              _hover={{
                background: "#FFF",
                color: "#534b4f",
              }}
              border="solid #67E767 2px"
              borderColor="#67E767"
              borderRadius="5px"
              focusBorderColor="#8ae98a"
              w={["100%", "450px"]}
              fontSize={["18px", "22px"]}
              h={["30px", "40px"]}
              pattern="[a-zA-Z]{2,}$"
              placeholder="Jean"
              mb={["10px", "20px"]}
              title="Ce champ doit être uniquement rempli de lettre (a-z) et contenir au moins 2 caractères"
              type="text"
              name="firstName"
            />
            <FormLabel
              fontWeight="bold"
              color="#1E1D1D"
              fontSize={["18px", "18px"]}
            >
              Email*
            </FormLabel>
            <Input
              _hover={{
                background: "#FFF",
                color: "#534b4f",
              }}
              border="solid #67E767 2px"
              borderColor="#67E767"
              borderRadius="5px"
              focusBorderColor="#8ae98a 2px"
              focusBorderColor="#8ae98a"
              w={["100%", "450px"]}
              fontSize={["18px", "22px"]}
              h={["30px", "40px"]}
              placeholder="dupontjean@gmail.com"
              type="email"
              name="email"
            />

            <FormLabel
              mt={["10px", "20px"]}
              fontWeight="bold"
              color="#1E1D1D"
              fontSize={["18px", "18px"]}
            >
              Téléphone
            </FormLabel>
            <Input
              _hover={{
                background: "#FFF",
                color: "#534b4f",
              }}
              border="solid #67E767 2px"
              borderColor="#67E767"
              borderRadius="5px"
              focusBorderColor="#8ae98a"
              focusBorderColor="#8ae98a"
              w={["100%", "450px"]}
              fontSize={["18px", "22px"]}
              h={["30px", "40px"]}
              pattern="[0-9]+"
              placeholder="0102030405"
              title="Veuillez entrez des chiffres uniquement (exemple:)"
              type="text"
              name="phone"
            />
            <FormLabel mb="10px" mt="10px">
              Votre demande avec précision pour une réponse efficace
            </FormLabel>
            <Textarea
              placeholder="Ecrire votre demande ici"
              focusBorderColor="#8ae98a"
              focusBorderColor="#8ae98a"
            ></Textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <Box mt="4"></Box>
            <Button
              bg="#67E767"
              _hover={{
                background: "#8ae98a",
              }}
              type="submit"
              mt={4}
              p={6}
              fontSize="20px"
              color="#1E1D1D"
              backgroundColor="#67E767"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
              disabled={state.submitting}
            >
              Envoyer ma demande
            </Button>
          </FormControl>
        </form>
      </Box>
    </Layout>
  );
}
