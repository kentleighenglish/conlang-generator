// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    rules: {
      "semi": 1,
      "vue/multi-word-component-names": 0
    }
  }
]);