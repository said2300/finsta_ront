//React
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

//Context
import useAuth from "@auth/context";

//Styles
import { Layout } from "@components/core/Layout";
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
  Link,
} from "@chakra-ui/react";

const FormPage = () => {
  const { login } = useAuth();
  const [show, setShow] = useState(false);

  const toast = useToast();

  const handleClick = () => setShow(!show);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      toast({
        title: "Une erreur est survenue",
        description: "Email ou mot de passe invalide",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box
        height={["initial", "70vh"]}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Box>
          <Heading
            textShadow="1px 1px 1px rgba(0,0,0,0.2)"
            as="h1"
            size={["2xl"]}
            fontSize={["24px", "24px", "28px", "32px", "2em"]}
            width={["initial", "initial", "70%", "initial"]}
            mr={["initial", "initial", "auto", "initial"]}
            ml={["initial", "initial", "auto", "initial"]}
            textAlign="center"
            pb={["30px", "20px"]}
            mt={["40px", "20px"]}
            mb={["40px", "initial"]}
            color="#1E1D1D"
            p={[1, "initial"]}
          >
            Connectez vous pour accéder à votre compte
          </Heading>
          <Box
            maxWidth={["350px", "700px"]}
            m="auto"
            boxShadow="   rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
            p={[5, 10]}
            borderRadius="10px"
            mb={[10, 0, 10, "20px", "0"]}
            mt={["0", "0", "40px", "40px", "60px"]}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                mt={2}
                id="email"
                mb={["10px", "30px", "30px", "30px"]}
              >
                <FormLabel
                  fontWeight="bold"
                  color="#534b4f"
                  fontSize={["20px", "24px"]}
                >
                  Adresse email
                </FormLabel>
                <Input
                  _hover={{
                    background: "#FFF",
                    color: "#534b4f",
                  }}
                  boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                  borderColor="#e4e4e4"
                  focusBorderColor="#21b942"
                  lor={["#696969"]}
                  h="50px"
                  fontSize={["18px", "22px"]}
                  placeholder="Entrer votre adresse email"
                  type="email"
                  name="email"
                  ref={register({
                    required: true,
                  })}
                />
              </FormControl>

              <FormControl mt={5} id="email">
                <FormLabel
                  fontWeight="bold"
                  color="#534b4f"
                  fontSize={["20px", "24px"]}
                >
                  Mot de passe
                </FormLabel>
                <InputGroup>
                  <Input
                    _hover={{
                      background: "#FFF",
                      color: "#534b4f",
                    }}
                    boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                    borderColor="#e4e4e4"
                    focusBorderColor="#21b942"
                    lor={["#696969"]}
                    h="50px"
                    fontSize={["18px", "22px"]}
                    type={show ? "text" : "password"}
                    placeholder="Entrer votre mot de passe"
                    name="password"
                    ref={register({
                      required: true,
                      minLength: {
                        value: 5,
                        message:
                          "La longueur du mot de passe doit etre supérieur a 5",
                      },
                    })}
                  />

                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                      mt={["10px", "0"]}
                    >
                      {show ? "Hide" : "Montrez"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <span role="alert">{errors.password.message}</span>
                )}
              </FormControl>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                mt={2}
                mt={5}
              >
                <Button
                  _hover={{
                    background: "#C64D4D",
                    color: "#FFF",
                  }}
                  textAlign="center"
                  justifyContent="center"
                  alignItems="center"
                  mt={4}
                  p={[4, 6, 6, 7]}
                  bg="#89E98A"
                  _hover={{
                    background: "#8ae98a",
                  }}
                  color="#000"
                  display="flex"
                  type="submit"
                  fontSize={["18px", "24px"]}
                  right="0"
                  boxShadow="lg"
                  fontWeight="bold"
                >
                  Connexion
                </Button>
              </Box>
              <Link href="/mot-de-passe"> Mot de passe oublié</Link>
            </form>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default FormPage;
