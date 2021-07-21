import { Layout } from "@components/core/Layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { sendTokenVerify } from "@root/services/user";
import Router from "next/router";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Center,
  Wrapper,
  Text,
  Link,
} from "@chakra-ui/react";

const VerificationCompte = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      sendTokenVerify(data.token, {});
      alert("Votre compte est validé");
      await Router.push(`/connexion`);
    } catch (err) {
      alert("error");
    }
  };
  return (
    <Layout>
      <Box h="71vh" display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display={["column", "flex"]}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              w="750px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <FormLabel fontWeight="bold" color={["#FFF", "#000"]}>
                <Text fontSize={["18px", "24px"]}>
                  Coller le code que vous avez reçu dans l'email de confirmation
                </Text>
              </FormLabel>
              <Input
                _hover={{
                  background: "#FFF",
                  color: "#000",
                }}
                focusBorderColor="#C64D4D"
                w={["100%", "150px"]}
                fontSize="18px"
                borderColor={["#FFF", "#696969"]}
                name="token"
                ref={register}
                type="text"
                mb={["10px", "initial"]}
                bg={["#FFF", "initial"]}
                opacity="0.7"
              />
              <Input
                ml={["35px", "0"]}
                mt={["35", "28px"]}
                placeholder="Rechercher"
                cursor=" pointer"
                _hover={{
                  background: "#C64D4D",
                  color: "#FFF",
                }}
                fontWeight="bold"
                w={["160px", "150px"]}
                borderColor="#696969"
                color="#FFF"
                h={["55px", "40px"]}
                background="#C64D4D"
                errorBorderColor="red.300"
                focusBorderColor="#000"
                type="submit"
                fontSize="20px"
                borderRadius="10px"
              />
            </Box>
          </Box>
        </form>
      </Box>
    </Layout>
  );
};

export default VerificationCompte;
