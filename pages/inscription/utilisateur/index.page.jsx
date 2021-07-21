//React Next
import { useForm } from "react-hook-form";
import { useState } from "react";
import Router from "next/router";

//Services
import { inscriptionUtilisateur, inscriptionNewsltter } from "@root/services/authentification";

//Styles
import { Layout } from "@components/core/Layout";
import { Alert } from "react-bootstrap";
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
  Text,
  Checkbox,
  link
} from "@chakra-ui/react";
import Link from "next/link";
  


const FormPage = () => {
  const [show, setShow] = useState(false);

  const [checkedNewsLetters, setCheckedNewsLetters] = useState(false);


  const toast = useToast();

  const handleClick = () => setShow(!show);

  const { register, handleSubmit, errors } = useForm();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));


  const onSubmit = async (data) => {
    try {
     
      await inscriptionUtilisateur({ ...data,checkedNewsLetters, roles: ["ROLE_USER"] });

     // console.log(checkedNewsLetters); 
      toast({
        position: "top",
        title: "Votre compte a bien été créé",
        description: "Validez votre compte grâce au mail que vous avez reçu",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Impossible de créer le compte",
        description:
          "Votre adresse email est déjà associé à un compte hébergeur",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    await delay(2000);
    await Router.push("/connexion");
  };

    

  return (
    <Layout h="100vh">
      <Box justifyContent="center" h={["auto", "100%", "auto", "auto", "85vh"]}>
        <Box>
          <Heading
            textShadow="1px 1px 1px rgba(0,0,0,0.2)"
            as="h1"
            size={["2xl"]}
            fontSize={["24px", "2em"]}
            width={["initial", "initial", "70%", "initial"]}
            mr={["initial", "initial", "auto", "initial"]}
            ml={["initial", "initial", "auto", "initial"]}
            textAlign="center"
            pb={["20px", "50px"]}
            mt={["40px", "60px"]}
            color="#1E1D1D"
          >
            
            Partage un moment de bonheur, à deux ou à plusieurs
          </Heading>
          <Box
            maxWidth={["350px", "700px"]}
            m="auto"
            boxShadow="   rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
            p={[5, 10]}
            borderRadius="10px"
            mb={[10, 0, 10, "20px", 0]}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                mt={2}
                id="nom"
                mb={["10px", "30px", "30px", "30px"]}
              >
                <FormLabel
                  fontWeight="bold"
                  color="#534b4f"
                  fontSize={["20px", "24px"]}
                >
                  Nom*
                </FormLabel>
                <Box>
                  <Input
                    _hover={{
                      background: "#FFF",
                      color: "#534b4f",
                    }}
                    boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                    borderColor="#e4e4e4"
                    focusBorderColor="#21b942"
                    lor={["#696969"]}
                    h={["40px", "50px"]}
                    fontSize={["18px", "22px"]}
                    placeholder="Entrer votre nom"
                    type="text"
                    name="lastName"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                      },
                    })}
                    title="Ce champ doit être uniquement rempli de lettre (a-z) et contenir au moins 2 caractères"
                  />
                  {errors.lastName && (
                    <Alert variant="danger">
                      {errors.lastName?.type === "required" && (
                        <Text color="#DC143C">
                          Votre nom est requis pour l'inscription
                        </Text>
                      )}
                      {errors.lastName?.type === "pattern" && (
                        <Text color="#DC143C">
                          Ce champ doit être composé de lettre uniquement
                        </Text>
                      )}
                    </Alert>
                  )}
                </Box>
              </FormControl>
              <FormControl mt={2} id="prenom" mb={["10px", "30px"]}>
                <FormLabel
                  fontWeight="bold"
                  fontSize={["20px", "24px"]}
                  color="#534b4f"
                >
                  Prénom*
                </FormLabel>
                <Input
                  _hover={{
                    background: "#FFF",
                    color: "#534b4f",
                  }}
                  focusBorderColor="#21b942"
                  errorBorderColor="#c02b2b"
                  boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                  borderColor="#e4e4e4"
                  h={["40px", "50px"]}
                  fontSize={["18px", "22px"]}
                  placeholder="Entrer votre prénom"
                  type="text"
                  name="firstName"
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                    },
                  })}
                />
                {errors.lastName && (
                  <Alert variant="danger">
                    {errors.firstName?.type === "required" && (
                      <Text color="#DC143C">Le champ est requis</Text>
                    )}
                    {errors.firstName?.type === "pattern" && (
                      <Text color="#DC143C">
                        Ce champ doit être composé de lettre uniquement
                      </Text>
                    )}
                  </Alert>
                )}
              </FormControl>
              <FormControl mt={2} id="email" mb={["10px", "30px"]}>
                <FormLabel
                  fontWeight="bold"
                  fontSize={["20px", "24px"]}
                  color="#534b4f"
                >
                  Adresse email*
                </FormLabel>
                <Input
                  _hover={{
                    color: "#534b4f",
                  }}
                  focusBorderColor="#21b942"
                  boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                  borderColor="#e4e4e4"
                  h={["40px", "50px"]}
                  fontSize={["18px", "22px"]}
                  placeholder="Entrer votre adresse email"
                  type="text"
                  name="email"
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Entrer une adresse email valide",
                    },
                  })}
                />
                {errors.lastName && (
                  <Alert variant="danger">
                    {errors.email?.type === "required" && (
                      <Text color="#DC143C">Le champ est requis</Text>
                    )}
                    {errors.email?.type === "pattern" && (
                      <Text color="#DC143C">
                        Ce champ doit être sous la forme jean@dupont.com
                      </Text>
                    )}
                  </Alert>
                )}
              </FormControl>

              <FormControl mt={2} id="email" mb={["10px", "30px"]}>
                <FormLabel
                  fontWeight="bold"
                  fontSize={["20px", "24px"]}
                  color="#534b4f"
                >
                  Mot de passe*
                </FormLabel>
                <InputGroup>
                  <Input
                    _hover={{
                      background: "#FFF",
                      color: "#696969",
                    }}
                    focusBorderColor="#21b942"
                    boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                    borderColor="#e4e4e4"
                    color="#696969"
                    h={["40px", "50px"]}
                    fontSize={["10px", "22px"]}
                    type={show ? "text" : "password"}
                    placeholder="1 majuscule, 1 minuscule et 1 chiffre au minimum "
                    title="Au moins 8 caractères, un chiffre et une lettre "
                    name="password"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                      },
                    })}
                  />

              

                  <InputRightElement width="4.5rem">
                    <Button
                      mt={["0px", "10px"]}
                      mr={["2px", "10px"]}
                      fontSize={["14px", "18px"]}
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                      color="#C0C0C0"
                    >
                      {show ? "Cacher" : "Montrer"}
                    </Button>
                  </InputRightElement>
                </InputGroup>


                {errors.password && (
                  <Alert variant="danger">
                    {errors.password?.type === "required" && (
                      <Text color="#DC143C">Le champ est requis</Text>
                    )}
                    {errors.password?.type === "pattern" && (
                      <Text color="#DC143C">
                        Le mot de passe doit contenir au moins 8 caractères, 1
                        minuscule et 1 majuscule
                      </Text>
                    )}
                  </Alert>
                )}
              </FormControl>

                <Checkbox colorScheme="green" 
                onChange={(e) => setCheckedNewsLetters(e.target.checked)}
                
                  mt={["0px", "10px"]}
                  mr={["2px", "10px"]}>
                   S'inscrire à la newsletter
                 </Checkbox>
                 <Checkbox colorScheme="green" 
                  mt={["0px", "10px"]}
                  mr={["2px", "10px"]}
                  display="flex"
                  isRequired
                  color="teal.500">
                    <Link  href="/apropos/mention-legale">accepter les conditions d'utilisation </Link>*
                 </Checkbox>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Text>* Requis</Text>
                <Button
                  bg="#67E767"
                  _hover={{
                    background: "#67E767",
                  }}
                  type="submit"
                  mt={4}
                  p={[4, 7]}
                  fontSize={["18px", "24px"]}
                  color="#000"
                  boxShadow="1px 1px 10px 0px #656565"
                >
                  S'inscrire
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default FormPage;