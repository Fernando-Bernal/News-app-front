import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import parser from "@babel/eslint-parser";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: { js, react },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...prettier.rules,
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-unused-vars": "warn",
      eqeqeq: ["error", "always"],
      "no-console": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
  },
]);
