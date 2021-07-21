import auth from "../auth/axiosAuth";

const uploadPhoto = async (photos) => {
  const response = await Promise.all(
    Object.keys(photos).map(async (key) => {
      const photo = photos[key];
      let formDataImg = new FormData();
      formDataImg.append("file", photo);

      const { data } = await auth.post(
        `https://arcane-spire-42874.herokuapp.com/api/pictures`,
        formDataImg,
        {
          headers: {
            // accept: "application/json",
            "Content-Type": `multipart/form-data;`,
          },
        }
      );
      return data;
    })
  );

  return response;
};

export { uploadPhoto };
