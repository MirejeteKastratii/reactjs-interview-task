import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
export default {
  preset: "ts-jest",
  // setupFilesAfterEnv: ["<rootDir>/testSetup.ts"],
  moduleNameMapper: {
    "\\.(css|less)$": "jest-css-modules",
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>/",
    }),
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!blah)"],
};
