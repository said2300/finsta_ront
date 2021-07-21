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
  Center,
  Wrapper,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";
import PleaseSignIn from "../../components/core/PleaseSignIn";
import useAuth from "@context/context";
import { isError, useQuery } from "react-query";
import { getUserId } from "@services/user";

export default function DashboardUser() {
  const { isAuthenticated, loading, user } = useAuth();
  const { isLoading, isError, data: userdata, refetch } = useQuery(
    ["userdata", user],
    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect

    () => user && getUserId(user?.id)
  );

  return (
    <PleaseSignIn permissions={["ROLE_USER"]}>
      <Layout>
        <Box h="69vh" w="100%">
          <Box
            pt="80px"
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

          <Box
            display={["flex"]}
            flexDirection={["column", "row"]}
            justifyContent="space-around"
            alignItems="center"
            w={["100%", "100%"]}
            p={[0, 10]}
            mt={["0", "40px"]}
          >
            <Link
              href="/espace-personnel/mes-reservations"
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
                    viewBox="0 0 512 512"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <path
                        d="M368.914 259.621l-49.676-49.68-124.57 124.575-51.996-51.996-49.676 49.675 101.672 101.672zm0 0"
                        fill="#67e767"
                      />
                      <path d="M7.5 150.273h30V504.5h-30zm0 0" fill="#e84141" />
                      <path
                        d="M124.555 94.875V15.309c2.53-2.532 4.144-4.149 6.363-6.364L129.473 7.5h-27.11l-7.808 7.809v79.566l7.808 7.809h27.11l1.445-1.446c-2.219-2.218-3.832-3.836-6.363-6.363zm0 0M357.133 94.875V15.309c2.527-2.532 4.144-4.149 6.36-6.364L362.046 7.5h-27.11c-3.046 3.05-4.757 4.758-7.804 7.809v79.566c3.047 3.05 4.758 4.758 7.805 7.809h27.109l1.445-1.446c-2.215-2.218-3.832-3.836-6.36-6.363zm0 0"
                        fill="#41e841"
                      />
                      <path
                        d="M364.938 102.684h27.109l7.808-7.809V55.09h-30v39.785c-2.53 2.527-4.144 4.145-6.363 6.36zm0 0M7.5 55.09h30v95.183h-30zm0 0M132.363 102.684h27.11c3.047-3.051 4.757-4.758 7.804-7.809V55.09h-30v39.785l-6.359 6.36zm0 0"
                        fill="#e84141"
                      />
                      <path
                        d="M124.246 330.945l34.676-34.675-15-15-49.676 49.675 101.672 101.672 15-15zm0 0"
                        fill="#6ad34d"
                      />
                      <path
                        d="M252.203 110.184h-15v-15h15zm-25 0h-15v-15h15zm0 0"
                        fill="#fff"
                      />
                      <path d="M449.41 497H15V170.273H0V512h464.41V170.273h-15zm0 0M132.578 110.184l12.2-12.204V12.2L132.577 0h-33.32L87.055 12.2v85.78l12.203 12.204zm-30.523-91.77L105.469 15h20.894l3.414 3.414V91.77l-3.414 3.414H105.47l-3.414-3.414zm0 0M365.152 110.184l12.203-12.204V12.2L365.152 0h-33.32l-12.2 12.2v85.78l12.2 12.204zm-30.52-91.77L338.048 15h20.894l3.414 3.414V91.77l-3.414 3.414h-20.894l-3.414-3.414zm0 0" />
                      <path d="M389.855 47.59v15h59.555v80.183H15V62.59h59.555v-15H0v110.183h464.41V47.59zm0 0" />
                      <path d="M157.277 47.59h149.856v15H157.277zm0 0M320.488 198.086l-124.57 124.57-51.996-51.996-60.285 60.285 112.277 112.278L380.77 258.37zm-215.636 132.86l39.07-39.071 51.996 51.996 124.57-124.57 39.07 39.07-163.64 163.64zm0 0" />
                    </g>
                  </svg>
                </Box>
                <Text>Mes réservations</Text>
              </Box>
            </Link>

            <Link
              href="/espace-personnel/historique"
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
                    viewBox="0 0 376.6 376.6"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <g fill="#67e767">
                        <path d="M327.6 67.6c-6.8-25.6-30.4-44.4-57.2-44.4H59.2C26.8 23.2 0 49.6 0 82.4v98C0 208 19.6 232 46 238c6.4 25.6 29.6 44.4 57.2 44.4h8.8v59.2c0 3.2 2 6.4 4.8 8 1.2.4 2.4.8 4 .8 2 0 3.6-.8 5.2-2l85.6-66h102.8c32.4 0 59.2-26.4 59.2-59.2v-98c0-28-19.6-51.6-46-57.6zM44 125.2v94c-15.6-6-26.4-21.2-26.4-38.8v-98c0-22.8 18.8-41.6 41.6-41.6h211.6c16.8 0 31.6 10.4 38 25.2H103.2C70.8 66 44 92.4 44 125.2zm312.4 98h-.4c0 22.8-18.8 41.6-41.6 41.6H208.8c-2 0-4 .8-5.2 2l-74 57.2v-50.4c0-4.8-4-8.8-8.8-8.8h-17.6c-22.8 0-41.6-18.8-41.6-41.6v-98c0-22.8 18.8-41.6 41.6-41.6h211.6c22.8 0 41.6 18.8 41.6 41.6v98z" />
                        <path d="M298.8 122.4h-180c-4.8 0-8.8 4-8.8 8.8 0 4.8 4 8.8 8.8 8.8h180c4.8 0 8.8-4 8.8-8.8 0-4.8-4-8.8-8.8-8.8zM298.8 160.8h-180c-4.8 0-8.8 4-8.8 8.8s4 8.8 8.8 8.8h180c4.8 0 8.8-4 8.8-8.8s-4-8.8-8.8-8.8zM298.8 199.6h-180c-4.8 0-8.8 4-8.8 8.8s4 8.8 8.8 8.8h180c4.8 0 8.8-4 8.8-8.8 0-5.2-4-8.8-8.8-8.8z" />
                      </g>
                    </g>
                  </svg>
                </Box>
                <Text>Donnez votre avis</Text>
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
              href="/espace-personnel/informations-personnelles"
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
                    viewBox="0 0 512 512"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <path
                        d="M192 213.332c-58.816 0-106.668-47.848-106.668-106.664S133.184 0 192 0s106.668 47.852 106.668 106.668c0 58.816-47.852 106.664-106.668 106.664zM192 32c-41.172 0-74.668 33.492-74.668 74.668 0 41.172 33.496 74.664 74.668 74.664s74.668-33.492 74.668-74.664C266.668 65.492 233.172 32 192 32zm0 0M474.668 490.668H357.332c-20.586 0-37.332-16.746-37.332-37.336v-74.664c0-20.59 16.746-37.336 37.332-37.336h117.336c20.586 0 37.332 16.746 37.332 37.336v74.664c0 20.59-16.746 37.336-37.332 37.336zM357.332 373.332a5.337 5.337 0 00-5.332 5.336v74.664a5.337 5.337 0 005.332 5.336h117.336a5.337 5.337 0 005.332-5.336v-74.664a5.337 5.337 0 00-5.332-5.336zm0 0"
                        class="selected"
                        fill="#67e767"
                      />
                      <path
                        d="M453.332 373.332h-74.664c-8.832 0-16-7.168-16-16v-48C362.668 279.937 386.602 256 416 256s53.332 23.937 53.332 53.332v48c0 8.832-7.168 16-16 16zm-58.664-32h42.664v-32c0-11.754-9.578-21.332-21.332-21.332s-21.332 9.578-21.332 21.332zm0 0M266.668 448H16c-8.832 0-16-7.168-16-16v-74.668C0 301.461 45.46 256 101.332 256H288c17.836 0 35.39 4.715 50.754 13.652 7.637 4.438 10.215 14.23 5.781 21.868-4.437 7.66-14.23 10.218-21.89 5.78-10.473-6.077-22.465-9.3-34.645-9.3H101.332C63.105 288 32 319.105 32 357.332V416h234.668c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0"
                        class="selected"
                        fill="#67e767"
                      />
                    </g>
                  </svg>
                </Box>
                <Text>Informations personnelles</Text>
              </Box>
            </Link>
            <Link
              href="/formulaire-de-contact"
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
                    viewBox="0 0 60 60"
                  >
                    <rect width="100%" height="100%" fill="none" />
                    <g class="currentLayer">
                      <g fill-rule="nonzero" fill="#67e767">
                        <path d="M31.238 33.99a22.112 22.112 0 01-6.604-1.042 9.99 9.99 0 01-6.636-7.563c-.753-3.626.62-7.46 3.764-10.52a17.43 17.43 0 011.052-.944 12.746 12.746 0 0111.605-2.505 9.717 9.717 0 016.756 8.937 9.206 9.206 0 01-2.152 6.506 5.058 5.058 0 01-4.946 1.816A2.857 2.857 0 0132.24 27.4a2.715 2.715 0 01-.264-2.11c.875-3.306 1.764-8.33 1.773-8.38a1 1 0 111.97.348c-.037.209-.913 5.157-1.809 8.543a.722.722 0 00.045.569.89.89 0 00.58.357 3.106 3.106 0 002.985-1.185 7.198 7.198 0 001.66-5.087 7.735 7.735 0 00-5.356-7.13 10.701 10.701 0 00-9.734 2.135c-.321.267-.634.546-.934.838-1.554 1.512-4.037 4.65-3.2 8.68a8.098 8.098 0 005.285 6.064c4.69 1.496 11.43 1.677 14.98-2.738a1 1 0 011.559 1.252c-2.626 3.266-6.622 4.434-10.542 4.434z" />
                        <path d="M27.815 28.805a4.598 4.598 0 01-2.92-.981c-1.919-1.536-1.972-4.205-1.434-6.022.182-.605.425-1.19.727-1.745a8.198 8.198 0 013.435-3.565 4.729 4.729 0 015.563.896 7.484 7.484 0 011.594 2.746 1 1 0 01-1.884.67 5.579 5.579 0 00-1.156-2.035 2.707 2.707 0 00-3.234-.483 6.269 6.269 0 00-2.565 2.733 7.16 7.16 0 00-.563 1.356c-.389 1.314-.303 3.03.769 3.888 1.172.942 3.15.544 4.263-.416a11.152 11.152 0 002.113-2.572 1 1 0 111.7 1.055 13.128 13.128 0 01-2.503 3.027 6.144 6.144 0 01-3.905 1.448z" />
                        <path d="M57 60H3a3.003 3.003 0 01-3-3V20a1 1 0 011.64-.769l24.536 20.392a6.005 6.005 0 007.65 0L58.36 19.23A1 1 0 0160 20v37a3.003 3.003 0 01-3 3zM2 22.131V57c0 .552.448 1 1 1h54a1 1 0 001-1V22.131l-22.898 19.03a8.01 8.01 0 01-10.203.002z" />
                        <path d="M1.001 21a1 1 0 01-.58-1.816l9-6.38a1 1 0 011.157 1.632l-9 6.38a.994.994 0 01-.577.184zM58.999 21a.994.994 0 01-.577-.184l-9-6.38a1 1 0 011.156-1.632l9 6.38A1 1 0 0159 21zM39.24 7a.997.997 0 01-.578-.184l-4.78-3.39a6.01 6.01 0 00-7.703-.047l-4.84 3.437a1 1 0 11-1.157-1.632l4.78-3.39a7.963 7.963 0 0110.137.046l4.72 3.344A1 1 0 0139.239 7zM1.65 59.46a1 1 0 01-.64-1.77l22.82-18.96a1 1 0 111.278 1.539l-22.82 18.96a.997.997 0 01-.638.231zM58.349 59.46a.994.994 0 01-.638-.231l-22.82-18.96a1 1 0 111.278-1.538l22.82 18.96a1 1 0 01-.64 1.77z" />
                        <path d="M50 28.48a1 1 0 01-1-1V7.008c-.003.02-.043-.008-.11-.008H11.11a.162.162 0 00-.12.043L11 27.48a1 1 0 01-2 0V7a2.06 2.06 0 012.11-2h37.78A2.06 2.06 0 0151 7v20.48a1 1 0 01-1 1z" />
                      </g>
                    </g>
                  </svg>
                </Box>
                <Text>Contactez nous</Text>
              </Box>
            </Link>
          </Box>
        </Box>
      </Layout>
    </PleaseSignIn>
  );
}
