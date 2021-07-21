import auth from "@context/axiosAuth";
import axios from "axios";

const getNotificationsHebergeur = async (id) => {
  const response = await auth.get(
    `https://arcane-spire-42874.herokuapp.com/api/users/${id}/user_notifications`
  );

  return response;
};

export { getNotificationsHebergeur };
