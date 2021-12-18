describe("Mediator Welcome", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should navigate to the mediator welcome page", () => {
    cy.visit("/mediator");
    cy.location("pathname").should("equal", "/mediator");
    // etc.
  });
});
