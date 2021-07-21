module.exports = {
  // Automatically clear mock calls and instances between every test

  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: ".coverage",
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@pages(.*)$": "<rootDir>/pages$1",
    "^@components(.*)$": "<rootDir>/components$1",
    "^@auth(.*)$": "<rootDir>/auth$1",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
