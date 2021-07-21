import auth from "@context/axiosAuth";
import axios from "axios";

const getDynamicProp = async () => {
  const response = await auth.get(
    `https://arcane-spire-42874.herokuapp.com/api/proprietes`
  );

  return response;
};

export { getDynamicProp };
