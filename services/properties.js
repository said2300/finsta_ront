import auth from "@context/axiosAuth";
import axios from "axios";

const getProperties = async (page) => {
  const response = await auth.get(
    `https://arcane-spire-42874.herokuapp.com/api/properties?page=${page}`
  );

  return response;
};

const deletePropertiesId = async (id) => {
  const response = await auth.delete(
    `https://arcane-spire-42874.herokuapp.com/api/properties/${id}`
  );

  return response;
};

const getPropertiesId = async (id) => {
  const response = await auth.get(
    `https://arcane-spire-42874.herokuapp.com/api/properties/${id}`
  );

  return response;
};

const getPropertiesIdNoAuth = async (id) => {
  const response = await axios.get(
    `https://arcane-spire-42874.herokuapp.com/api/properties/${id}`
  );

  return response;
};

const getTypeProperties = async (id) => {
  const response = await axios.get(
    `https://arcane-spire-42874.herokuapp.com/api/type_properties/${id}`
  );

  return response;
};

const getTypePropertiesAll = async () => {
  const response = await axios.get(
    `https://arcane-spire-42874.herokuapp.com/api/type_properties`
  );

  return response;
};

const getTypePropertiesId = async (id) => {
  const response = await axios.get(
    `https://arcane-spire-42874.herokuapp.com/api/type_properties/${id}`
  );

  return response;
};

const ajouterBien = async (informations) => {
  const { data } = await auth.post(
    `https://arcane-spire-42874.herokuapp.com/api/properties`,
    informations
  );

  return data;
};

const ajouterEquipement = async (valueBien) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/addequipment`
  );

  return response;
};

const getCategorieProperties = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/propriete_type_properties`
  );

  return response;
};

const getPropertiesUser = async (id) => {
  const response = await auth.get(
    `https://arcane-spire-42874.herokuapp.com/api/properties?user=${id}`
  );

  return response;
};

const handleBien = async (id, choice) => {
  const response = await auth.patch(
    `https://arcane-spire-42874.herokuapp.com/api/properties/${id}/status`,
    {
      status: choice,
    }
  );

  return response;
};

const handleReservation = async (id, choice) => {
  const response = await auth.patch(
    `https://arcane-spire-42874.herokuapp.com/api/reservations/${id}/status`,
    {
      status: choice,
    }
  );

  return response;
};

const reservationDemande = async (informations) => {
  const { data } = await auth.post(
    `https://arcane-spire-42874.herokuapp.com/api/reservations`,
    informations
  );

  return data;
};

const getReservationProprio = async () => {
  try {
    const { data } = await auth.get(
      `https://arcane-spire-42874.herokuapp.com/api/reservations`
    );

    return data;
  } catch (error) {
    console.log("error");
  }
};

const getReservationPasse = async () => {
  const { data } = await auth.get(
    `https://arcane-spire-42874.herokuapp.com/api/reservations?dateStart[before]=today`
  );
  return data;
};

const putCalendrierProperties = async (id, modifiedCalendar) => {
  const response = await auth.put(
    `https://arcane-spire-42874.herokuapp.com/api/properties/${id}/disponibilities `,
    modifiedCalendar
  );

  return response;
};

export {
  getProperties,
  ajouterBien,
  ajouterEquipement,
  getTypeProperties,
  getPropertiesId,
  getCategorieProperties,
  getTypePropertiesAll,
  getTypePropertiesId,
  deletePropertiesId,
  getPropertiesUser,
  handleBien,
  getPropertiesIdNoAuth,
  reservationDemande,
  getReservationProprio,
  putCalendrierProperties,
  handleReservation,
  getReservationPasse,
};
