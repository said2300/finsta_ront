const { configureSitemap } = require("@sergeymyssak/nextjs-sitemap");
const { default: axios } = require("axios");

const splitId = (string) => string.split("/")[3];

const getAllProperties = async () => {
  const { data } = await axios.get(
    "https://arcane-spire-42874.herokuapp.com/api/properties"
  );
  return data?.["hydra:member"];
};

const getTypePropertiesAll = async () => {
  const { data } = await axios.get(
    "https://arcane-spire-42874.herokuapp.com/api/type_properties"
  );
  return data?.["hydra:member"];
};

async function getDynamicPaths() {
  const biens = await getAllProperties();
  const categorie = await getTypePropertiesAll();

  const biensId = biens.map((item) => `/biens/${splitId(item?.["@id"])}`);
  const categorieId = categorie.map(
    (item) => `/categorie/${splitId(item?.["@id"])}`
  );

  return [...biensId, ...categorieId];
}

getDynamicPaths().then((paths) => {
  const Sitemap = configureSitemap({
    baseUrl: "https://f2i-dev-14-ba-ka-pc.vercel.app",
    include: paths,
    exclude: [
      "/hebergeurs/*",
      "/admin/*",
      "/espace-personnel/*",
      "/bien/*",
      "/api/*",
      "/checkout/*",
    ],
    excludeIndex: true,
    pagesConfig: {
      "/project/*": {
        priority: "0.5",
        changefreq: "daily",
      },
    },
    isTrailingSlashRequired: true,
    targetDirectory: __dirname + "/public",
    pagesDirectory: __dirname + "/pages",
  });
  Sitemap.generateSitemap();
});
