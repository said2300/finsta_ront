//React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { isError, useQuery } from "react-query";
import { Layout } from "@components/core/Layout";


import auth from "@context/axiosAuth";

import axios from "axios";

//Component
import SigneDeco from "../components/ui/SigneDeco";

//Services
import { getApropos } from "@services/apropos";

//Library
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  addDays,
  formatDistanceStrict,
  format,
  getTime,
  isSameDay,
} from "date-fns";

//Utils
import {
  locale,
  MONTHS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
} from "@root/utils/dateFr";
import { person } from "@root/utils/nbVoyageur";

//Context
import useAuth from "@auth/context";

//Styles
import { createBreakpoints } from "@chakra-ui/theme-tools";

import Link from "next/link";
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
  Spinner,
} from "@chakra-ui/react";

//Fonction qui permet de retourner le nombre de jours sélectionné entre 2 intervalles

const getBetweenDate = (startDate, stopDate, dayAvailabled = []) => {
  //StartDate: 1er jour sélectionné - stopDate: dernier jour sélectionné - dayAvailabled: nombre de jour disponible
  const arrayOfDayAvaibled = dayAvailabled.map((e) => new Date(e.jourDispo));
  //Déclare un array vide
  const dateArray = [];
  //getTime() renvoie la valeur numérique correspondant au temps pour la date renseignée
  let currentDate = getTime(startDate);
  //Tant que currentDate (égal à startDate) est ingérieur ou égal à stopDate la fonction continue
  while (currentDate <= getTime(stopDate)) {
    if (!arrayOfDayAvaibled.find((e) => isSameDay(e, currentDate))) {
      dateArray.push(new Date(currentDate));
    }
    //Ajoute les jours sélectionner
    currentDate = addDays(currentDate, 1);
  }
  //Retourner le tableau de date
  return dateArray;
};


