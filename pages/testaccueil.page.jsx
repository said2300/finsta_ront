import { Layout } from "@components/core/Layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Iconcalendar from "../components/ui/Icon";

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
} from "@chakra-ui/react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  addDays,
  formatDistanceStrict,
  format,
  getTime,
  isSameDay,
} from "date-fns";

import Link from "next/link";
import useAuth from "@auth/context";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const getBetweenDate = (startDate, stopDate, dayAvailabled = []) => {
  const arrayOfDayAvaibled = dayAvailabled.map((e) => new Date(e.jourDispo));

  const dateArray = [];
  let currentDate = getTime(startDate);

  while (currentDate <= getTime(stopDate)) {
    if (!arrayOfDayAvaibled.find((e) => isSameDay(e, currentDate))) {
      dateArray.push(new Date(currentDate));
    }
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
};

const numberOfMonths = 1;

export default function Home({ properties, data }) {
  const breakpoints = createBreakpoints({
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  });

  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const { register, handleSubmit } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [intervalDay, setIntervalDay] = useState(0);
  const [statePicker, setStatePicker] = useState({
    from: undefined,
    to: undefined,
  });

  const { from, to } = statePicker;
  const modifiers = { start: from, end: to };

  useEffect(() => {
    if (from && to) {
      const duration = formatDistanceStrict(from, to, { unit: "day" }).split(
        " "
      )[0];
      setIntervalDay(duration);
    }
  }, [from, to]);

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }

    const range = DateUtils.addDayToRange(day, statePicker);
    setStatePicker(range);
  };

  const handleResetClick = () => {
    setStatePicker({ from: undefined, to: undefined });
  };

  const onSubmit = async (data) => {
    const startFormat = from
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("/");
    const endFormat = to.toLocaleDateString().split("/").reverse().join("/");

    router.push({
      pathname: "/search",
      query: {
        start: startFormat,
        to: endFormat,
        voyageur: data.numbervoyageur,
        ville: data.ville,
      },
    });
    // await console.log(
    //   `https://arcane-spire-42874.herokuapp.com/api/properties/search?dateStart=${startFormat}&dateEnd=${endFormat}`
    // );
  };

  return (
    <Layout>
      <Box w="220px">
        <Popover mb="10px" max>
          <PopoverTrigger>
            <Button
              _hover={{
                background: "#FFF",
                color: "#C64D4D",
              }}
              color={["C64D4D", "#696969"]}
              w={["100%", "150px"]}
              border={["solid #FFF 1px", "solid #696969 1px"]}
              p={3}
              fontSize="18px"
              mb={["10px", "initial"]}
              bg={["#FFF", "initial"]}
              opacity="0.7"
            >
              Cliquez ici
            </Button>
          </PopoverTrigger>
          <PopoverContent maxWidth="280px" backgroundColor="#778899">
            <Center className="RangeExample">
              <div>
                <Text fontSize="20px" fontWeight="bold" p="10px">
                  {!from &&
                    !to &&
                    "Veuillez sélectionner votre jour d'arrivée."}
                  {from && !to && "Veuillez sélectionner votre jour de départ"}
                  {from &&
                    to &&
                    `Vous avez séléctionner du ${from.toLocaleDateString()} au
                  ${to.toLocaleDateString()}`}{" "}
                  {from && to && (
                    <Button
                      ml="30px"
                      colorScheme="red"
                      onClick={handleResetClick}
                    >
                      Reset
                    </Button>
                  )}
                </Text>
                <DayPicker
                  numberOfMonths={numberOfMonths}
                  selectedDays={[from, { from, to }]}
                  modifiers={modifiers}
                  onDayClick={handleDayClick}
                  disabledDays={[
                    ...getBetweenDate(new Date(Date.now())),
                    {
                      before: new Date(Date.now()),
                    },
                  ]}
                />
              </div>
            </Center>
            <PopoverArrow />
            <PopoverCloseButton />
          </PopoverContent>
        </Popover>

        <Box>
          <form onSubmit={handleSubmit(onSubmit)} height="100%">
            <Box
              display={["column", "flex"]}
              justifyContent="center"
              alignItems="center"
            >
              <Box w="220px">
                <FormLabel
                  fontSize={["18px", "18px"]}
                  fontWeight="bold"
                  color={["#FFF", "#000"]}
                >
                  Nombre de voyageur
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
                  name="numbervoyageur"
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
                  Ville
                </FormLabel>

                <Input
                  bg={["#FFF", "initial"]}
                  opacity="0.7"
                  _hover={{
                    background: "#FFF",
                    color: "#000",
                  }}
                  focusBorderColor="#C64D4D"
                  fontSize="18px"
                  w={["100%", "150px"]}
                  borderColor={["#FFF", "#696969"]}
                  errorBorderColor="#696969"
                  name="ville"
                  ref={register}
                  type="text"
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
        </Box>

        <Box margin="auto" maxW="1200px">
          <Text
            pt="10px"
            fontSize={["26px", "56px"]}
            ml={["75px", "80px"]}
            mb={["20px", "50px"]}
            fontWeight="bold"
            color={["#C64D4D", "#000"]}
          >
            Laissez vous guidez
          </Text>
          <Center>
            <SimpleGrid
              columns={[1, 2, 3]}
              spacing={5}
              marginBottom={["40px", "100px"]}
              // minChildWidth="100px"
              width="96%"
              placeItems="center"
              p={["5", "0"]}
            >
              <Grid
                position="relative"
                w="100%"
                templateRows={["1fr", "repeat(2, 1fr)"]}
              >
                <Image
                  style={{ objectFit: "cover" }}
                  height={350}
                  height="100%"
                  src="/couple.png"
                ></Image>
                <Box
                  position={["absolute", "relative"]}
                  backgroundColor={["#fff", "#C64D4D"]}
                  w={["100%"]}
                  height={["100%", "auto"]}
                  opacity={["0.6", "1"]}
                  border="solid black 2px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    fontSize="24px"
                    color={["#000", "#fff"]}
                    fontWeight="bold"
                  >
                    Evadez vous à deux
                  </Text>
                </Box>
              </Grid>
              <Grid
                position="relative"
                w="100%"
                templateRows={["1fr", "repeat(2, 1fr)"]}
              >
                <Box
                  position={["absolute", "relative"]}
                  opacity={["0.6", "1"]}
                  height={["100%", "auto"]}
                  backgroundColor={["#fff", "#C64D4D"]}
                  w={["100%", "100%"]}
                  border="solid black 2px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    fontSize="24px"
                    color={["#000", "#fff"]}
                    fontWeight="bold"
                  >
                    Préferez partir en groupe
                  </Text>
                </Box>
                <Image
                  style={{ objectFit: "cover" }}
                  height={350}
                  src="/famille.png"
                ></Image>
              </Grid>

              <Grid
                w="100%"
                templateRows={["1fr", "repeat(2, 1fr)"]}
                position="relative"
              >
                <Image
                  style={{ objectFit: "cover" }}
                  height={350}
                  src="carte.png"
                ></Image>
                <Box
                  position={["absolute", "relative"]}
                  opacity={["0.6", "1"]}
                  height={["100%", "auto"]}
                  backgroundColor={["#fff", "#C64D4D"]}
                  w={["100%", "100%"]}
                  border="solid black 2px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    fontSize="24px"
                    color={["#000", "#fff"]}
                    fontWeight="bold"
                  >
                    Proche de chez vous
                  </Text>
                </Box>
              </Grid>
            </SimpleGrid>
          </Center>

          <Text
            pt="10px"
            fontSize={["26px", "30px"]}
            pr={["0", "80px"]}
            mb="20px"
            fontWeight="bold"
            textAlign={["center", "initial"]}
            color={["#C64D4D", "#FFF"]}
          >
            Profitez pleinement de l'experience AtypikHouse
          </Text>

          <Box
          // height="800px"
          >
            <Flex
              mx="auto"
              pt={[10, 20]}
              pb={[10, 20]}
              justifyContent="space-around"
              alignItems="center"
              alignContent="center"
              flexDirection={["column", "initial"]}
            >
              <Image w={["200px", "initial"]} src="telnew.png" />
              <Box color="white" width={["100%", "700px"]} zIndex={100}>
                <Text
                  fontSize={["20px", "3xl"]}
                  fontWeight="bold"
                  color="#000000"
                  textAlign={["center", "initial"]}
                  mt={[5, 0]}
                >
                  Découvrez notre application mobile!
                </Text>
                <Text
                  fontSize={["20px", "3xl"]}
                  mt={10}
                  color="#000000"
                  textAlign={["center", "initial"]}
                >
                  Profitez pleinement de l’expérience AtypikHouse grâce à notre
                  application mobile: Des nouveautés, des surprises et de
                  nombreux avantages
                </Text>
                <Flex mt={10}></Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export const getStaticProps = async () => {
  //const { data: properties } = await api.get("/type_properties");

  return {
    props: {},
  };
};
