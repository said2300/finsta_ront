import { Layout } from "@components/core/Layout";
import { useRouter } from "next/router";

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
  Image,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import PleaseSignIn from "../../components/core/PleaseSignIn";
import useAuth from "@context/context";
import { isError, useQuery } from "react-query";
import { getUserId } from "@services/user";
import { postApropos } from "@services/apropos";
import { useForm } from "react-hook-form";

export default function DashboardAdmin() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated, loading, user } = useAuth();
  const { isLoading, isError, data: userdata, refetch } = useQuery(
    ["userdata", user],
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect

    () => user && getUserId(user?.id)
  );

  return (
    <PleaseSignIn permissions={["ROLE_ADMIN"]}>
      <Layout>
        <Box h="69vh" w="100%">
          <Text textAlign="end" fontWeight="bold" fontSize="15px">
            {user?.roles}
          </Text>
          <Box
            pt="20px"
            mb="30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text mr="8px" fontSize="30px">
              Bonjour
            </Text>
            <Text fontWeight="bold" fontSize="30px">
              {userdata?.data.firstName},
            </Text>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              p={5}
              _hover={{
                background: "#67E767",
              }}
              bg="#67E767"
              onClick={() => {
                onOpen();
              }}
            >
              Changer la description de AtypikHouse
            </Button>
          </Box>
          <Box
            display={["flex"]}
            flexDirection={["column", "row"]}
            justifyContent="space-around"
            alignItems="center"
            w={["100%", "100%"]}
            p={[0, 10]}
            mt={["0", "10px"]}
          >
            <Link
              href="/admin/gestionuser"
              _hover={{
                textDecoration: "#8ae98a solid 3px",
              }}
            >
              <Box
                _hover={{
                  border: "#8ae98a solid 5px",
                  transition: "0.2s",
                }}
                w={["300px", "300px", "300px", "400px"]}
                minHeight={["100px", "150px"]}
                borderRadius="10px"
                textColor="#000"
                minWidth="250px"
                bg="#F8F8FF"
                display="flex"
                justifyContent="center"
                alignItems="center"
                opacity="0.8"
                fontSize="2xl"
                boxShadow=" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                mb={["10px", "initial"]}
              >
                <Box mr="20px" w={["40px", "60px"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 80.13 80.13"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <path
                        d="M48.355 17.922c3.705 2.323 6.303 6.254 6.776 10.817a11.69 11.69 0 004.966 1.112c6.491 0 11.752-5.261 11.752-11.751 0-6.491-5.261-11.752-11.752-11.752-6.429.002-11.644 5.169-11.742 11.574zm-7.699 24.062c6.491 0 11.752-5.262 11.752-11.752s-5.262-11.751-11.752-11.751c-6.49 0-11.754 5.262-11.754 11.752s5.264 11.751 11.754 11.751zm4.985.801h-9.972c-8.297 0-15.047 6.751-15.047 15.048v12.195l.031.191.84.263c7.918 2.474 14.797 3.299 20.459 3.299 11.059 0 17.469-3.153 17.864-3.354l.785-.397h.084V57.833c.003-8.297-6.747-15.048-15.044-15.048zm19.443-12.132h-9.895a14.483 14.483 0 01-4.47 10.088c7.375 2.193 12.771 9.032 12.771 17.11v3.758c9.77-.358 15.4-3.127 15.771-3.313l.785-.398h.084V45.699c0-8.296-6.75-15.046-15.046-15.046zm-45.049-.8c2.299 0 4.438-.671 6.25-1.814a14.544 14.544 0 015.467-9.276c.012-.22.033-.438.033-.66 0-6.491-5.262-11.752-11.75-11.752-6.492 0-11.752 5.261-11.752 11.752 0 6.488 5.26 11.75 11.752 11.75zm10.554 10.888a14.492 14.492 0 01-4.467-10.032c-.367-.027-.73-.056-1.104-.056h-9.971C6.75 30.653 0 37.403 0 45.699v12.197l.031.188.84.265c6.352 1.983 12.021 2.897 16.945 3.185v-3.683c.002-8.078 5.396-14.915 12.773-17.11z"
                        fill="#67e767"
                      />
                    </g>
                  </svg>
                </Box>
                <Text fontSize={["20px", "22px"]}>Gestion utilisateurs</Text>
              </Box>
            </Link>

            <Link
              href="/admin/gestionbien"
              _hover={{
                textDecoration: "#8ae98a solid 3px",
              }}
            >
              <Box
                w={["300px", "300px", "300px", "400px"]}
                minHeight={["100px", "150px"]}
                _hover={{
                  border: "#8ae98a solid 5px",
                  transition: "0.2s",
                }}
                borderRadius="10px"
                textColor="#000"
                minWidth="250px"
                bg="#F8F8FF"
                display="flex"
                justifyContent="center"
                alignItems="center"
                opacity="0.8"
                fontSize="2xl"
                boxShadow=" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              >
                <Box mr="20px" w={["40px", "60px"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 30.262 30.262"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <path
                        d="M15.131.002C6.773.002 0 6.777 0 15.13c0 8.358 6.773 15.13 15.131 15.13s15.131-6.771 15.131-15.13c0-8.353-6.774-15.128-15.131-15.128zm-2.272 24.146a.868.868 0 01-1.223 0l-.271-.271-.295-.293-1.266-1.266-.02-.029-5.807-5.851a.86.86 0 010-1.22l1.83-1.83a.86.86 0 011.221 0l5.225 5.262 10.98-10.982a.861.861 0 011.219 0l1.83 1.832a.862.862 0 010 1.221L12.859 24.148z"
                        fill="#67e767"
                      />
                    </g>
                  </svg>
                </Box>
                <Text fontSize={["20px", "22px"]}>Gestion biens</Text>
              </Box>
            </Link>
          </Box>
          <Box
            display={["flex"]}
            flexDirection={["column", "row"]}
            justifyContent="space-around"
            alignItems="center"
            w={["100%", "100%"]}
            p={[0, 10]}
            mt={["10px", "20px"]}
          >
            <Link
              href="/admin/gestioncommentaire"
              _hover={{
                textDecoration: "#8ae98a solid 3px",
              }}
            >
              <Box
                w={["300px", "300px", "300px", "400px"]}
                minHeight={["100px", "150px"]}
                _hover={{
                  border: "#8ae98a solid 5px",
                  transition: "0.2s",
                }}
                borderRadius="10px"
                textColor="#000"
                minWidth="250px"
                bg="#F8F8FF"
                display="flex"
                justifyContent="center"
                alignItems="center"
                opacity="0.8"
                fontSize="2xl"
                boxShadow=" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
                mb={["10px", "initial"]}
              >
                <Box mr="20px" w={["40px", "60px"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 512.001 512.001"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <circle cx="406" cy="226" r="15" fill="#67e767" />
                      <circle cx="346" cy="226" r="15" fill="#67e767" />
                      <circle cx="286" cy="226" r="15" fill="#67e767" />
                      <circle cx="226" cy="91" r="15" fill="#67e767" />
                      <circle cx="167.25" cy="91" r="15" fill="#67e767" />
                      <circle cx="106" cy="91" r="15" fill="#67e767" />
                      <path
                        d="M467 136H331V61c0-24.813-20.187-45-45-45H45C20.187 16 0 36.187 0 61v90c0 24.813 20.187 45 45 45h16v45a14.998 14.998 0 0014.987 15H45c-24.813 0-45 20.187-45 45v90c0 24.813 20.187 45 45 45h16v45a15 15 0 0025.607 10.606L142.213 436H286c24.813 0 45-20.187 45-45v-75h47.975l45.502 54.603A15 15 0 00451.001 361v-45h16c24.813 0 45-20.187 45-45v-90C512 156.187 491.813 136 467 136zM45 166c-8.271 0-15-6.729-15-15V61c0-8.271 6.729-15 15-15h241c8.271 0 15 6.729 15 15v75h-75c-19.555 0-36.228 12.542-42.42 30H136a14.996 14.996 0 00-10.606 4.394L91 204.786V181c0-8.284-6.716-15-15-15H45zm136 30v60H76.007a14.996 14.996 0 0010.599-4.394L142.213 196H181zm120 195c0 8.271-6.729 15-15 15H136a14.996 14.996 0 00-10.606 4.394L91 444.786V421c0-8.284-6.716-15-15-15H45c-8.271 0-15-6.729-15-15v-90c0-8.271 6.729-15 15-15h241c8.271 0 15 6.729 15 15v90zm181-120c0 8.271-6.729 15-15 15h-31c-8.284 0-15 6.716-15 15v18.569l-23.477-28.172A14.998 14.998 0 00386 286h-57.58c-6.192-17.458-22.865-30-42.42-30h-75v-75c0-8.271 6.729-15 15-15h241c8.271 0 15 6.729 15 15v90z"
                        fill="#67e767"
                      />
                      <circle cx="226" cy="346" r="15" fill="#67e767" />
                      <circle cx="166" cy="346" r="15" fill="#67e767" />
                      <circle cx="106" cy="346" r="15" fill="#67e767" />
                    </g>
                  </svg>
                </Box>
                <Text fontSize={["20px", "22px"]}>Gestion commentaires</Text>
              </Box>
            </Link>
            <Link
              href="/admin/gestioncategorie"
              _hover={{
                textDecoration: "#8ae98a solid 3px",
              }}
            >
              <Box
                w={["300px", "300px", "300px", "400px"]}
                minHeight={["100px", "150px"]}
                _hover={{
                  border: "#8ae98a solid 5px",
                  transition: "0.2s",
                }}
                borderRadius="10px"
                textColor="#000"
                minWidth="250px"
                bg="#F8F8FF"
                display="flex"
                justifyContent="center"
                alignItems="center"
                opacity="0.8"
                fontSize="2xl"
                boxShadow=" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              >
                <Box mr="20px" w={["40px", "60px"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 512 512"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <path
                        d="M0 113.293h113.293V0H0zm30.004-83.29h53.289v53.29h-53.29zm0 0M149.297 0v113.293H512V0zm332.7 83.293H179.3v-53.29h302.695zm0 0M0 260.3h113.293V147.009H0zm30.004-83.292h53.289v53.289h-53.29zm0 0M149.297 260.3H512V147.009H149.297zm30.004-83.292h302.695v53.289H179.301zm0 0M0 407.309h113.293V294.012H0zm30.004-83.293h53.289v53.289h-53.29zm0 0M149.297 407.309H512V294.012H149.297zm30.004-83.293h302.695v53.289H179.301zm0 0"
                        fill="#67e767"
                      />
                    </g>
                  </svg>
                </Box>
                <Text fontSize={["20px", "22px"]}>Gestion catégories</Text>
              </Box>
            </Link>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-around"
          flexDirection={["row", "column"]}
        >
          <Box>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalConfirmation onClose={onClose} />
            </Modal>
          </Box>
        </Box>
      </Layout>
    </PleaseSignIn>
  );
}

const ModalConfirmation = ({ onClose }) => {
  const router = useRouter();

  const toast = useToast();

  const { register, watch, control, errors, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const objectToSend = {
        description: data.description,
      };
      await postApropos(objectToSend);

      toast({
        position: "top",
        title: "Le commentaire a bien été posté",
        description: "Merci pour votre participation",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalContent backgroundColor="#fff" color="#000">
      <ModalHeader>Modifier la présentation de votre entreprise</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Text mb="10px">
          Vous vous appretez à changer la description qui se situe en bas de la
          page d'accueil.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl m="3px">
            <FormLabel fontWeight="bold" color="#000" fontSize="18px">
              Description
            </FormLabel>

            <Textarea
              _hover={{
                background: "#FFF",
                color: "#534b4f",
              }}
              borderColor={["#696969"]}
              focusBorderColor="#C64D4D"
              fontSize="18px"
              placeholder="AtypikHouse est très heureux de vous acceuillir..."
              type="text"
              name="description"
              ref={register({ required: true })}
              h="60px"
            />
          </FormControl>
          <Button
            mt="20px"
            type="submit"
            _hover={{ backgroundColor: "#1bd142" }}
            color="white"
            bg="#1bd142"
            mr={3}
          >
            Valider la description
          </Button>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button>Fermer</Button>
      </ModalFooter>
    </ModalContent>
  );
};
