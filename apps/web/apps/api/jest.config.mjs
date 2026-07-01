export default {
  testEnvironment: "node",
  rootDir: "src",
  testMatch: ["**/__tests__/**/*.test.ts"],
  testTimeout: 30000,
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      useESM: true,
      tsconfig: "tsconfig.json",
    }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
