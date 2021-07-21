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
  Checkbox,
  Select,
  Flex,
  Grid,
  Text,
  Center,
  NumberInput,
  Spinner,
  Alert,
  Textarea,
} from "@chakra-ui/react";
import Router from "next/router";
import {
  locale,
  MONTHS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
} from "@root/utils/dateFr";

import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

import { uploadPhoto } from "@services/photo";
import useAuth from "@context/context";
import { useRouter } from "next/router";

import { Controller, useForm } from "react-hook-form";

import {
  ajouterBien,
  getTypePropertiesAll,
  getTypePropertiesId,
} from "@services/properties";
import { getDynamicProp } from "@services/dynamicprop";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { isError, useQuery } from "react-query";
import { pays } from "@root/utils/listCountry";
import { tax } from "@root/utils/taxList";

const formatValueToInput = {
  integer: "number",
  string: "texte",
  booleen: "checkbox",
  boolean: "checkbox",
};

const FormPage = () => {
  const refDayPicker = useRef(null);
  const router = useRouter();
  const toast = useToast();
  const { isAuthenticated, user, loading } = useAuth();
  const { isLoading, isError, data: categorie, refetch } = useQuery(
    "categorie",

    // La dependance de useEffect
    // Relance ce useEffect a chaque fois que isAuthenticated change
    // isAuthenticated change quand le mec se connecte via login ou register|| Refresh de la page (token indispo pendant 100ms) => Token recuperer => reconnexion de l'user => isAuthenticated passe de false a true donc relance le useEffect
    getTypePropertiesAll
  );

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDaysToSend, setSelectedDaysToSend] = useState([]);
  const [properties, setProperties] = useState([]);

  const { register, handleSubmit, watch, control, errors } = useForm();
  const typeProperty = watch("typeProperty");

  useEffect(() => {
    if (typeProperty) {
      const selectedProperties = categorie.data["hydra:member"].find(
        (e) => e["@id"] === typeProperty
      ).proprietes;
      // console.log({ selectedProperties });
      setProperties(selectedProperties);
    }
    // if (typeProperty) {
    //   const id = typeProperty.split("/")[3];
    //   getTypePropertiesId(id);
    // }
  }, [typeProperty]);

  const onSubmit = async ({
    title,
    description,
    surface,
    nbrRoom,
    rate,
    maxTravelers,
    water,
    electricity,
    typeProperty,
    tax,
    accessHandicap,
    pictures,
    pool,
    baignoire,
    jaccuzzi,
    climatiseur,
    chauffage,
    wifi,
    number,
    street,
    postalCode,
    town,
    region,
    country,
    ...rest
  }) => {
    try {
      const value = Object.keys(rest)
        .map((e, o) => {
          const filterByNumber = Object.keys(rest).filter((key) => {
            if (key === `${o}`) return rest[key];
          });

          return {
            value: rest[filterByNumber[0]],
            propriete: filterByNumber[0]
              ? properties[+filterByNumber[0]]["@id"]
              : null,
          };
        })
        .filter((e) => e.value);

      // ici console.log() les proprietes
      // push les proprietes dans un tableau valeurs qui ira ensuite dans objectToSend
      const responseImg = await uploadPhoto(pictures);
      console.log({ responseImg });

      const activities = Object.keys(rest)
        .map((e, i) => {
          const filterByNumber = Object.keys(rest).filter((key) => {
            if (
              key.includes(`titleActivity-${i + 1}`) ||
              key.includes(`descriptionActivity-${i + 1}`)
            )
              return rest[key];
          });

          return {
            title: rest[filterByNumber[0]],
            description: rest[filterByNumber[1]],
          };
        })
        .filter((e) => e.title);

      const objectToSend = {
        title,
        description,
        surface,
        nbrRoom,
        rate,
        maxTravelers,
        water: water ? "Eau courante" : "Eau courante",
        electricity,
        typeProperty,
        tax: parseFloat(tax),
        accessHandicap,
        user: `/api/users/${user.id}`,
        equipment: {
          pool,
          baignoire,
          jaccuzzi,
          climatiseur,
          chauffage,
          wifi,
        },
        address: {
          number,
          street,
          postalCode,
          town,
          region,
          country,
        },
        valeurs: value,
        disponibilities: selectedDaysToSend,
        activities,
        pictures: [...responseImg.map((e) => e["@id"])],
      };

      // console.log(objectToSend);

      await ajouterBien(objectToSend);
      toast({
        position: "top",
        title: "Votre bien a été ajouté avec succès",
        description: "Il sera validé ou refusé dans les 48h",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      await delay(2000);
      await Router.push(`/hebergeurs`);
    } catch (err) {
      console.log(err);
    }
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleDayClick = (day, { selected }) => {
    const selectedDay = [...selectedDays];
    const selectedDayToSend = [...selectedDaysToSend];
    if (selected) {
      const selectedIndex = selectedDay.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDayToSend.splice(selectedIndex, 1);
      selectedDay.splice(selectedIndex, 1);
    } else {
      selectedDayToSend.push({
        jourDispo: format(day, "yyyy MM dd").split(" ").join("-"),
      });
      selectedDay.push(day);
    }

    // console.log({ selectedDay, selectedDayToSend });
    setSelectedDaysToSend(selectedDayToSend);
    setSelectedDays(selectedDay);
  };

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
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Box>
          <Heading
            textShadow="1px 1px 1px rgba(0,0,0,0.2)"
            as="h1"
            size={["2xl"]}
            fontSize={["2em"]}
            width={["initial", "initial", "70%", "initial"]}
            mr={["initial", "initial", "auto", "initial"]}
            ml={["initial", "initial", "auto", "initial"]}
            textAlign="center"
            pb="50px"
            mt="20px"
            color="#534b4f"
          >
            Ajoutez un bien
          </Heading>

          <Box maxWidth="600px" m="auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid templateColumns="repeat(1, 1fr)" gap={10}>
                <Box>
                  <Text
                    mb="40px"
                    textAlign="center"
                    fontSize="22px"
                    color="#DC143C"
                  >
                    Informations principales
                  </Text>
                  <FormControl mb="20px">
                    <FormLabel
                      fontWeight="bold"
                      color="#534b4f"
                      fontSize="18px"
                    >
                      Sélectionner la catégorie de votre bien
                    </FormLabel>
                    <Select
                      _hover={{
                        background: "#FFF",
                        color: "#534b4f",
                      }}
                      borderColor={["#696969"]}
                      focusBorderColor="#C64D4D"
                      fontSize="18px"
                      name="typeProperty"
                      ref={register({ required: true })}
                      placeholder="Choisir une option"
                    >
                      {categorie.data["hydra:member"].map((e, i) => (
                        <>
                          <option value={e["@id"]}>{e.title}</option>
                        </>
                      ))}
                    </Select>
                    {errors.typeProperty && (
                      <Alert variant="danger">
                        {errors.typeProperty?.type === "required" && (
                          <Text color="#DC143C">
                            Vous devez obligatoirement sélectionner une
                            catégorie
                          </Text>
                        )}
                      </Alert>
                    )}
                  </FormControl>

                  {properties.map((e, o) => (
                    <FormControl mb="20px">
                      {formatValueToInput[e.type] === "checkbox" ? (
                        <>
                          <FormLabel>{e.name}</FormLabel>
                          <Checkbox key={o} name={`${o}`} ref={register()} />
                        </>
                      ) : (
                        <>
                          <FormLabel>{e.name}</FormLabel>
                          <Input
                            _hover={{
                              background: "#FFF",
                              color: "#534b4f",
                            }}
                            borderColor={["#696969"]}
                            focusBorderColor="#C64D4D"
                            fontSize="18px"
                            key={o}
                            type={formatValueToInput[e.type]}
                            ref={register()}
                            name={`${o}`}
                          />
                        </>
                      )}
                    </FormControl>
                  ))}

                  <FormControl mb="20px">
                    <FormLabel
                      fontWeight="bold"
                      color="#534b4f"
                      fontSize="18px"
                    >
                      {" "}
                      Titre du bien
                    </FormLabel>
                    <Input
                      _hover={{
                        background: "#FFF",
                        color: "#534b4f",
                      }}
                      borderColor={["#696969"]}
                      focusBorderColor="#C64D4D"
                      fontSize="18px"
                      placeholder="Cabane dans les arbres - Jacuzzi"
                      type="text"
                      name="title"
                      ref={register({
                        required: true,
                        pattern: {
                          value: /[a-zA-Z]+/,
                        },
                      })}
                    />
                    {errors.title && (
                      <Alert variant="danger">
                        {errors.title?.type === "required" && (
                          <Text color="#DC143C">
                            Ajoutez un titre obligatoirement pour créer votre
                            annonce
                          </Text>
                        )}
                        {errors.title?.type === "pattern" && (
                          <Text color="#DC143C">
                            Ce champ doit être composé de lettre uniquement
                          </Text>
                        )}
                      </Alert>
                    )}
                  </FormControl>
                  <FormControl mb="20px">
                    <FormLabel
                      fontWeight="bold"
                      color="#534b4f"
                      fontSize="18px"
                    >
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
                      placeholder="Vous tomberez sous le charme de cette cabane avec jacuzzi..."
                      type="text"
                      name="description"
                      ref={register({
                        pattern: {
                          value: /[a-zA-Z]+/,
                        },
                        required: true,
                      })}
                    />
                    {errors.description && (
                      <Alert variant="danger">
                        {errors.description?.type === "required" && (
                          <Text color="#DC143C">
                            Ajoutez une description obligatoirement pour créer
                            votre annonce
                          </Text>
                        )}
                        {errors.description?.type === "pattern" && (
                          <Text color="#DC143C">
                            Ce champ doit être composé de lettre uniquement
                          </Text>
                        )}
                      </Alert>
                    )}
                  </FormControl>

                  <FormControl mb="20px">
                    <FormLabel
                      fontWeight="bold"
                      color="#534b4f"
                      fontSize="18px"
                    >
                      Surface du bien (surface en m²)
                    </FormLabel>
                    <NumberInput />
                    <InputGroup>
                      <Input
                        _hover={{
                          background: "#FFF",
                          color: "#534b4f",
                        }}
                        borderColor={["#696969"]}
                        focusBorderColor="#C64D4D"
                        fontSize="18px"
                        type="number"
                        placeholder="45"
                        name="surface"
                        ref={register({
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </InputGroup>
                    {errors.surface && (
                      <Alert variant="danger">
                        {errors.surface?.type === "required" && (
                          <Text color="#DC143C">
                            Ajouter la surface de votre bien obligatoirement
                            pour créer votre annonce
                          </Text>
                        )}
                      </Alert>
                    )}
                  </FormControl>
                  <FormControl mb="20px">
                    <FormLabel
                      fontWeight="bold"
                      color="#534b4f"
                      fontSize="18px"
                    >
                      {" "}
                      Nombre de pièces
                    </FormLabel>
                    <Input
                      _hover={{
                        background: "#FFF",
                        color: "#534b4f",
                      }}
                      borderColor={["#696969"]}
                      focusBorderColor="#C64D4D"
                      fontSize="18px"
                      placeholder="2"
                      type="number"
                      name="nbrRoom"
                      ref={register({ required: true, valueAsNumber: true })}
                    />
                    {errors.nbrRoom && (
                      <Alert variant="danger">
                        {errors.nbrRoom?.type === "required" && (
                          <Text color="#DC143C">
                            Ajoutez le nombre de pièce obligatoirement pour
                            créer votre annonce
                          </Text>
                        )}
                      </Alert>
                    )}
                  </FormControl>
                  <FormControl mb="20px">
                    <FormLabel
                      fontWeight="bold"
                      color="#534b4f"
                      fontSize="18px"
                    >
                      Voyageurs maximum
                    </FormLabel>
                    <Input
                      _hover={{
                        background: "#FFF",
                        color: "#534b4f",
                      }}
                      borderColor={["#696969"]}
                      focusBorderColor="#C64D4D"
                      fontSize="18px"
                      placeholder="4"
                      type="number"
                      name="maxTravelers"
                      ref={register({ required: true, valueAsNumber: true })}
                    />
                    {errors.maxTravelers && (
                      <Alert variant="danger">
                        {errors.maxTravelers?.type === "required" && (
                          <Text color="#DC143C">Le champ est requis</Text>
                        )}
                      </Alert>
                    )}
                  </FormControl>
                  <FormControl mb="20px">
                    <FormLabel
                      fontWeight="bold"
                      color="#534b4f"
                      fontSize="18px"
                    >
                      Prix minimum par nuit (prix en euros)
                    </FormLabel>
                    <Input
                      _hover={{
                        background: "#FFF",
                        color: "#534b4f",
                      }}
                      borderColor={["#696969"]}
                      focusBorderColor="#C64D4D"
                      fontSize="18px"
                      placeholder="120"
                      type="number"
                      name="rate"
                      ref={register({ required: true, valueAsNumber: true })}
                    />
                    {errors.rate && (
                      <Alert variant="danger">
                        {errors.rate?.type === "required" && (
                          <Text color="#DC143C">Le champ est requis</Text>
                        )}
                      </Alert>
                    )}
                  </FormControl>

                  <Grid templateColumns="repeat(3, 1fr)" gap={0} mb="20px">
                    <FormControl mt={2} id="accessHandicap" m="10px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Acces handicapé
                      </FormLabel>
                      <Checkbox
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                        name="accessHandicap"
                        ref={register()}
                      >
                        Oui
                      </Checkbox>
                    </FormControl>
                    <FormControl mt={2} m="10px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Eau courante
                      </FormLabel>
                      <Checkbox
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                        name="water"
                        ref={register()}
                      >
                        Oui
                      </Checkbox>
                    </FormControl>
                    <FormControl mt={2} m="10px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Eléctricité
                      </FormLabel>
                      <Checkbox
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                        name="electricity"
                        ref={register()}
                      >
                        Oui
                      </Checkbox>
                    </FormControl>
                  </Grid>
                  <FormControl mt={2} id="tax" mb="20px">
                    <FormLabel
                      fontWeight="bold"
                      color="#534b4f"
                      fontSize="18px"
                    >
                      Taxe
                    </FormLabel>
                    <Controller
                      as={
                        <Select
                          _hover={{
                            background: "#FFF",
                            color: "#534b4f",
                          }}
                          borderColor={["#696969"]}
                          focusBorderColor="#C64D4D"
                          fontSize="18px"
                          ref={register({
                            required: true,
                            valueAsNumber: true,
                          })}
                          placeholder="Sélectionner le pourcentage de taxe de votre bien"
                        >
                          {tax.map((e) => (
                            <option value={e.value}>{e.title}</option>
                          ))}
                        </Select>
                      }
                      name="tax"
                      rules={{ required: true }}
                      control={control}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <Center>
                    <Text
                      mb="40px"
                      textAlign="center"
                      fontSize="22px"
                      color="#DC143C"
                    >
                      Equipements disponibles
                    </Text>
                  </Center>

                  <Grid templateColumns="repeat(3, 1fr)" gap={3} mb="30px">
                    <FormControl mt={2} id="wifi" m="3px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Wifi
                      </FormLabel>
                      <Checkbox name="wifi" ref={register()}>
                        Oui
                      </Checkbox>
                    </FormControl>
                    <FormControl mt={2} id="piscine" m="3px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Pisicne
                      </FormLabel>
                      <Checkbox name="pool" ref={register()}>
                        Oui
                      </Checkbox>
                    </FormControl>
                    <FormControl mt={2} id="baignoire" m="3px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Baignoire
                      </FormLabel>
                      <Checkbox name="baignoire" ref={register()}>
                        Oui
                      </Checkbox>
                    </FormControl>
                    <FormControl mt={2} m="3px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Jacuzzi
                      </FormLabel>
                      <Checkbox name="jaccuzzi" ref={register()}>
                        Oui
                      </Checkbox>
                    </FormControl>
                    <FormControl mt={2} id="clim" m="3px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Climatiseur
                      </FormLabel>
                      <Checkbox name="climatiseur" ref={register()}>
                        Oui
                      </Checkbox>
                    </FormControl>
                    <FormControl mt={2} id="chauffage" m="3px">
                      <FormLabel
                        fontWeight="bold"
                        color="#534b4f"
                        fontSize="18px"
                      >
                        Chauffage
                      </FormLabel>
                      <Checkbox name="chauffage" ref={register()} pb="5px">
                        Oui
                      </Checkbox>
                    </FormControl>
                  </Grid>
                  <Box>
                    <Center>
                      <Text
                        mb="40px"
                        textAlign="center"
                        fontSize="22px"
                        color="#DC143C"
                      >
                        Adresse
                      </Text>
                    </Center>

                    <Grid templateColumns="repeat(2, 1fr)" gap={3} mb="30px">
                      <FormControl mt={2} id="number">
                        <FormLabel
                          fontWeight="bold"
                          color="#534b4f"
                          fontSize="18px"
                        >
                          Numéro
                        </FormLabel>
                        <Input
                          _hover={{
                            background: "#FFF",
                            color: "#534b4f",
                          }}
                          borderColor={["#696969"]}
                          focusBorderColor="#C64D4D"
                          fontSize="18px"
                          placeholder="Numéro de l'adresse "
                          type="text"
                          name="number"
                          ref={register({
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormControl mt={2} id="street">
                        <FormLabel
                          fontWeight="bold"
                          color="#534b4f"
                          fontSize="18px"
                        >
                          Rue
                        </FormLabel>
                        <Input
                          _hover={{
                            background: "#FFF",
                            color: "#534b4f",
                          }}
                          borderColor={["#696969"]}
                          focusBorderColor="#C64D4D"
                          fontSize="18px"
                          placeholder="Rue de l'adresse"
                          type="text"
                          name="street"
                          ref={register({ required: true })}
                        />
                      </FormControl>
                      <FormControl id="postalCode" m="3px">
                        <FormLabel
                          fontWeight="bold"
                          color="#534b4f"
                          fontSize="18px"
                        >
                          Code postal
                        </FormLabel>
                        <Input
                          _hover={{
                            background: "#FFF",
                            color: "#534b4f",
                          }}
                          borderColor={["#696969"]}
                          focusBorderColor="#C64D4D"
                          fontSize="18px"
                          placeholder="Rue de l'adresse"
                          type="text"
                          name="postalCode"
                          ref={register({
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormControl id="town" m="3px">
                        <FormLabel
                          fontWeight="bold"
                          color="#534b4f"
                          fontSize="18px"
                        >
                          Ville
                        </FormLabel>
                        <Input
                          _hover={{
                            background: "#FFF",
                            color: "#534b4f",
                          }}
                          borderColor={["#696969"]}
                          focusBorderColor="#C64D4D"
                          fontSize="18px"
                          placeholder="Rue de l'adresse"
                          type="text"
                          name="town"
                          ref={register({ required: true })}
                        />
                      </FormControl>
                      <FormControl id="region" m="3px">
                        <FormLabel
                          fontWeight="bold"
                          color="#534b4f"
                          fontSize="18px"
                        >
                          Région
                        </FormLabel>
                        <Input
                          _hover={{
                            background: "#FFF",
                            color: "#534b4f",
                          }}
                          borderColor={["#696969"]}
                          focusBorderColor="#C64D4D"
                          fontSize="18px"
                          placeholder="Rue de l'adresse"
                          type="text"
                          name="region"
                          ref={register({ required: true })}
                        />
                      </FormControl>
                      <FormControl id="country" m="3px">
                        <FormLabel
                          fontWeight="bold"
                          color="#534b4f"
                          fontSize="18px"
                        >
                          Pays
                        </FormLabel>
                        <Controller
                          as={
                            <Select
                              _hover={{
                                background: "#FFF",
                                color: "#534b4f",
                              }}
                              borderColor={["#696969"]}
                              focusBorderColor="#C64D4D"
                              fontSize="18px"
                              placeholder="Select option"
                            >
                              {pays.map((e) => (
                                <option value={e.value}>{e.title}</option>
                              ))}
                            </Select>
                          }
                          control={control}
                          name="country"
                        />
                      </FormControl>
                    </Grid>
                  </Box>
                  <Center>
                    <Text
                      mb="40px"
                      textAlign="center"
                      fontSize="22px"
                      color="#DC143C"
                    >
                      Ajoutez des photos
                    </Text>
                  </Center>
                </Box>
              </Grid>

              <input
                name="pictures"
                type="file"
                multiple
                ref={register({ required: true })}
              />

              <Text
                mb="40px"
                textAlign="center"
                fontSize="22px"
                color="#DC143C"
                mt="30px"
              >
                Ajoutez une ou plusieurs activités
              </Text>
              <AddActivity register={register} />
              <Text
                mb="40px"
                mt="30px"
                textAlign="center"
                fontSize="22px"
                color="#DC143C"
              >
                Ajoutez les jours de disponibilités de votre bien
              </Text>
              <div ref={refDayPicker}>
                <Button mt={4} mb={4} color="white" colorScheme="teal">
                  Selectionner tout le mois
                </Button>
                <br />
                <DayPicker
                  months={MONTHS}
                  weekdaysLong={WEEKDAYS_LONG}
                  selectedDays={selectedDays}
                  weekdaysShort={WEEKDAYS_SHORT}
                  onDayClick={handleDayClick}
                  disabledDays={[
                    {
                      before: new Date(Date.now()),
                    },
                  ]}
                />
              </div>
              <br />
              <Button
                type="submit"
                mt={4}
                mb={4}
                color="white"
                colorScheme="teal"
              >
                Envoyer la demande
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default FormPage;

function AddActivity({ register }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Grid templateColumns="50px 1fr" gap={10} alignItems="center">
        <Button
          onClick={() => setCount(count + 1)}
          mt={4}
          mb={4}
          color="white"
          colorScheme="teal"
          type="button"
        >
          +
        </Button>
        <Text as="h4" fontSize="20px" pb="5px">
          Ajouter une activité
        </Text>
      </Grid>
      {[...Array(count).keys()].map((e) => (
        <FormControl key={e} mt={6}>
          <FormLabel fontWeight="bold">Activité numéro {e + 1}</FormLabel>
          <Input
            placeholder="Titre de l'activité"
            type="text"
            name={`titleActivity-${e + 1}`}
            ref={register({ required: true })}
          />
          <Input
            mt={2}
            placeholder="Description de l'activité"
            type="text"
            name={`descriptionActivity-${e + 1}`}
            ref={register({ required: true })}
          />
        </FormControl>
      ))}
    </div>
  );
}
