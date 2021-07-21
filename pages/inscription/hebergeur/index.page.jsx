//React
import { useForm } from "react-hook-form";
import { useState } from "react";
import Router from "next/router";

//Context
import useAuth from "@auth/context";

//Serives
import { inscriptionHebergeur } from "@root/services/authentification";

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
  Text,
  Checkbox,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const FormPage = () => {
  const { loginHebergeur } = useAuth();
  const [show, setShow] = useState(false);

  const [checkedNewsLetters, setCheckedNewsLetters] = useState(false);

  const toast = useToast();

  const handleClick = () => setShow(!show);

  const { register, handleSubmit } = useForm();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const onSubmit = async (data) => {
    try {
      await inscriptionHebergeur({ ...data,checkedNewsLetters, roles: ["ROLE_PROPRIO"],checkedNewsLetters: false });
      toast({
        position: "top",
        title: "Votre compte a bien été créé",
        description:
          "Attendez la validation de votre compte pour mettre votre premier bien en location",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      await delay(2000);

      // try {
      //   await loginHebergeur(data.email, data.password);
      // } catch (error) {
      //   toast({
      //     title: "Une erreur est survenue",
      //     description: "Email ou mot de passe invalide",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //   });
      // }
    } catch (error) {
      toast({
        title: "Votre adresse email est déjà associé à un compte hébergeur",
        description: "Veuillez chosir une adresse mail différente",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        mb="20px"
      >
        <Box>
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
            Devenez partenaire AtypikHouse, mettez vos biens en location
          </Heading>

          <Box
            maxWidth={["350px", "600px"]}
            m="auto"
            boxShadow="   rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
            p={[4, 3]}
            mb={[10, 0, 10, "20px", "20px"]}
            mt={["0", "0", "40px", "40px", "0"]}
            display="flex"
            flexDirection="column"
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box maxWidth={["300px", "initial"]}>
                <FormControl mt={[0, 2]} id="nom" mb="25px">
                  <FormLabel
                    fontWeight="bold"
                    color="#1E1D1D"
                    fontSize={["20px", "22px"]}
                  >
                    Nom*
                  </FormLabel>
                  <Input
                    _hover={{
                      background: "#FFF",
                      color: "#534b4f",
                    }}
                    border="solid #961010 1px"
                    borderRadius="0"
                    focusBorderColor="#8ae98a"
                    boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                    borderColor="#e4e4e4"
                    borderRadius="5px"
                    fontSize={["18px", "22px"]}
                    h={["40px", "50px"]}
                    w={["100%", "450px"]}
                    pattern="[a-zA-Z]{2,}$"
                    placeholder="Dupont"
                    type="text"
                    name="lastName"
                    ref={register({ required: true })}
                    title="Ce champ doit être uniquement rempli de lettre (a-z) et contenir au moins 2 caractères"
                  />
                </FormControl>
                <FormControl mt={2} id="prenom" mb="25px">
                  <FormLabel
                    fontWeight="bold"
                    color="#1E1D1D"
                    fontSize={["20px", "22px"]}
                  >
                    Prénom*
                  </FormLabel>
                  <Input
                    _hover={{
                      background: "#FFF",
                      color: "#534b4f",
                    }}
                    boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                    borderColor="#e4e4e4"
                    borderRadius="5px"
                    focusBorderColor="#8ae98a"
                    w={["100%", "450px"]}
                    fontSize={["18px", "22px"]}
                    h={["40px", "50px"]}
                    pattern="[a-zA-Z]{2,}$"
                    placeholder="Jean"
                    title="Ce champ doit être uniquement rempli de lettre (a-z) et contenir au moins 2 caractères"
                    type="text"
                    name="firstName"
                    ref={register({ required: true })}
                  />
                </FormControl>
                <FormControl mt={2} id="email" mb="25px">
                  <FormLabel
                    fontWeight="bold"
                    color="#1E1D1D"
                    fontSize={["20px", "22px"]}
                  >
                    Adresse email*
                  </FormLabel>
                  <Input
                    _hover={{
                      background: "#FFF",
                      color: "#534b4f",
                    }}
                    boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                    borderColor="#e4e4e4"
                    borderRadius="5px"
                    focusBorderColor="#8ae98a 2px"
                    w={["100%", "450px"]}
                    fontSize={["18px", "22px"]}
                    h={["40px", "50px"]}
                    placeholder="dupontjean@gmail.com"
                    type="email"
                    name="email"
                    ref={register({ required: true })}
                  />
                </FormControl>
                <FormControl mt={2} id="email" mb="25px">
                  <FormLabel
                    fontWeight="bold"
                    color="#1E1D1D"
                    fontSize={["20px", "22px"]}
                  >
                    Numéro de téléphone*
                  </FormLabel>
                  <Input
                    _hover={{
                      background: "#FFF",
                      color: "#534b4f",
                    }}
                    boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                    borderColor="#e4e4e4"
                    borderRadius="5px"
                    focusBorderColor="#8ae98a"
                    focusBorderColor="#8ae98a"
                    w={["100%", "450px"]}
                    fontSize={["18px", "22px"]}
                    h={["40px", "50px"]}
                    pattern="[0-9]+"
                    placeholder="0102030405"
                    title="Veuillez entrez des chiffres uniquement (exemple:)"
                    type="text"
                    name="phone"
                    ref={register({ required: true })}
                  />
                </FormControl>

                <FormControl mt={2} id="email" mb="25px">
                  <FormLabel
                    fontWeight="bold"
                    color="#1E1D1D"
                    fontSize={["20px", "22px"]}
                  >
                    Mot de passe*
                  </FormLabel>
                  <InputGroup>
                    <Input
                      _hover={{
                        background: "#FFF",
                        color: "#534b4f",
                      }}
                      boxShadow="    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                      borderColor="#e4e4e4"
                      borderRadius="5px"
                      focusBorderColor="#8ae98a"
                      focusBorderColor="#8ae98a"
                      w={["100%", "450px"]}
                      fontSize={["12px", "18px"]}
                      h={["40px", "50px"]}
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                      title="Au moins 8 caractères, un chiffre et une lettre "
                      type={show ? "text" : "password"}
                      placeholder=" 8 caractères, un chiffre et une lettre"
                      name="password"
                      ref={register({ required: true })}
                    />

                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        fontSize={["10px", "initial"]}
                        onClick={handleClick}
                      >
                        {show ? "Cacher" : "Montrer"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>
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
                  p={[5, 7]}
                  fontSize={["18px", "20px"]}
                  color="#1E1D1D"
                  backgroundColor="#67E767"
                  boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
                >
                  S'inscrire{" "}
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
