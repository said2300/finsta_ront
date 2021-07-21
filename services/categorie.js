import axios from "axios";
import auth from "@context/axiosAuth";

const deleteCat = async (id) => {
  const response = await auth.delete(
    `https://arcane-spire-42874.herokuapp.com/api/proprietes/${id}`
  );

  return response;
};

const ajouterCat = async (attribut) => {
  const { data } = await auth.post(
    `https://arcane-spire-42874.herokuapp.com/api/proprietes`,
    attribut
  );

  return data;
};

export { deleteCat, ajouterCat };
