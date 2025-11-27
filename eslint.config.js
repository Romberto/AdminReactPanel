// eslint.config.js
export default {
  root: true,
  ignorePatterns: ["node_modules", "dist"],
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      plugins: ["react", "@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
      ],
      settings: { react: { version: "detect" } },
      rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "react/prop-types": "off"
      }
    }
  ]
};
