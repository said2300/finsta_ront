import auth from "@context/axiosAuth";
import axios from "axios";

const getComments = async () => {
  const response = await auth.get(
    `https://arcane-spire-42874.herokuapp.com/api/comments`
  );

  return response;
};

const postComments = async (informations) => {
  const { data: response } = await auth.post(
    `https://arcane-spire-42874.herokuapp.com/api/comments`,
    informations
  );

  return response;
};

const deleteCommentsId = async (id) => {
  const response = await auth.delete(
    `https://arcane-spire-42874.herokuapp.com/api/comments/${id}`
  );

  return response;
};
export { getComments, deleteCommentsId, postComments };
