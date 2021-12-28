describe("User Finder", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should display the headline on the user finder page", () => {
    cy.visit("/");
    cy.setLocale("de");
    cy.get("main h2").should("exist").should("contain", "Willkommen!");
    // etc.
  });
});
