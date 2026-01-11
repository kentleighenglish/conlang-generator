// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default withNuxt([
  stylistic.configs.customize({
    quotes: "double",
  }),
  eslintConfigPrettier,
  {
    rules: {
      semi: 1,
      quotes: [2, "double"],
      "vue/multi-word-component-names": 0,
      "comma-dangle": ["warn", "always-multiline"],
    },
  },
]);
