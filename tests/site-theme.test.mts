import assert from "node:assert/strict";
import test from "node:test";

import { getThemeCssVariables } from "../src/lib/site-theme";

test("الثيم المنشور يولّد رموز التصميم من اللونين الأساسي والمساند", () => {
  const variables = getThemeCssVariables({ primary: "#183B56", accent: "#D6863A", background: "#F7F8FA" });

  assert.equal(variables["--color-brand-500"], "#183B56");
  assert.equal(variables["--color-accent-500"], "#D6863A");
  assert.equal(variables["--color-cream"], "#F7F8FA");
});
