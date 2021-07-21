//React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { isError, useQuery } from "react-query";

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
import { Layout } from "@components/core/Layout";
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
  Container,
  Illustration,
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

  return (
    <Layout>
     
       
          {/* First section */}
          <Box
            backgroundImage={[
              "url('couverture.jpg')",
            ]}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            bgSize="cover"
            mb="20px"
            height={["500px", "700px"]}
          >
            <Flex
              pt={["35px", "35px", "35px", "100px"]}
              justify="center"
              direction="column"
              align="center"
              justifyContent={["initial", "space-around"]}
              height={["530px", "530px", "730px", "600px"]}
            >
              <Heading
                color={["#FFF", "#FFF"]}
                pr={["0", "0", "0", "100px"]}
                fontSize={["26px", "26px", "40px", "56px", "56px"]}
                fontWeight="bold"
                textShadow="black 1px 1px 2px"
                textAlign={["center", "initial"]}
              >
                Partir à la découverte de l'Atypik !
              </Heading>

              <Box
                maxWidth={["1200px", "1200px", "1200px", "1200px", "1200px"]}
                w={["initial", "initial", "50%", "initial", "initial"]}
                bg={["none", "rgba(180, 180, 180,0.85)"]}
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
                    Sélectionnez vos dates
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
                              placeholder="Sélectionnez"
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
          <Box >
            <Text
              textAlign={["center", "center"]}
              pt={["10px", "40px"]}
              fontSize={["22px", "22px", "25px", "30px", "30px"]}
              ml={["0", "100px"]}
              fontWeight="bold"
              color={["#000", "#000"]}
              letterSpacing="1px"
              mb="10px"
            >
              Laissez-vous tenter...
            </Text>
            <Box
            br="10px"
            mb={["0", "0"]}
           >



            <Box display="flex" alignItems="center" mb={["0", "20px"]}>
              <SigneDeco />
              <Heading
                letterSpacing="1px"
                fontSize={["15px", "20px"]}
                ml="5px"
                fontWeight="500"
                color="#C64D4D"
              >
                Les meilleures sélections juste pour vous
              </Heading>
             </Box >
             <Center>
             <Box
             placeItems="center"
             alignItems="center"
             textAlign= "center"
             marginBottom={["40px", "100px"]}
             >
              <SimpleGrid
                columns={[1, 2, 3]}
                spacing={5}
               
               // minChildWidth="100px"
                width={["60%", "96%"]}
                placeItems="center"
                p={["5", "0"]}
                margin="auto" 
                alignItems="center"
                textAlign= "center"
              >
               	   <Link href="/recherche-duo">
                  <Grid
                    cursor="pointer"
                    position="relative"
                    w="100%"
                  >
                      <Image
                      transform="scale(1.0)"
                      transition=" transform 0.8s"
                      style={{ objectFit: "cover" }}
                      height={[150, 150, 250, 350, 350]}  
                      src="/couple.webp"
                      alt="Couple"
                      _hover={{
                        transform: 'scale(1.1)',
                      }}
                    />
                   
                    <Box  
                      position={[ "relative"]}
                      w={["100%"]}
                      height={["100%", "auto"]}
                      
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      textAlign= "center"
                      justifyContent="center"
                      >
                        
                      <Button
                              fontSize={[
                                    "initial",
                                    "initial",
                                    "initial",
                                    "24px",
                                    "24px",
                                  ]}
                              display="flex"
                              cursor="pointer"
                              color={["blak"]}
                              fontWeight="bold"
                              letterSpacing="1px"
                              variant={'link'}
                              href={'/recherche-duo'}
                              marginTop="20px"
                           >
                              S'évader deux
                      </Button>
                    </Box>                          
                  </Grid>
                </Link>
                <Link href="/recherche-groupe">
                  <Grid
                    cursor="pointer"
                    position="relative"
                    w="100%"
                  >
                      <Image
                      transform="scale(1.0)"
                      transition=" transform 0.8s"
                      style={{ objectFit: "cover" }}
                      height={[150, 150, 250, 350, 350]}  
                      src="/groupe.webp"
                      alt="Famille"
                      _hover={{
                        transform: 'scale(1.1)',
                      }}
                    />
                   
                    <Box  
                      position={[ "relative"]}
                      w={["100%"]}
                      height={["100%", "auto"]}
                      
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      textAlign= "center"
                      justifyContent="center"
                      >
                        
                      <Button
                              fontSize={[
                                    "initial",
                                    "initial",
                                    "initial",
                                    "24px",
                                    "24px",
                                  ]}
                              display="flex"
                              cursor="pointer"
                              color={["blak"]}
                              fontWeight="bold"
                              letterSpacing="1px"
                              variant={'link'}
                              href={'/recherche-duo'}
                              marginTop="20px"
                           >
                            Partir en groupe
                      </Button>
                    </Box>                          
                  </Grid>
                </Link>
                <Link href="/recherche-solo">
                  <Grid
                    cursor="pointer"
                    position="relative"
                    w="100%"
                  >
                      <Image
                      transform="scale(1.0)"
                      transition=" transform 0.8s"
                      style={{ objectFit: "cover" }}
                      height={[150, 150, 250, 350, 350]}  
		                  src="solo.webp"
                      alt="Seul"
                      _hover={{
                        transform: 'scale(1.1)',
                      }}
                    />
                   
                    <Box  
                      position={[ "relative"]}
                      w={["100%"]}
                      height={["100%", "auto"]}
                      
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      textAlign= "center"
                      justifyContent="center"
                      >
                        
                      <Button
                              fontSize={[
                                    "initial",
                                    "initial",
                                    "initial",
                                    "24px",
                                    "24px",
                                  ]}
                              display="flex"
                              cursor="pointer"
                              color={["blak"]}
                              fontWeight="bold"
                              letterSpacing="1px"
                              variant={'link'}
                              href={'/recherche-solo'}
                              marginTop="20px"
                           >
                             Escapade en solo
                      </Button>
                    </Box>                          
                  </Grid>
                </Link>
                  
                    </SimpleGrid>
                    <Link href="/categories">
                      <Button
                        rounded={'full'}
                        size={'lg'}
                        fontWeight={'normal'}
                        px={6}
                        marginTop={["0", "100px"]}
                       
                        alignItems="center"
                        textAlign= "center"
                        marginTop={["0", "50px"]}
                        alignItems="center"
                        colorScheme={'red'}
                        bg={'green.400'}
                        _hover={{ bg: 'red.500' }}>
                            Découverez les diffrentes catégories
                      </Button>
                    </Link>
                    </Box>
                  </Center>
              </Box>
              
            <Center>
            <Box >
            <Box
             background="#F8F8FF"
             br="10px"
             mb={["10", "20px"]}
            
             backgroundImage={[
              "url('backgroundRegions.webp')",
            ]}
            
            opacity=" 1"
            boxShadow=" rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            bgSize="cover"
            textColor="white"
            _hover={{ bg: 'black.500' }}
             >
                
            
              <Box display="flex" alignItems="center" mb={["0px", "20px"]}>
                <SigneDeco />
                <Heading
                  letterSpacing="1px"
                  fontSize={["16px", "20px"]}
                  ml="5px"
                  fontWeight="500"
                  color="white"
                >
                  À faire aux alentours de 
                </Heading>
              </Box>
              <Center>
              <Box
                placeItems="center"
                alignItems="center"
                textAlign= "center"
                marginBottom={["40px", "100px"]}
                >
                <SimpleGrid
                columns={[1, 2, 3]}
                spacing={5}
              
                // minChildWidth="100px"
                width={["60%", "96%"]}
                placeItems="center"
                p={["5", "0"]}
                margin="auto" 
                alignItems="center"
                textAlign= "center"
              >
                <Link href="/recherche-paris">
                <Grid
                  cursor="pointer"
                  position="relative"
                 
                >
                    <Image
                    transform="scale(1.0)"
                    transition=" transform 0.8s"
                    style={{ objectFit: "cover" }}
                    height={[150, 150, 250, 350, 350]}  
                    src="/paris.webp"
                    alt="paris"
                    webkitTransition=" all 0.5s ease"
                    transition=" all 0.5s ease"
                    _hover={{
                      transform: 'scale(1.1)',
                      outline: "#8ae98a solid 8px",
                    }}
                  />
                
                  <Box  
                    position={[ "relative"]}
                    w={["100%"]}
                    height={["100%", "auto"]}
                    
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign= "center"
                    justifyContent="center"
                    >
                      
                    <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "24px",
                                  "24px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-duo'}
                            marginTop="20px"
                        >
                             Paris 
                    </Button>
                  </Box>                          
                </Grid>
                </Link>
                <Link href="/recherche-lyon">
                <Grid
                  cursor="pointer"
                  position="relative"
                  
                >
                    <Image
                    transform="scale(1.0)"
                    transition=" transform 0.8s"
                    style={{ objectFit: "cover" }}
                    height={[150, 150, 250, 350, 350]}  
                    src="/lyon.webp"
                    alt="lyon"
                    

                    _hover={{
                      transform: 'scale(1.1)',
                      outline: "#8ae98a solid 8px",
                    }}
                  />
                
                  <Box  
                    position={[ "relative"]}
                    w={["100%"]}
                    height={["100%", "auto"]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign= "center"
                    justifyContent="center"
                    >
                      
                    <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "24px",
                                  "24px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-duo'}
                            marginTop="20px"
                        >
                           Lyon
                    </Button>
                  </Box>                          
                </Grid>
                </Link>
                
                <Grid
                  cursor="pointer"
                  position="relative"
                
                >
                  <Link href="/recherche-montpellier">
                    <Image
                    transform="scale(1.0)"
                    transition=" transform 0.8s"
                    style={{ objectFit: "cover" }}
                    height={[150, 150, 250, 350, 350]}  
                    src="montpellier.webp"
                    alt="montpellier"
                    _hover={{
                      transform: 'scale(1.1)',
                      outline: "#8ae98a solid 8px",
                    }}
                  />
                </Link>
                  <Box  
                    position={[ "relative"]}
                    w={["100%"]}
                    height={["100%", "auto"]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign= "center"
                    justifyContent="center"
                    >
                      <Link href="/recherche-duo">
                    <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "24px",
                                  "24px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-duo'}
                            marginTop="20px"
                        >
                             Montpellier 
                    </Button>
                    </Link>
                  </Box>   
                                         
                </Grid>

                <Grid>
                  <Link   href={'/recherche-toulouse'}>
                <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "24px",
                                  "15px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-toulouse'}
                            marginTop="20px"
                            mr="20px"
                        >
                            Toulouse 
                    </Button>
                    </Link>
                    <Link href={'/recherche-nantes'}>
                    <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "15px",
                                  "15px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-duo'}
                            marginTop="20px"
                            mr="20px"

                        >
                            Nantes
                    </Button>
                    </Link>
                  </Grid>
                  <Grid >
                  <Link  href={'/recherche-toulon'}>
                  <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "15px",
                                  "15px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-toulon'}
                            marginTop="40px"
                            mr="20px"

                        >
                            Toulon
                    </Button>
                    </Link>
                    <Link href={'/recherche-Haute-Savoie '}>
                    <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "15px",
                                  "15px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-haute-savoie'}
                            marginTop="20px"
                            mr="20px"
                            >
                            Annecy
                    </Button>
                    </Link>
               
                 </Grid>
                 <Grid>
                <Link  href={'/recherche-mareseille'}>
                <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "24px",
                                  "15px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-duo'}
                            marginTop="20px"
                            mr="20px"
                        >
                           Mareseille
                    </Button>
                    </Link>
                    <Link href={'/recherche-mayenne'} >
                    <Button
                            fontSize={[
                                  "initial",
                                  "initial",
                                  "initial",
                                  "15px",
                                  "15px",
                                ]}
                            display="flex"
                            cursor="pointer"
                            color={["blak"]}
                            fontWeight="bold"
                            letterSpacing="1px"
                            variant={'link'}
                            href={'/recherche-mayenne'}
                            marginTop="20px"
                            mr="20px"

                        >
                           Mayenne
                    </Button>
                    </Link>
                  </Grid>
              
                 </SimpleGrid>
                 <Link href="/commencer">
                    <Button
                     rounded={'full'}
                     size={'lg'}
                     fontWeight={'normal'}
                     px={6}
                     marginTop={["0", "100px"]}
                    
                     alignItems="center"
                     textAlign= "center"
                     marginTop={["0", "50px"]}
                     alignItems="center"
                     colorScheme={'red'}
                     bg={'green.400'}
                     _hover={{ bg: 'red.500' }}
                        >
                          Autres destinations 
                    </Button>
                 </Link>
               </Box>
              </Center>
              </Box>
              </Box>
            </Center>
            
            {/* Section application mobile  */}
              {/* Dernière section */}
              <Box>
              <Text
                textAlign={["center", "initial"]}
                pt="10px"
                fontSize={["22px", "22px", "25px", "30px", "30px"]}
                ml={["0", "80px"]}
                mb={["5px", "0px"]}
                fontWeight="bold"
                color={["#000", "#000"]}
                letterSpacing="1px"
              >
                Choisir AtypikHouse pour une expérience unique
              </Text>
              <Box
                display="flex"
                alignItems="center"
                mb={["5px", "5px", "5px", "10px", "30px"]}
              >
                <SigneDeco />
                <Heading
                  letterSpacing="1px"
                  fontSize={["15px", "20px"]}
                  ml="5px"
                  fontWeight="500"
                  color="#C64D4D"
                >
                  Une équipe dédiés 24h/24 rien que pour vous
                </Heading>
              </Box>
          
            <Box
              justifyContent="center"
              alignItems="center"
              display="flex"
              flexDirection="column"
              mb={["50px", "50px", "40px", "100px", "100px"]}
            >
              <Box
                textAlign="center"
                w={["75%", "65%"]}
                fontSize="20px"
                minHeight="150px"
                mb={["30px", "30px", "30px", "30px", "initial"]}
              >
                <Text fontSize={["16px", "20px", "20px", "24px", "20px"] }>
                AtypikHouse vous en dit plus, nous sommes situé dans le nord de la France à côté du chateau de Pierre-Fond. 
                Nous avons un réel objectif de faire mieux consommer les personnes qui ont l'habitude de réserver. <br/>
                <Link
                  letterSpacing="1px"
                  fontSize={["15px", "20px"]}
                  ml="5px"
                  fontWeight="500"
                  color="#C64D4D"
                  href='/apropos/qui-sommes-nous' 
                >
                   <Text as="u"  cursor=" pointer" color="#C64D4D" >en savoir plus</Text>
                
                </Link>
              
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-around"
                w={["90%", "90%", "90%", "50%", "50%"]}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    w={["80px", "120px"]}
                    border="solid #41e841 2px"
                    p={5}
                    borderRadius="50%"
                    backgroundColor="#F8F8FF"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 512 512"
                    >
                      <rect width="100%" height="100%" fill="none" />
                      <g class="currentLayer">
                        <path
                          d="M224 159.992v-32H32c-17.632 0-32 14.368-32 32v64h230.752c-4.448-19.552-6.752-40.608-6.752-64zM510.688 287.992c-21.824 33.632-55.104 62.24-102.784 89.632-7.328 4.192-15.584 6.368-23.904 6.368s-16.576-2.176-23.808-6.304c-47.68-27.456-80.96-56.096-102.816-89.696H0v160c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32v-160h-1.312zm-366.688 96H80c-8.832 0-16-7.168-16-16s7.168-16 16-16h64c8.832 0 16 7.168 16 16s-7.168 16-16 16z"
                          fill="#41e841"
                        />
                        <path
                          d="M502.304 81.304l-112-48a16.058 16.058 0 00-12.64 0l-112 48C259.808 83.8 256 89.592 256 95.992v64c0 88.032 32.544 139.488 120.032 189.888 2.464 1.408 5.216 2.112 7.968 2.112s5.504-.704 7.968-2.112C479.456 299.608 512 248.152 512 159.992v-64c0-6.4-3.808-12.192-9.696-14.688zm-57.792 72.704l-64 80c-3.072 3.776-7.68 5.984-12.512 5.984h-.672a16.058 16.058 0 01-12.64-7.104l-32-48c-4.896-7.36-2.912-17.28 4.448-22.176 7.296-4.864 17.248-2.944 22.176 4.448l19.872 29.792 50.304-62.912c5.536-6.88 15.616-7.968 22.496-2.496 6.912 5.472 8 15.552 2.528 22.464z"
                          fill="#41e841"
                        />
                      </g>
                    </svg>
                  </Box>
                  <Text
                    mt="10px"
                    fontWeight="bold"
                    textAlign={["center", "center"]}
                    fontSize={["15px", "initial"]}
                  >
                    Paiement 100% sécurisé
                  </Text>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    w={["80px", "120px"]}
                    border="solid #41e841 2px"
                    p={5}
                    borderRadius="50%"
                    backgroundColor="#F8F8FF"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 512 512"
                    >
                      <rect width="100%" height="100%" fill="none" />
                      <g class="currentLayer">
                        <g fill="#41e841">
                          <path d="M460.747 439.163c75.489-87.071 66.225-218.376-18.944-294.583C485.549 297.874 369.873 451 210.5 451c-3.068 0 15.448.108-57.484-.342C192.905 490.361 246.033 512 301.496 512l195.561-1c13.333-.064 19.975-16.29 10.464-25.677z" />
                          <path d="M210.5 421c116.064 0 210.489-94.43 210.489-210.5S326.565 0 210.5 0 .012 94.43.012 210.5c0 51.099 18.088 99.427 51.237 137.663l-46.774 46.16C-5.005 403.68 1.562 419.935 14.94 420l195.56 1zm-89.495-285h179.99c8.284 0 14.999 6.716 14.999 15s-6.715 15-14.999 15h-179.99c-8.284 0-14.999-6.716-14.999-15s6.716-15 14.999-15zm0 60h179.99c8.284 0 14.999 6.716 14.999 15s-6.715 15-14.999 15h-179.99c-8.284 0-14.999-6.716-14.999-15s6.716-15 14.999-15zm-14.999 75c0-8.284 6.715-15 14.999-15h179.99c8.284 0 14.999 6.716 14.999 15s-6.715 15-14.999 15h-179.99c-8.283 0-14.999-6.716-14.999-15z" />
                        </g>
                      </g>
                    </svg>
                  </Box>
                  <Text
                    mt="10px"
                    fontWeight="bold"
                    textAlign={["center", "center"]}
                    fontSize={["15px", "initial"]}
                  >
                    Des avis pour vous guider
                  </Text>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    w={["80px", "120px"]}
                    border="solid #41e841 2px"
                    backgroundColor="#F8F8FF"
                    p={5}
                    borderRadius="50%"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 512 512"
                    >
                      <rect width="100%" height="100%" fill="none" />
                      <g class="currentLayer">
                        <path
                          d="M149.047 157.832L269.555 278.34c2.734-29.672 8.316-138.254-48.828-195.399-19.407-19.406-45.07-31.863-71.68-39.785zm0 0M.832 52.04c-1.41 21.28-3.437 84.69 16.602 140h123.398zm0 0M119.047 127.836v-91.79c-41.879-7.655-81.14-6.269-97.004-5.218zm0 0M170.828 222.04H31.238c6.043 10.464 13.203 20.179 21.707 28.683 42.735 42.734 114.227 50.39 159.98 50.39 15.434 0 27.93-.875 35.419-1.562zm0 0M485.04 119.047c7.655-41.879 6.265-81.14 5.218-97.004l-97.008 97.004zm0 0M329.047 140.832l140-140c-21.281-1.41-84.692-3.437-140 16.602zm0 0M363.254 149.047l-63.242 63.242c1.699 23.406 1.129 44.078.23 58.215 44.422-2.469 101.559-13.438 137.899-49.777 19.406-19.407 31.867-45.07 39.789-71.68zm0 0M295.332 174.547l3.715-3.715V31.238c-10.465 6.04-20.18 13.203-28.688 21.707-6.515 6.516-12.199 13.707-17.18 21.364 12.817 15.953 23.2 35.078 30.946 57.086 4.691 13.332 8.438 27.773 11.207 43.152zm0 0M71.813 407.66h37.996c6.5 0 10.25 6.25 10.25 13 0 5.75-3.25 12.5-10.25 12.5H71.813v50.242h70.742c6.5 0 10.25 6.75 10.25 14.5 0 6.75-3.25 14-10.25 14H53.562c-7.246 0-14.246-3.5-14.246-10.25V339.418c0-6.75 7-10.25 14.246-10.25h88.993c7 0 10.25 7.25 10.25 14 0 7.746-3.75 14.496-10.25 14.496H71.812zm0 0M241.297 356.266c-16.75 0-26.246 9.246-26.246 28.746v69.742c0 19.5 9.496 28.75 26.746 28.75 22.746 0 24.746-16.25 25.496-26.75.5-7.746 7.5-10.246 16-10.246 11.25 0 16.5 3.25 16.5 15.996 0 30.25-24.75 49.496-59.746 49.496-31.496 0-57.496-15.5-57.496-57.246v-69.742c0-41.746 26.25-57.246 57.746-57.246 34.746 0 59.496 18.5 59.496 47.496 0 13-5.25 16-16.25 16-9.25 0-16-2.75-16.25-10.25-.5-7.75-2.25-24.746-25.996-24.746zm0 0M332.285 454.754v-69.742c0-41.746 25.5-57.246 58.496-57.246s58.742 15.5 58.742 57.246v69.742c0 41.746-25.746 57.246-58.742 57.246s-58.496-15.5-58.496-57.246zm84.742-69.742c0-19.75-10-28.746-26.246-28.746-16.5 0-26 8.996-26 28.746v69.742c0 19.75 9.5 28.75 26 28.75 16.246 0 26.246-9 26.246-28.75zm0 0"
                          fill="#41e841"
                        />
                      </g>
                    </svg>
                  </Box>
                  <Text
                    mt="10px"
                    fontWeight="bold"
                    textAlign={["center", "center"]}
                    fontSize={["15px", "initial"]}
                  >
                    Labelisé Acteur SilverEco
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
                {/* 4 section */}
                <Box 
                 boxShadow=" rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) , rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;"
                 backgroundImage="url('partner.webp')"
                 bgSize="cover"
                 >
              <Box
               >
             
              <Box display="flex" alignItems="center" mb={["5px", "20px"]}>
                <SigneDeco />
                <Heading
                  letterSpacing="1px"
                  fontSize={["16px", "20px"]}
                  ml="5px"
                  fontWeight="500"
                  color={'white'}
                >
                  Devenir hôte 
                </Heading>
              </Box>
              <Box
                br="10px"
                mb={["0", "100px"]}
                
              >
                <Flex
                  mx="auto"
                  pt={[0, 5]}
                  pb={[10, 20]}
                  justifyContent="center"
                  alignItems="center"
                  alignContent="center"
                  flexDirection={["column", "initial"]}
                  color={'white'}
                >
                 <Center>
                  <Container maxW={'5xl'} justifyContent="center">
                    <Stack
                      alignItems="center"
                      textAlign={'center'}
                      align={'center'}
                      spacing={{ base: 8, md: 10 }}
                      py={{ base: 20, md: 28 }}>
                      <Heading
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Vous etês{' '}
                        <Text as={'span'} color={'#C64D4D'}>
                          proprietaire ?
                        </Text>
                      </Heading>
                      <Text fontSize="30px" maxW={'3xl'}
                        Color="white">
                       Vous êtes Propriétaire d'un bien Atypik et vous souhaitez le mettre en location ? N'attendez plus pour l'inscrire sur AtypikHouse
                      </Text>
                      <Stack spacing={6} direction={'row'}>
                      <Link href="/inscription/hebergeur">
                        <Button
                          rounded={'full'}
                          px={6}
                          colorScheme={'orange'}
                          bg={'green.500'}
                          _hover={{ bg: 'red.400' }}>
                          Devenir partenaire
                        </Button>
                        </Link>
                      </Stack>
                      <Flex w={'full'}>
                      </Flex>
                    </Stack>
                  </Container>
                  </Center>
                </Flex>
               </Box>
              </Box>
              </Box>
              
          <Box display="flex" alignItems="center" >
              </Box>
              <Box
               alignItems="center"
                maxWidth={["400px", "1400px"]}
                position="relative"
                ml={["0", "0", "0", "0", "0","220px"]}
                background="#F8F8FF"
                br="10px"
                mb={["0", "100px"]}               
                boxShadow={[
                  "initial",
                  " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                ]}
              >
                <Flex
                  mx="auto"
                  pt={[0, 5]}
                  pb={[10, 20]}
                  justifyContent="center"
                  alignItems="center"
                  alignContent="center"
                  flexDirection={["column", "initial"]}
                >
                  <Image
                    w={["100px", "150px", "200px", "250px", "300px"]}
                    src="tel-at.png"
                    alt="Téléphone"
                  />
                  <Box
                    color="white"
                    width={["90%", "500px"]}
                    zIndex={100}
                    ml={["0", "0", "0", "0", "50px"]}
                    mr={["initial", "initial", "10px", "30px", "initial"]}
                  >
                     <Text
                textAlign={["center", "initial"]}
                pt="10px"
                fontSize={["22px", "22px", "25px", "30px", "30px"]}
               
                
                
                fontWeight="bold"
                color={["#000", "#000"]}
                letterSpacing="1px"
              >
                Découvrez notre application mobile
              </Text>
                    
                    <Text
                      fontSize={["15px", "initial", "20px", "22px", "22px"]}
                      mt={[2, 10]}
                      color="#000000"
                      textAlign={["center", "initial"]}
                    >
                      Profitez pleinement de l’expérience AtypikHouse grâce à
                      notre application mobile: Des nouveautés, des surprises et
                      de nombreux avantages
                    </Text>
                    <Text
                      fontSize={["15px", "22px"]}
                      mt={[2, 10]}
                      color="#000000"
                      textAlign={["center", "initial"]}
                      display={["none", "block"]}
                    >
                      Pour la télécharger c'est très simple, rendez vous sur
                      votre smartphone, aller directement sur atypikhouse.com
                      cliquez sur ajouter sur l'écran d'accueil et félicitation!
                    </Text>
                  </Box>
                </Flex>
              
              </Box>
              
          </Box>
                      
    </Layout>
  );
}
