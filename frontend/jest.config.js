module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  roots: ["<rootDir>/src/tests"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^d3-(.*)$": `<rootDir>/node_modules/d3-$1/dist/d3-$1`,
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
