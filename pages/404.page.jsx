import { Layout } from "@components/core/Layout";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Center,
  Grid,
  Button,
  Flex,
  Stack,
  GridItem,
  Text,
  Image,
  Select,
  OptionGroup,
  Option,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  AspectRatio,
  Img,
  Link,
} from "@chakra-ui/react";

export default function Custom404() {
  return (
    <Layout h="100%">
      <Center>
        <Box maxWidth="1400px" mt="27px" mb="27px">
          <Box position="relative" w="80vw" h="66vh">
            <Img src="/bg404.jpg" w="100%" h="100%"></Img>
          </Box>
          <Box
            position="absolute"
            h="66vh"
            w="80vw"
            bg="#000"
            top="92px"
            opacity="0.6"
          ></Box>
          <Box
            position="absolute"
            top={["30%", " 40%"]}
            left=" 50%"
            transform=" translate(-50%, -100%)"
          >
            <Text
              textShadow=" 6px 6px 0px rgba(0,0,0,0.2)"
              fontWeight="bold"
              color="white"
              /* à 50%/50% du parent référent */
              /* décalage de 50% de sa propre taille */
              fontSize={["20px", "25px", "30px", "35px", "38px"]}
              textAlign="center"
            >
              Ce chemin n'est pas sur nos plans cher visiteur
            </Text>
          </Box>
          <Link href="/">
            <Button
              position="absolute"
              top={["35%", " 50%"]}
              transform=" translate(-50%, -100%)"
              left=" 50%"
              bg="#FFF"
              p={5}
            >
              Retourner en terre connue{" "}
            </Button>
          </Link>
        </Box>
      </Center>
    </Layout>
  );
}