const numberOfMonths = 1;

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const { register, handleSubmit, control } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
 
  //Styles calendrier
  const modifiersStyles = {
    selected: {
      color: "white",
      backgroundColor: "#67E767",
    },
    disabled: {
      color: "#7a7a7a",
    },
  };
  const breakpoints = createBreakpoints({
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  });

  //Texte à propos en bas de page
  const { isLoading, isError, refetch, data: apropos } = useQuery(
    ["apropos"],

    getApropos
  );

  //State pour jour de départ/jour d'arrivée
  const [intervalDay, setIntervalDay] = useState(0);
  const [statePicker, setStatePicker] = useState({
    from: undefined,
    to: undefined,
  });

  //Library doc state
  const { from, to } = statePicker;

  //Si les valeurs sont modifiés cette fonction permet d'écraser les jours
  const modifiers = { start: from, end: to };

  useEffect(() => {
    if (from && to) {
      const duration = formatDistanceStrict(from, to, { unit: "day" }).split(
        " "
      )[0];
      setIntervalDay(duration);
    }
  }, [from, to]);

  //Permet de sélectionner un jour d'arrivée puis un jour de départ
  const handleDayClick = (day, modifiers = {}) => {
    if (isSameDay(statePicker.from, day) || isSameDay(statePicker.to, day))
      return;

    if (modifiers.disabled) {
      return;
    }

    const range = DateUtils.addDayToRange(day, statePicker);
    setStatePicker(range);
  };

  //Fonction qui annule la séection des dates
  const handleResetClick = () => {
    setStatePicker({ from: undefined, to: undefined });
  };

  //Fonction qui permet d'effectuer la recherche
  const onSubmit = async (data) => {
    const startFormat = from
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-");
    const endFormat = to.toLocaleDateString().split("/").reverse().join("-");

    router.push({
      pathname: "/search",
      query: {
        start: startFormat,
        to: endFormat,
        voyageur: data.numbervoyageur,
        ville: data.ville,
      },
    });
  };
  const queries = router.query;
  const {data: bien } = useQuery(
    ["bien", queries],
 
      // La dependance de useEffect
      // Relance ce useEffect a chaque fois que isAuthenticated change
      // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
  
      () =>
        axios.get(
          `https://arcane-spire-42874.herokuapp.com/api/properties`
        ),
        {
            refetchOnWindowFocus: false,
            onSuccess: (bien) => console.log("gramos", bien),
            onError: (err) => {
              console.log({ err: err.response.data["hydra:description"] });
              alert(err.response.data["hydra:description"]);
            },
          }
     
          );
    if (isLoading) {
      return (
        <Layout h="100vh">
          <Box h="70vh" display="flex" justifyContent="center">
            <Center>
              <Spinner size="xl" />
            </Center>
          </Box>
        </Layout>
      );
    }
  
    if (isError) {
      return (
        <Layout h="100vh">Une erreur est survenu au chargements des users</Layout>
      );
    }
  return (
    <Layout>
     
     <Box
            
         
          >
            <Flex
              pt={["35px", "35px", "35px", "100px"]}
              justify="center"
              direction="column"
              align="center"
              justifyContent={["initial", "space-around"]}
           
            >
            

              <Box
                maxWidth={["1200px", "1200px", "1200px", "1200px", "1200px"]}
                w={["initial", "initial", "50%", "initial", "initial"]}
                bg={["none", "rgba(255,255,255,0.7)"]}
                borderRadius="20px"
                minHeight={["100px"]}
                display={["column", "column", "column", "flex"]}
                justifyContent={[
                  "space-around",
                  "space-around",
                  "space-around",
                  "center",
                  "center",
                ]}
                alignItems="center"
                pl={["0", "30px"]}
                pr={["0", "30px"]}
                mt={["20px", "0"]}
                h={["initial", "initial", "450px", "initial", "initial"]}
              >
                <Box
                  w={["220px", "220px", "100%", "220px", "220px"]}
                  ml={["0", "0", "0", "0", "20px"]}
                  h={["28%", "initial", "20%", "initial", "initial"]}
                >
                  <Text
                    mt={["initial", "initial", "50px", "initial", "initial"]}
                    fontSize={["18px", "18px"]}
                    fontWeight="bold"
                    color={["#FFF", "#000"]}
                    pl={["10px", "initial"]}
                    textShadow={["black 1px 2px 3px", "none"]}
                  >
                    Sélectionner vos dates
                  </Text>
                  {/* DayPicker Calendrier */}
                  <Popover onClose={onClose}>
                    <PopoverTrigger>
                      <Button
                        _hover={{
                          background: "#FFF",
                          color: "#C64D4D",
                        }}
                        w={["225px", "225px", "100%", "180px", "180px"]}
                        border={["solid #67E767 2px"]}
                        p={3}
                        fontSize="18px"
                        bg={["#FFF", "initial"]}
                        opacity="0.8"
                        color="#000"
                        mb={[
                          "initial",
                          "initial",
                          "10px",
                          "initial",
                          "initial",
                        ]}
                      >
                        <Img
                          src="/datecal.png"
                          w="20px"
                          mr="5px"
                          alt="Calendrier"
                        ></Img>
                        Cliquez ici
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      backgroundColor="#ffffff"
                      maxWidth="280px"
                      color="#000"
                    >
                      <Center className="RangeExample">
                        <Box>
                          <Text
                            fontSize={["16px", "20px"]}
                            fontWeight="bold"
                            p="10px"
                            textAlign={["center", "initial"]}
                          >
                            {!from &&
                              !to &&
                              "Veuillez sélectionner votre jour d'arrivée."}
                            {from &&
                              !to &&
                              "Veuillez sélectionner votre jour de départ"}
                            {from &&
                              to &&
                              `Vous avez séléctionner du ${from.toLocaleDateString()} au
                  ${to.toLocaleDateString()}`}{" "}
                          </Text>
                          {from && to && (
                            <Button
                              ml={["90px", "30px"]}
                              w={["100px", "initial"]}
                              bg="#C64D4D"
                              color="#FFF"
                              onClick={handleResetClick}
                            >
                              Effacer
                            </Button>
                          )}
                          <DayPicker
                            months={MONTHS}
                            weekdaysLong={WEEKDAYS_LONG}
                            weekdaysShort={WEEKDAYS_SHORT}
                            modifiersStyles={modifiersStyles}
                            numberOfMonths={numberOfMonths}
                            selectedDays={[from, { from, to }]}
                            modifiers={modifiers}
                            onDayClick={handleDayClick}
                            disabledDays={[
                              ...getBetweenDate(new Date(Date.now())),
                              {
                                before: new Date(Date.now()),
                              },
                              new Date(),
                            ]}
                          />
                        </Box>
                      </Center>
                      <PopoverArrow />
                      <PopoverCloseButton />
                    </PopoverContent>
                  </Popover>
                </Box>
                <Box>
                  <form onSubmit={handleSubmit(onSubmit)} height="100%">
                    <Box
                      display={["column", "column", "column", "flex"]}
                      justifyContent={[
                        "initial",
                        "initial",
                        "space-around",
                        "initial",
                        "center",
                      ]}
                      alignItems="center"
                    >
                      <Box
                        w={["225px", "225px", "100%", "180px", "180px"]}
                        mr={["0px", "0px", "0px", "40px", "40px"]}
                        mb={["20px", "20px", "14px", "0px", "initial"]}
                      >
                        <Text
                          fontSize={["18px", "18px"]}
                          fontWeight="bold"
                          color={["#FFF", "#000"]}
                          pl={["10px", "initial"]}
                          textShadow={["black 1px 2px 3px", "none"]}
                        >
                          Nombre de voyageur
                        </Text>
                        <Controller
                          as={
                            <Select
                              opacity="0.8"
                              bg={["#FFF", "initial"]}
                              _hover={{
                                background: "#FFF",
                                color: "#534b4f",
                              }}
                              borderColor={["#67E767 "]}
                              border={["solid  2px"]}
                              focusBorderColor="#C64D4D"
                              fontSize="18px"
                              ref={register({})}
                              placeholder="Sélectionner"
                            >
                              {person.map((e, i) => (
                                <option key={i} value={e.value}>
                                  {e.title}
                                </option>
                              ))}
                            </Select>
                          }
                          name="numbervoyageur"
                          rules={{ required: true }}
                          control={control}
                        />
                      </Box>
                      <Box
                        w={["initial", "initial", "100%", "220px", "220px"]}
                        mr={["0px", "0px", "0px", "18px"]}
                      >
                        <Text
                          fontSize={["18px", "18px"]}
                          fontWeight="bold"
                          color={["#FFF", "#000"]}
                          textShadow={["black 1px 2px 3px", "none"]}
                          pl={["10px", "initial"]}
                        >
                          Ville
                        </Text>

                        <Input
                          bg={["#FFF", "initial"]}
                          opacity="0.8"
                          _hover={{
                            background: "#FFF",
                            color: "#000",
                          }}
                          border={["solid #67E767 2px"]}
                          focusBorderColor="#C64D4D"
                          fontSize="18px"
                          w={["100%", "100%", "100%", "180px", "180px"]}
                          borderColor={["#67E767"]}
                          errorBorderColor="#696969"
                          name="ville"
                          ref={register}
                          type="text"
                        />
                      </Box>
                      <Box
                        w={["initial", "initial", "100%", "220px", "220px"]}
                        mr={["0px", "0px", "0px", "18px"]}
                      >
                      <Button
                       placeholder="Rechercher"
                       ml={["35px", "initial", "80px", "initial", "0"]}
                       mt={["35", "28px"]}
                       placeholder="Rechercher"
                       
                       cursor=" pointer"
                       _hover={{
                         background: "#C64D4D",
                         color: "#FFF",
                       }}
                       fontWeight="bold"
                       w={["160px", "150px"]}
                       color="#000"
                       h={["45px", "50px"]}
                       background="#67E767"
                       errorBorderColor="red.300"
                       focusBorderColor="#000"
                       type="submit"
                       fontSize="20px"
                       borderRadius="5px"
                       >
                     Recherche
                        </Button>
                        </Box>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Flex>
         </Box>          
         {/* Second section Laisser vous guidez... */}
          
            
              
     <Box minHeight="70vh">
        <Box
          h="80px"
          marginTop="10px"
          marginBottom="10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin={[10, 10, 10, 10, 10]}
        >
          <Heading as="h1" textAlign="center" margin={[0, 10, 10, 10, 20]}>
            Commencer votre recherche 
          </Heading>
        </Box>
        <SimpleGrid
          minChildWidth={["300px", "350px", "350px", "420px", "430px"]}
          gap={[10, 0, 10, 10, 10]}
          placeItems="center"
          maxWidth="1800px"
        >
          {bien?.data["hydra:member"].map((e, i) => {
            
            return (
              <Box
                w={["340px", "400px", "350px", "420px", "400px"]}
                key={i}
                maxW="500px"
                borderWidth="1px"
                bg="#F8F8FF"
                borderRadius="10px"
                h="540px"
                boxShadow=" rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
              >
                <Box display="flex" justifyContent="center">
                  <Img
                    borderRadius="5px"
                    w="98%"
                    mt="5px"
                    maxH="260px"
                    src={`${e.pictures[0].url}`}
                  ></Img>
                </Box>

                <Text
                  mt={2}
                  ml="10px"
                  fontSize="22px"
                  fontWeight="semibold"
                  lineHeight="short"
                  p={1}
                  mb="10px"
                >
                  {e.title}
                </Text>
                <Box display="flex" justifyContent="space-around" h="120px">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                  >
                    <Text
                      mt={2}
                      fontSize="xl"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {e.address.town}
                    </Text>
                    <Text
                      mt={2}
                      fontSize="xl"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {e.typeProperty.title}
                    </Text>
                    <Text
                      mt={2}
                      fontSize="xl"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      {e.rate} €/nuit
                    </Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-around"
                  >
                    <Box w="50px">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 480 480.648"
                      >
                        <rect width="100%" height="100%" fill="none" />
                        <g class="currentLayer">
                          <path
                            d="M404.77 349.012a89.264 89.264 0 0014.007-20.688H312.32l-32 32c31.239 31.239 93.207 19.93 124.45-11.312zm0 0"
                            fill="#04b804"
                          />
                          <path
                            d="M312.32 221.867a89.264 89.264 0 00-20.687 14.008c-31.242 31.242-42.512 93.25-11.313 124.45l32-32zm0 0M441.969 272.324c17.39-50.031 30.687-104.336 30.687-104.336L368.32 272.324zm0 0M368.32 272.324v-73.648a422.09 422.09 0 00-56 23.199v106.45zm0 0"
                            fill="#04b804"
                          />
                          <path
                            d="M472.656 169.238s-54.304 13.297-104.336 30.688v73.648zm0 0M311.07 329.574h106.457a422.09 422.09 0 0023.2-56H367.07zm0 0M112.32 272.324L7.984 167.988s13.297 54.305 30.688 104.336zm0 0M200.32 360.324c31.239-31.238 19.93-93.207-11.312-124.449a89.264 89.264 0 00-20.688-14.008v106.457zm0 0M112.32 272.324H38.672a422.09 422.09 0 0023.2 56H168.32zm0 0"
                            fill="#04b804"
                          />
                          <path
                            d="M61.863 328.324a89.264 89.264 0 0014.008 20.688c31.242 31.242 93.25 42.55 124.45 11.312l-32-32zm0 0M168.32 328.324V221.867a421.567 421.567 0 00-56-23.199v73.656zm0 0M112.32 198.676C62.29 181.286 7.984 167.988 7.984 167.988L112.32 272.324zm0 0"
                            fill="#04b804"
                          />
                          <g fill="#67e767">
                            <path d="M479.398 170.441a7.865 7.865 0 00-.52-2.648 5.463 5.463 0 00-.257-.602 7.775 7.775 0 00-1.598-2.359 8.155 8.155 0 00-2.402-1.602l-.582-.246a8.082 8.082 0 00-2.68-.52h-.152a8.244 8.244 0 00-1.777.208c-3.672.894-56.215 13.855-105.29 31-.124.047-.253.082-.382.137a439.687 439.687 0 00-55.617 23.062 9.213 9.213 0 00-.758.387 97.266 97.266 0 00-22.738 15.414c-32.153 32.152-44.887 93.488-16.575 129.71l-11.304 11.305a88.072 88.072 0 00-17.696 25.739 88.088 88.088 0 00-17.777-25.692l-11.305-11.3c28.313-36.227 15.578-97.563-16.574-129.715a97.047 97.047 0 00-22.727-15.407 7.97 7.97 0 00-.8-.39 438.659 438.659 0 00-55.617-23.067c-.13-.054-.254-.085-.391-.136-49.031-17.145-101.578-30.094-105.207-31a7.955 7.955 0 00-1.77-.2h-.16a8 8 0 00-3.258.77 8.05 8.05 0 00-2.398 1.598 7.8 7.8 0 00-1.559 2.36 5.804 5.804 0 00-.257.6 7.884 7.884 0 00-.52 2.65v.237a7.66 7.66 0 00.184 1.715c.906 3.672 13.863 56.23 31.007 105.305.047.11.075.23.13.344a438.342 438.342 0 0023.077 55.656c.106.234.223.465.356.687a97.138 97.138 0 0015.43 22.782 117.402 117.402 0 0080.113 32.242 79.743 79.743 0 0049.664-15.688l11.27 11.27a71.564 71.564 0 0121.09 50.914v38.863a8 8 0 0016 0v-38.863a71.56 71.56 0 0121.085-50.914l11.274-11.27a79.743 79.743 0 0049.664 15.688 117.481 117.481 0 0080.09-32.297 97.32 97.32 0 0015.43-22.785c.128-.223.25-.45.35-.688a438.671 438.671 0 0023.083-55.672c.055-.12.078-.238.129-.359 17.14-49.062 30.101-101.602 31.008-105.297a8.136 8.136 0 00.183-1.71c.008-.055.031-.137.031-.216zm-280.8 180.582l-23.528-23.511v-89.063a51.898 51.898 0 017.032 5.598c26.265 26.258 37.863 77.32 16.48 106.976zM48.812 282.824h58.946l40 40H65.52a404.906 404.906 0 01-16.708-40zM33.238 185.68c20.574 5.64 45.742 13.062 69.832 21.265v48.567zm58.52 81.144H43.19c-8.203-24.09-15.632-49.258-21.265-69.832zm27.312 4.688v-58.946a404.906 404.906 0 0140 16.707v82.239zm-38.8 74.343a53.014 53.014 0 01-5.598-7.03h89.086l23.512 23.51c-29.649 21.392-80.727 9.794-107-16.48zm354.687-79.03h-48.574l69.832-69.833c-5.633 20.574-13.059 45.742-21.258 69.832zm-22.336 56h-82.238l40-40h58.941a400.377 400.377 0 01-16.703 40zm-53.55-51.313l-40 40v-82.239a404.513 404.513 0 0140-16.707zm16-64.567c24.085-8.203 49.253-15.625 69.831-21.265l-69.832 69.832zm-79.032 37.086a51.596 51.596 0 017.031-5.597v89.078l-23.511 23.511c-21.383-29.656-9.786-80.718 16.48-106.992zm-5.168 118.305l23.512-23.512h89.07a53.333 53.333 0 01-5.598 7.031c-26.265 26.266-77.32 37.88-106.984 16.48zm0 0M167.07 130.824h-48a8 8 0 01-8-8v-40h40a8 8 0 000-16h-40v-40a8 8 0 018-8h48a8 8 0 000-16h-48c-13.254 0-24 10.746-24 24v96c0 13.254 10.746 24 24 24h48a8 8 0 000-16zm0 0M367.07 146.824h-32c-17.672 0-32-14.328-32-32v-80c0-17.672 14.328-32 32-32h32c17.672 0 32 14.328 32 32v80c0 17.672-14.328 32-32 32zm-32-128c-8.836 0-16 7.164-16 16v80c0 8.836 7.164 16 16 16h32c8.836 0 16-7.164 16-16v-80c0-8.836-7.164-16-16-16zm0 0M255.07 146.824h-32c-17.672 0-32-14.328-32-32v-80c0-17.672 14.328-32 32-32h32c17.672 0 32 14.328 32 32a8 8 0 01-16 0c0-8.836-7.164-16-16-16h-32c-8.836 0-16 7.164-16 16v80c0 8.836 7.164 16 16 16h32c8.836 0 16-7.164 16-16a8 8 0 0116 0c0 17.672-14.328 32-32 32zm0 0" />
                          </g>
                        </g>
                      </svg>
                    </Box>
                    {e?.accessHandicap === true ? (
                      <Box w="50px">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 512 512"
                        >
                          <rect width="100%" height="100%" fill="none" />
                          <g class="currentLayer">
                            <g class="selected" fill="#67e767">
                              <path d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm90.71 402.27c-22.93 26.1-55.99 41.07-90.71 41.07-66.56 0-120.71-54.15-120.71-120.7 0-35.87 15.8-69.64 43.34-92.66 6.35-5.31 15.82-4.47 21.13 1.89 5.318 6.369 4.449 15.847-1.89 21.13-20.7 17.3-32.58 42.69-32.58 69.64 0 50.01 40.69 90.7 90.71 90.7 26.09 0 50.94-11.25 68.17-30.87 5.743-6.407 15.132-6.665 21.17-1.36 6.22 5.46 6.84 14.94 1.37 21.16zm77.46-10.11h-21.42c-5.36 0-10.31-2.85-12.99-7.49l-36.71-63.52H256c-8.28 0-15-6.72-15-15V167.12c-27.87-6.76-48.62-31.92-48.62-61.83 0-35.08 28.54-63.62 63.62-63.62s63.62 28.54 63.62 63.62c0 29.774-20.597 54.994-48.62 61.812v34.828h76.23c8.28 0 15 6.71 15 15 0 8.28-6.72 15-15 15H271v59.22h90.71c5.35 0 10.3 2.86 12.98 7.5l36.71 63.51h12.77c8.28 0 15 6.72 15 15 0 8.29-6.72 15-15 15z" />
                              <circle
                                cx="256"
                                cy="105.29"
                                transform="rotate(-22.48 255.861 105.095)"
                                r="33.62"
                              />
                            </g>
                          </g>
                        </svg>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
                <Link href={`/bien/${e["@id"].split("/")[3]}`} passHref>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                    mt="20px"
                  >
                    <Button
                      _hover={{
                        background: "#67E767",
                      }}
                      mt={2}
                      bg="#67E767"
                      color="#000"
                      fontSize="18px"
                      boxShadow="lg"
                      fontWeight="800"
                      w="210px"
                      h="50px"
                      boxShadow="  rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
                    >
                      Voir l'annonce
                    </Button>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </SimpleGrid>
        </Box>
    </Layout>
  );
}
