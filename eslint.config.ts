import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(typescriptEslint.configs.recommended, {
  ignores: ["./dist"],
});
