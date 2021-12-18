describe("User Welcome", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/user");
  });
  it("should display the welcome page, change the locale and check if the title translation is shown", () => {
    cy.setLocale("de");
    cy.getBy("view.title").should("exist").should("contain", "Willkommen!");
    cy.setLocale("en");
    cy.getBy("view.title").should("contain", "user.welcome.title");
  });
  it("fill out the questionaire and navigate to the finder", () => {
    cy.get('button[type="submit"]')
      .as("submitButton")
      .should("exist")
      .should("have.class", "invalid");
    cy.get("#q1-yes").should("exist").click().should("be.checked");
    cy.get("#q2-yes").should("exist");
    cy.get("#q2-no").should("exist");
    cy.get("#q1-no").should("exist").click().should("be.checked");
    cy.get("#q2-yes").should("not.exist");
    cy.get("#q2-no").should("not.exist");
    cy.get("#q3-yes").should("exist").click().should("be.checked");
    cy.get("#q4-yes").should("exist");
    cy.get("#q4-no").should("exist").click().should("be.checked");
    // etc.
    cy.get("@submitButton").should("not.have.class", "invalid").click();
    cy.location("pathname").should("equal", "/user/finder");
  });
  // etc.
});
