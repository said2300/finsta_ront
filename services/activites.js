import axios from "axios";

const getActivites = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/activities`
  );

  return response;
};

const postActivites = async ({ obj }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/activities`
  );

  return response;
};

const getActivitesById = async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/activities/${id}`
  );

  return response;
};

export { getActivites, postActivites, getActivitesById };
