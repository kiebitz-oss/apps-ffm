/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getBy(
      selector: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
    ): Chainable<JQuery>;
    getByLike(
      selector: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
    ): Chainable<JQuery>;
    setLocale(locale: "de" | "en"): Chainable<Subject>;
  }
}
