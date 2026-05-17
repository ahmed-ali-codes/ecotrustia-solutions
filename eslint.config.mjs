import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.js", // Ignore configuration root JS files
      "*.mjs", // Ignore configuration root MJS files
      "scripts/**", // Ignore build/utility scripts
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: "writable",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-undef": "off", // TypeScript already type-checks undefined variables, so this is safe and recommended
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "react/no-unescaped-entities": "off", // Disable unescaped entities since standard react doesn't strictly need them escaped under modern bundlers, or let's keep it clean
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' where dynamic types are required (e.g. file and audio converters)
      "@typescript-eslint/no-require-imports": "off", // Allow standard require imports where ES modules are not supported by the package
      "prefer-const": "warn", // Warn instead of error for const reassignments
      "@typescript-eslint/ban-ts-comment": "off", // Allow @ts-ignore when type exceptions are needed
      "no-useless-escape": "off", // Allow regex escape characters since they don't impact runtime execution
    },
  },
];
