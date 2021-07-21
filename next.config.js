const withPWA = require("next-pwa");

module.exports = withPWA({
  pageExtensions: ["page.jsx", "page.js"],
  pwa: {
    dest: "public",
  },
});

// module.exports = {
//   pageExtensions: ["page.jsx", "page.js"],
//   cssLoaderOptions: {
//     url: false,
//   },
//   pwa: {
//     dest: "public",
//   },
// };
