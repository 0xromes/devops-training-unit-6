import { fixupPluginRules } from "@eslint/compat";
import eslintJs from "@eslint/js";
import eslintPrettier from "eslint-plugin-prettier";
import eslintReact from "eslint-plugin-react";
import eslintReactCompiler from "eslint-plugin-react-compiler";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintReactRefresh from "eslint-plugin-react-refresh";
import eslintTailwind from "eslint-plugin-tailwindcss";
import eslintUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import eslintTypescript from "typescript-eslint";

const reactHooksUpdated = fixupPluginRules(eslintReactHooks);

export default eslintTypescript.config(
  { ignores: ["dist", "node_modules, postcss.config.js, tailwind.config.ts"] },
  {
    extends: [
      eslintJs.configs.recommended,
      ...eslintTypescript.configs.recommended,
      ...eslintTailwind.configs["flat/recommended"],
      eslintReact.configs.flat["jsx-runtime"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: eslintPrettier,
      "react-compiler": eslintReactCompiler,
      "react-hooks": reactHooksUpdated,
      "react-refresh": eslintReactRefresh,
      "unused-imports": eslintUnusedImports,
    },
    rules: {
      "react/jsx-boolean-value": "error",
      "react/jsx-no-target-blank": "off",
      "react-compiler/react-compiler": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_.*",
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "tailwindcss/classnames-order": "off",
    },
  }
);
