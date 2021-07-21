import axios from "axios";
import auth from "../auth/axiosAuth";

const getApropos = async () => {
  const response = await axios.get(
    `https://arcane-spire-42874.herokuapp.com/api/a_propos`
  );

  return response;
};

const postApropos = async (description) => {
  const { data } = await auth.post(
    `https://arcane-spire-42874.herokuapp.com/api/a_propos`,
    description
  );

  return data;
};

export { getApropos, postApropos };
