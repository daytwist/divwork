module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest-dom/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "import",
    "unused-imports",
    "jest-dom",
  ],
  ignorePatterns: [".eslintrc.js", "build", "jest.config.js", "setupTests.ts"],
  rules: {
    "arrow-body-style": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      { js: "never", jsx: "never", ts: "never", tsx: "never" },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/tests/**", "**/mocks/**"],
      },
    ],
    "import/prefer-default-export": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "no-console": "off",
    "no-param-reassign": [2, { props: false }],
    "no-use-before-define": "off",
    "no-void": ["error", { allowAsStatement: true }],
    "react-hooks/exhaustive-deps": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "function-expression",
      },
    ],
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/restrict-template-expressions": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  root: true,
};
