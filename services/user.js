import axios from "axios";
import auth from "../auth/axiosAuth";

const getUsers = async () => {
  // console.log("token ? services");

  const response = await auth.get(`https://arcane-spire-42874.herokuapp.com/api/users`);

  return response;
};
const getUserId = async (id) => {
  const response = await auth.get(
    `https://arcane-spire-42874.herokuapp.com/api/users/${id}`
  );

  return response;
};

const deleteUserId = async (id) => {
  const response = await auth.delete(
    `https://arcane-spire-42874.herokuapp.com/api/users/${id}`
  );

  return response;
};

const getReservations = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reservations`
  );

  return response;
};

const putUserId = async (id, modifiedUser) => {
  const response = await auth.put(`https://arcane-spire-42874.herokuapp.com/api/users/${id}`, modifiedUser);

  return response;
};

const sendTokenVerify = async (token, json) => {
  const response = await axios.post(
    `https://arcane-spire-42874.herokuapp.com/api/verify/email/${token}`,
    json
  );

  return response;
};

const sendEmailPassword = async (email) => {
  const response = await auth.post(
    `https://arcane-spire-42874.herokuapp.com/api/password/forgot`, email);

  return response;
};

const putPassword = async (token, json) => {
  const response = await auth.put(`https://arcane-spire-42874.herokuapp.com/api/password/forgot/${token}`, 
  json);


  return response;
};

export {
  getUsers,
  getReservations,
  deleteUserId,
  putUserId,
  getUserId,
  sendTokenVerify,
  sendEmailPassword,
  putPassword,
};
