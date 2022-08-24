module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["import"],
  rules: {
    "import/newline-after-import": 2,
    "import/order": 2,
  },
}
