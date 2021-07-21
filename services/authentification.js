import axios from "axios";

const login = async (valuesUser) => {
  const response = await axios.post(
    `https://arcane-spire-42874.herokuapp.com/authentication_token`,
    valuesUser
  );

  return response;
};

const inscriptionHebergeur = async (valuesUser) => {
  const response = await axios.post(
    `https://arcane-spire-42874.herokuapp.com/api/register`,
    valuesUser
  );

  return response;
};

const inscriptionUtilisateur = async (valuesUser) => {
  console.log(valuesUser);
  const response = await axios.post(
    `https://arcane-spire-42874.herokuapp.com/api/register`,
    valuesUser
  );

  return response;
};

const inscriptionNewsltter = async (valuesUser) => {
  const response = await axios.post(
    `https://arcane-spire-42874.herokuapp.com/api/newsletters`,
    valuesUser
  );

  return response;
};

export { login, inscriptionHebergeur, inscriptionUtilisateur, inscriptionNewsltter };
