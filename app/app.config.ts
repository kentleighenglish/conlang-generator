import { defineAppConfig } from "#imports";

export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: "cursor-pointer",
      },
    },
    dashboardGroup: {
      base: "relative inset-0 flex overflow-hidden",
    },
    colors: {
      primary: "rose",
      secondary: "yellow",
      neutral: "slate",
    },
  },
});