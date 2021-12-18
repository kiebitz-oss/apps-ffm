/// <reference path="index.d.ts" />

Cypress.Commands.add("getBy", (selector, options) => {
  let alias = selector.replace(/{(\S+)}/g, '[data-test="$1"]');
  if (!/data-test/.test(alias)) {
    alias = `[data-test="${alias}"]`;
  }
  return cy.get(alias, options);
});

Cypress.Commands.add("getByLike", (selector, options) => {
  let alias = selector.replace(/{(\S+)}/g, '[data-test*="$1"]');
  if (!/data-test/.test(alias)) {
    alias = `[data-test*="${alias}"]`;
  }
  return cy.get(alias, options);
});

Cypress.Commands.add("setLocale", (locale) => {
  cy.getBy(`nav.locale.${locale}`).as("locale").should("exist").click();
  return cy.get("@locale").should("have.class", "font-bold");
});
