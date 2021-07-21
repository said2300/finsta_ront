import { Layout } from "@components/core/Layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { putPassword } from "@root/services/user";

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
    putPassword(data.token, {password:data.password});
    await Router.push("/connexion");
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} height="100%" >
        <Box
          display={["flex"]}
          justifyContent="center"
          alignItems="center"
        >
          <Box w="220px">
            <FormLabel
              fontSize={["18px", "18px"]}
              fontWeight="bold"
              color={["#FFF", "#000"]}
            >
              Coller le code que vous avez reçu dans l'email de confirmation
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
          </Box>
          <Box w="220px">
            <FormLabel
              fontSize={["18px", "18px"]}
              fontWeight="bold"
              color={["#FFF", "#000"]}
            >
              Nouveau mot de passe
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
              name="password"
              ref={register}
              type="password"
              mb={["10px", "initial"]}
              bg={["#FFF", "initial"]}
              opacity="0.7"
            />
          </Box>
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
      </form>
    </Layout>
  );
};

export default VerificationCompte;
