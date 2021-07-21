import React, { useEffect } from "react";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, localeFr } from "@mobiscroll/react";
import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@auth/context";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "@components/core/Layout";
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Grid,
  Center,
  Heading,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalOverlay,
  Form,
  Select,
  Img,
} from "@chakra-ui/react";
import {
  getPropertiesId,
  getPropertiesIdNoAuth,
  reservationDemande,
} from "@services/properties";

import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  addDays,
  formatDistanceStrict,
  format,
  getTime,
  isSameDay,
} from "date-fns";
import { Controller, useForm } from "react-hook-form";
import {
  locale,
  MONTHS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
} from "@root/utils/dateFr";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const calculTVA = (prixHT, tva) => {
  return (prixHT / 100) * tva;
};

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

export default function ListBien({ data }) {
  const { isAuthenticated, user, logout } = useAuth();
  const modifiersStyles = {
    selected: {
      color: "white",
      backgroundColor: "#67E767",
    },
    disabled: {
      color: "#c5c5c5",
    },
  };
  const router = useRouter();

  const { register, handleSubmit, watch, control } = useForm();

  const nBtraveler = watch("nTraveler");

  const [intervalDay, setIntervalDay] = useState(0);
  const [statePicker, setStatePicker] = useState({
    from: undefined,
    to: undefined,
  });

  const { from, to } = statePicker;
  const modifiers = { start: from, end: to };

  const { isOpen, onOpen, onClose } = useDisclosure();

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

    const { from, to } = DateUtils.addDayToRange(day, statePicker);

    const daysDisabled = getBetweenDate(
      new Date(from),
      new Date(to),
      data.disponibilities
    );

    if (!daysDisabled.length) {
      const range = DateUtils.addDayToRange(day, statePicker);
      setStatePicker(range);
    } else {
      alert("Error");
    }
  };

  const handleResetClick = () => {
    setStatePicker({ from: undefined, to: undefined });
  };

  const onSubmit = async (dataForm) => {
    // const { data } = await axios.post("/api/checkout/session");
    // const stripe = await stripePromise;
    // const { error } = await stripe.redirectToCheckout({
    //   sessionId: data.id,
    // });

    onOpen();

    // router.push("/checkout");

    // const objectToSend = {
    //   dateStart: from,
    //   dateEnd: to,
    //   montant: calculTVA(intervalDay * data.rate, 10) + intervalDay * data.rate,
    //   // Prendre l'user et mettre son id
    //   user: user.id,
    //   stripeToken: "pi_1221354354354354354",
    //   property: data["@id"],
    //   numberTraveler: dataForm.nTraveler,
    // };
    // console.log({ objectToSend });
  };

  // Loading
  // Comme la page n'a pas été créée, il faut faire patienter l'utilisateur durant la création de page
  if (router.isFallback) {
    return <div>La page est en train d'etre créée / Loading ...</div>;
  }

  // Les données n'existe pas, data contient un objet vide ex: {}
  if (!data) return <div>La page a un soucis...</div>;

  return (
    <Layout>
      <Center>
        <Box maxWidth={["368px", "1400px"]}>
          <Heading as="h1" textAlign="center" margin={10}>
            Passez une nuit insolite!
          </Heading>

          <Text
            ml={["0", "200px"]}
            textAlign={["center", "initial"]}
            mb="20px"
            mt={2}
            fontSize={["20px", "24px"]}
            fontWeight="semibold"
            lineHeight="short"
          >
            {data.title}
          </Text>

          <Center>
            <Box h={["400px", "460px"]} w={["100%", "initial"]}>
              <Box display="flex" flexDirection={["column", "initial"]}>
                <Box w={["100%", "800px"]} h={["250px", "200px"]} br="5px">
                  <Img
                    p={1}
                    borderRadius="5px"
                    w={["100%", "100%"]}
                    h={["250px", "460px"]}
                    src={data?.pictures[0]?.url}
                    alt="photobien"
                  ></Img>
                </Box>

                <Box
                  justifyContent="justify-content"
                  flexDirection={["row", "column"]}
                  display="flex"
                  maxWidth={["500px", "initial"]}
                >
                  <Image
                    p={1}
                    w={["50%", "350px"]}
                    h={["150px", "230px"]}
                    src={data.pictures[1].url}
                    alt="photobien"
                  ></Image>
                  <Image
                    p={1}
                    w={["50%", "350px"]}
                    h={["150px", "230px"]}
                    src={data.pictures[2].url}
                    alt="photobien"
                  ></Image>
                </Box>
              </Box>
            </Box>
          </Center>

          <Box>
            <Center>
              <Divider mb="5px" mt="5px" w="60%" colorScheme="blackAlpha" />
            </Center>

            <Center>
              <Flex p={1}>
                <Text
                  fontSize={["15px", "xl"]}
                  pr={["0", "20px"]}
                  w={["25%", "initial"]}
                  textAlign={["center", "initial"]}
                >
                  Surface: {data.surface} m2
                </Text>
                <Text
                  fontSize={["15px", "xl"]}
                  pr={["0", "20px"]}
                  display={["none", "block"]}
                >
                  -
                </Text>
                <Text
                  fontSize={["15px", "xl"]}
                  pr={["0", "20px"]}
                  w={["25%", "initial"]}
                  textAlign={["center", "initial"]}
                >
                  {data.typeProperty.title}
                </Text>
                <Text
                  fontSize={["15px", "xl"]}
                  pr={["0", "20px"]}
                  display={["none", "block"]}
                  textAlign={["center", "initial"]}
                >
                  -
                </Text>
                <Text
                  fontSize={["15px", "xl"]}
                  pr={["0", "20px"]}
                  w={["25%", "initial"]}
                  textAlign={["center", "initial"]}
                >
                  {data.maxTravelers} personnes maximum
                </Text>
                <Text
                  fontSize={["15px", "xl"]}
                  pr={["0", "20px"]}
                  display={["none", "block"]}
                >
                  -
                </Text>
                <Text fontSize={["15px", "xl"]} w={["25%", "initial"]}>
                  {data.rate} euros par nuit
                </Text>
              </Flex>
            </Center>

            <Center>
              <Divider mt="10px" colorScheme="blackAlpha" />
            </Center>
          </Box>

          <SimpleGrid
            display={["block", "grid"]}
            pt={["5px", "20px"]}
            maxW={["100%", "1350px"]}
            margin="0 auto"
            columns={2}
            spacing={10}
            h={["1800px", "1100px"]}
          >
            <div>
              <Box maxWidth={["100%", "initial"]}>
                <Text
                  ml="20px"
                  mt={["20px", "50px"]}
                  fontWeight="semibold"
                  fontSize="2xl"
                  pr="20px"
                >
                  Equipements du bien
                </Text>
                <Box
                  fontSize="xl"
                  minHeight="120px"
                  minWidth="100px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {data.equipment.map((e, i) => (
                    <Box
                      m={3}
                      boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px;"
                      w="110px"
                      h="50px"
                      borderRadius="5px"
                      backgroundColor="#89E98A"
                      fontWeight="bold"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text textAlign="center" key={i}>
                        {e}
                      </Text>
                    </Box>
                  ))}
                </Box>

                <Center>
                  <Divider mt="10px" w="60%" colorScheme="blackAlpha" />
                </Center>
                <Text
                  ml="20px"
                  mt="20px"
                  fontWeight="semibold"
                  fontSize="2xl"
                  pr="20px"
                >
                  Description du bien
                </Text>
                <Box mt="20px" minHeight="120px" ml="10px">
                  <Text
                    ml="20px"
                    fontSize="xl"
                    pr="20px"
                    letterSpacing="0.5px"
                    lineHeight="25%px"
                  >
                    {data.description}
                  </Text>
                </Box>
                <Center>
                  <Divider mt="30px" w="60%" colorScheme="blackAlpha" />
                </Center>
                <Text
                  ml="20px"
                  mt="20px"
                  fontWeight="semibold"
                  fontSize="2xl"
                  pr="20px"
                >
                  Informations complémentaires
                </Text>
                <Box mt="30px" mb="10px" pr="20px" minHeight="80px">
                  {data.valeurs.map((e, i) => (
                    <Box
                      fontSize="xl"
                      display="flex"
                      alignItems="flex-start"
                      ml="30px"
                    >
                      <>
                        <Box display="flex" mb="10px">
                          <Box
                            display="flex"
                            flexDirection="column"
                            w="200px"
                            h="50px"
                            justifyContent="space-between"
                          >
                            <Text>{e.propriete.name} </Text>
                          </Box>
                          <Box w="150px">
                            <Text> {e.value}</Text>
                            {e.value === null ? (
                              <Text> Non</Text>
                            ) : e.value === !null && e.type === "booleen" ? (
                              <Text>Oui </Text>
                            ) : (
                              <Text></Text>
                            )}
                          </Box>
                        </Box>
                      </>
                    </Box>
                  ))}
                </Box>
                <Center>
                  <Divider mt="10px" w="60%" colorScheme="blackAlpha" />
                </Center>
                <Text
                  ml="20px"
                  mt="20px"
                  fontWeight="semibold"
                  fontSize="2xl"
                  pr="20px"
                >
                  Activités
                </Text>
                <Box
                  mt="30px"
                  mb="30px"
                  pr="20px"
                  minHeight={["200px", "300px"]}
                >
                  {data.activities.map((e, i) => (
                    <>
                      <Box mb="30px">
                        <Text ml="30px" fontSize="xl" fontWeight="bold" key={i}>
                          {e.title}
                        </Text>
                        <Text fontSize="xl" ml="30px" key={i}>
                          {e.description}
                        </Text>
                      </Box>
                    </>
                  ))}
                </Box>
              </Box>
            </div>
            <Box
              display="flex"
              h={["600px", "900px"]}
              alignItems="flex-start"
              mt={["0", "60px"]}
            >
              <Box
                position={["initial", "sticky"]}
                top={["0", "10%"]}
                margin={["auto", "initial"]}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    boxShadow="1px 1px 10px 0px #656565"
                    // pos="fixed"
                    zIndex={100}
                    // bottom=""
                    w={["100%", "initial"]}
                    // right="0"
                    borderRadius="10px"
                    backgroundColor="#F8F8FF"
                  >
                    <Center className="RangeExample">
                      <Box w={["100%", "600px"]}>
                        <Box ml="10px" mt="10px">
                          <Text
                            fontSize="18px"
                            fontWeight="bold"
                            p="5px"
                            color="#BA2F2F"
                          >
                            {!from &&
                              !to &&
                              "Veuillez sélectionner votre jour d'arrivée."}
                            {from &&
                              !to &&
                              "Maintenant choisis le jour de ton départ"}
                            {from &&
                              to &&
                              `Bravo! Vous avez séléctionner du ${from.toLocaleDateString()} au
                  ${to.toLocaleDateString()}`}{" "}
                            {from && to && (
                              <Button
                                mt="10px"
                                bg="#b12d2d"
                                onClick={handleResetClick}
                                color="#FFF"
                              >
                                Choisir d'autres dates
                              </Button>
                            )}
                          </Text>
                        </Box>
                        <Center>
                          <DayPicker
                            modifiersStyles={modifiersStyles}
                            locale={locale}
                            months={MONTHS}
                            weekdaysLong={WEEKDAYS_LONG}
                            weekdaysShort={WEEKDAYS_SHORT}
                            numberOfMonths={numberOfMonths}
                            selectedDays={[from, { from, to }]}
                            modifiers={modifiers}
                            onDayClick={handleDayClick}
                            disabledDays={[
                              ...getBetweenDate(
                                new Date(Date.now()),
                                new Date(2022, 2, 18),
                                data.disponibilities
                              ),
                              {
                                before: new Date(Date.now()),
                              },
                            ]}
                          />
                        </Center>
                      </Box>
                    </Center>
                    <Center pt="20px">
                      <Text fontSize="18px">
                        Montant:{" "}
                        {calculTVA(intervalDay * data.rate, data.tax) +
                          intervalDay * data.rate}
                        € TTC
                      </Text>
                    </Center>
                    <Grid
                      bg="#F8F8FF"
                      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
                      gap={2}
                      p="20px"
                      borderRadius="10px"
                      margin="0 auto"
                    >
                      <Box>
                        <FormLabel>Voyageur</FormLabel>
                        <Controller
                          as={
                            <Select
                              placeholder="Nombre de voyageur"
                              _hover={{
                                background: "#FFF",
                                color: "#534b4f",
                              }}
                              borderColor={["#696969"]}
                              focusBorderColor="#8ae98a"
                            >
                              {[...Array(data.maxTravelers + 1).keys()]
                                .slice(1)
                                .map((e) => (
                                  <option value={e}>{e}</option>
                                ))}
                            </Select>
                          }
                          control={control}
                          name="nTraveler"
                          rules={{ required: true }}
                        />
                      </Box>
                      {isAuthenticated ? (
                        <Button
                          type="submit"
                          mt="30px"
                          fontWeight="bold"
                          fontSize="18px"
                          bg="#89E98A"
                          _hover={{
                            background: "#8ae98a",
                          }}
                        >
                          Réserver
                        </Button>
                      ) : (
                        <Button
                          mt="30px"
                          bg="#b12d2d"
                          color="#FFF"
                          _hover={{
                            background: "#b12d2d",
                          }}
                        >
                          Connectez-vous pour réserver
                        </Button>
                      )}
                    </Grid>
                  </Box>
                </form>
              </Box>
            </Box>
          </SimpleGrid>
          <Box mb="80px">
            <Heading textAlign="center">Ils ont laissé un souvenir!</Heading>
          </Box>
          <Box
            mt="10px"
            mb="80px"
            pr="20px"
            minHeight="220px"
            display="flex"
            justifyContent="center"
          >
            {data.activities.map((e, i) => (
              <Box display="flex" justifyContent="space-around">
                {e.comments.map((e, i) => (
                  <Box
                    m={12}
                    backgroundColor="#F8F8FF"
                    w="280px"
                    h="150px"
                    mt="10px"
                    borderRadius="5px"
                    boxShadow=" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"
                    mb="10px"
                    border="solid #8ae98a 5px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {e.comment_content}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Elements stripe={stripePromise}>
            <Modal
              size="7xl"
              blockScrollOnMount={false}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />

              <ModalPaiement
                tax={data.tax}
                prix={data.rate}
                titlebien={data.title}
                ville={data.address.town}
                rue={data.address.street}
                codepostal={data.address.postalCode}
                numberaddress={data.address.number}
                email={user?.email}
                dateStart={from}
                dateEnd={to}
                nbday={intervalDay}
                montant={
                  calculTVA(intervalDay * data.rate, data.tax) +
                  intervalDay * data.rate
                }
                user={user?.id}
                property={data["@id"]}
                numberTraveler={nBtraveler}
                onClose={onClose}
              />
            </Modal>
          </Elements>
        </Box>
      </Center>
    </Layout>
  );
}

// Ici ont recupere les données de la page

export async function getStaticProps(context) {
  const id = context.params.code;

  try {
    const { data } = await getPropertiesIdNoAuth(id);

    const equipment = Object.keys(data.equipment)
      .filter((x) => {
        return data.equipment[x] !== false;
      })
      .slice(2);

    return {
      props: {
        data: { ...data, equipment },
      },
      revalidate: 1,
    };
  } catch (error) {
    console.log("error");
    return {
      props: {
        data: {},
      },
    };
  }
}

// data: Array(1)
// data: [{...}]
// data[0] = {...}

// Les termes a comprendre:
// Client Side Rendering (CSR) => React
// Server Side Rendering (SSR) => getServerSideProps
// Static Site Generation (SSG) => getStaticProps

// Le mec est sur google, il clique sur ton site => NextJS renvoie une page html, css, js en mode SSG. Maintenant, le mec est sur ton site (pas sur google), React peut prendre le relais en mode CSR

// Ici ont définie si la page doit etre créée au build ou au client de l'user
export async function getStaticPaths() {
  // Requete axios sur la bdd qui renvoie toutes les catégories ex: [{title: cabane, id: 10},{title: yourt, id: 20}, ,{title: bateau, id: 30}] => [{id: 10}, {id: 20}, [id: 30]]
  // Meilleur solution si t'as pas plein de pages => Si t'as besoin de precharger toutes tes pages categorie, alors tu met fallback a false et path: [{id: 10}, {id: 20}, [id: 30]]
  // A faire si t'as trop de pages et le build est trop long => Si t'as besoin de prerendre toutes tes pages tu mets fallback a true et path: []
  return {
    paths: [],
    fallback: true,
  };
}
function ModalPaiement({
  onClose,
  dateStart,
  dateEnd,
  montant,
  user,
  property,
  numberTraveler,
  email,
  numberaddress,
  titlebien,
  tax,
  prix,
  nbday,
  codepostal,
  rue,
  ville,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [checkoutError, setCheckoutError] = useState();
  const [checkoutSuccess, setCheckoutSuccess] = useState();
  const router = useRouter();

  // const onSubmit = async (data) => {
  //   onClose();
  //   console.log(data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const montantToSend = montant * 100;
      const { data } = await axios.post("/api/checkout/paiement-intent", {
        amount: montantToSend.toFixed(),
      });

      alert("Paiement recu");

      const objectToSend = {
        dateStart: format(dateStart, "yyyy MM dd").split(" ").join("-"),
        dateEnd: format(dateEnd, "yyyy MM dd").split(" ").join("-"),
        montant,
        // Prendre l'user et mettre son id
        user: `api/users/${user}`,
        stripeToken: data.id,
        property: property.slice(1),
        numberTraveler: +numberTraveler,
      };
      // console.log("test", objectToSend);
      const test = await reservationDemande(objectToSend);

      router.push("/");
      //   if (status === "succeeded") {
      //     setCheckoutSuccess(true);
      //     destroyCookie(null, "paymentIntentId");
      //   }
    } catch (err) {
      alert(err.response.data["hydra:description"]);
      setCheckoutError(err.message);
    }
  };

  if (checkoutSuccess) return <p>Payment successful!</p>;
  const { isOpen, onOpen } = useDisclosure();
  return (
    <ModalContent h="800px" backgroundColor="#fff" color="#000">
      <Box h="100%" display="flex" justifyContent="center" alignItems="center">
        <Box
          w="50%"
          h="100%"
          borderRadius="5px"
          boxShadow=" rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;"
          backgroundImage="url('/bgbulle.png')"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            p={5}
            h="80%"
            w="80%"
            backgroundColor="#FFF"
            w="90%"
            opacity="0.9"
            borderRadius="15px"
            boxShadow=" rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;"
          >
            <Box display="flex" alignItems="center">
              <Text
                fontWeight="bold"
                border="solid #000 2px"
                w="40px"
                h="40px"
                fontSize="22px"
                borderRadius="50%"
                textAlign="center"
              >
                1
              </Text>
            </Box>

            <Text
              mb={5}
              textAlign="center"
              fontSize="24px"
              fontWeight="semibold"
            >
              Résumé demande de réservation
            </Text>
            <Text fontSize="18px">
              Vous recevrez une confirmation de réservation par email sous 48h.
              Ce n'est qu'après cette confirmation que vous serez débité.
            </Text>
            <Box
              h="70%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              pl={5}
              pb={5}
              pr={5}
            >
              <Box
                ml="40px"
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                w="40%"
                h="100%"
              >
                <Text p={1} fontSize="22px" fontWeight="bold">
                  Lieu
                </Text>
                <Text p={1} fontSize="22px" p={1} fontWeight="bold">
                  Arrivée le
                </Text>
                <Text p={1} fontSize="22px" p={1} fontWeight="bold">
                  Départ le
                </Text>
                <Text p={1} fontSize="22px" fontWeight="bold">
                  Votre email:
                </Text>
                <Text p={1} fontSize="22px" fontWeight="bold">
                  Adresse
                </Text>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                w="50%"
                h="100%"
              >
                <Box borderRadius="10px">
                  <Text p={1} fontSize="22px">
                    {titlebien}
                  </Text>
                </Box>

                <Text p={1} fontSize="22px">
                  {" "}
                  {format(dateStart, "yyyy MM dd").split(" ").join("-")}
                </Text>
                <Text p={1} fontSize="22px">
                  {format(dateEnd, "yyyy MM dd").split(" ").join("-")}
                </Text>
                <Text p={1} fontSize="22px">
                  {email}
                </Text>
                <Box h="50px">
                  <Box display="flex">
                    <Text p={1} fontSize="22px">
                      {numberaddress}
                    </Text>
                    <Text p={1} fontSize="22px">
                      {rue}
                    </Text>
                  </Box>
                  <Text fontSize="22px">{codepostal}</Text>
                  <Text mb="10px" fontSize="22px">
                    {ville}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          w="50%"
          h="100%"
          borderRadius="5px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            p={4}
            h="45%"
            w="90%"
            mb="30px"
            backgroundImage="url('/bgbulle.png')"
            backgroundColor="#FFF"
            borderRadius="15px"
            boxShadow=" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
          >
            <Box
              display="flex"
              alignItems="center"
              w="50px"
              justifyContent="flex-start"
              m={0}
            >
              <Text
                fontWeight="bold"
                border="solid #000 2px"
                w="40px"
                h="40px"
                fontSize="22px"
                borderRadius="50%"
                textAlign="center"
              >
                2
              </Text>
            </Box>

            <Text
              mb={5}
              textAlign="center"
              fontSize="24px"
              fontWeight="semibold"
            >
              Détail de la commande
            </Text>
            <Box
              h="70%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                w="40%"
                h="100%"
              >
                <Text pl={2} pr={2} pb={2} fontSize="22px" fontWeight="bold">
                  Nombre de nuit
                </Text>
                <Text p={2} fontSize="22px" fontWeight="bold">
                  Prix pour une nuit
                </Text>
                <Text p={2} fontSize="22px" fontWeight="bold">
                  TVA
                </Text>
                <Text p={2} fontSize="22px" fontWeight="bold">
                  Calcul du montant
                </Text>
                <Text p={2} fontSize="22px" fontWeight="bold">
                  Montant total
                </Text>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
              >
                <Text
                  textAlign="center"
                  backgroundColor="#FFF"
                  p={1}
                  fontSize="22px"
                  fontWeight="semibold"
                  w="250px"
                  mb="4px"
                  borderRadius="10px"
                >
                  {nbday}
                </Text>
                <Text
                  textAlign="center"
                  borderRadius="10px"
                  backgroundColor="#FFF"
                  w="250px"
                  mb="4px"
                  p={1}
                  fontSize="22px"
                  fontWeight="semibold"
                >
                  {prix} €
                </Text>
                <Text
                  textAlign="center"
                  borderRadius="10px"
                  backgroundColor="#FFF"
                  w="250px"
                  p={1}
                  mb="4px"
                  fontSize="22px"
                  fontWeight="semibold"
                >
                  {tax} %
                </Text>
                <Text
                  textAlign="center"
                  mb="4px"
                  borderRadius="10px"
                  w="250px"
                  backgroundColor="#FFF"
                  p={1}
                  fontSize="22px"
                  fontWeight="semibold"
                >
                  {nbday} x ( {prix} + {prix} x {tax} % )
                </Text>
                <Text
                  borderRadius="10px"
                  w="250px"
                  backgroundColor="#FFF"
                  p={1}
                  fontSize="24px"
                  fontWeight="semibold"
                  textAlign="center"
                >
                  {montant} €
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            backgroundImage="url('/bgbulle.png')"
            p={5}
            h="35%"
            w="80%"
            backgroundColor="#FFF"
            w="90%"
            borderRadius="15px"
            boxShadow=" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
          >
            <Box display="flex" alignItems="center">
              <Text
                fontWeight="bold"
                border="solid #000 2px"
                w="40px"
                h="40px"
                fontSize="22px"
                borderRadius="50%"
                textAlign="center"
              >
                3
              </Text>
            </Box>

            <Text
              mb={4}
              textAlign="center"
              fontSize="24px"
              fontWeight="semibold"
            >
              Règlement de la commande
            </Text>

            <Text fontSize="15px" fontWeight="bold" mb="5px">
              Tout nos paiement sont sécurisés à 100% en passant via Stripe,
              nous ne conservons en aucun cas vos données.
            </Text>
            <form onSubmit={handleSubmit}>
              <Box
                mb="15px"
                border="solid #DCDCDC 1px"
                h="30px"
                borderRadius="5px"
                backgroundColor="#FFF"
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "20px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#000",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
               
              </Box>
              <Center>
                <Button
                  mt="10px"
                  backgroundColor="#BA2F2F"
                  _hover={{
                    background: "#BA2F2F",
                  }}
                  type="submit"
                  disabled={!stripe}
                  color="#FFF"
                  fontWeight="bold"
                  fontSize="22px"
                >
                  Envoyer la demande de réservation
                </Button>
              </Center>

              {checkoutError && (
                <span style={{ color: "red" }}>{checkoutError}</span>
              )}
            </form>
          </Box>
        </Box>
      </Box>
    </ModalContent>
  );
}
