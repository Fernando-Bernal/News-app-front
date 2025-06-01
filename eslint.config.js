import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: { js, react },
    extends: ['js/recommended', 'plugin:react/recommended', 'prettier'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
      indent: ['error', 2],
      'no-unused-vars': 'warn',
      eqeqeq: ['error', 'always'],
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },
  },
]);
