module.exports = {
  "plugins": [
    require("@trivago/prettier-plugin-sort-imports"),
    require("prettier-plugin-tailwindcss"),
  ],
  importOrder: ["server-only", "<THIRD_PARTY_MODULES>", "^[./]", "\.css$"],
};
