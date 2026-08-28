import next from "eslint-config-next";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...next,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "scripts/**",
      // مخرجات محوّل OpenNext و Wrangler (حزم مولّدة، لا تُفحص)
      ".open-next/**",
      ".wrangler/**",
    ],
  },
];

export default eslintConfig;
