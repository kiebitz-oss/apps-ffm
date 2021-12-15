describe('User Welcome', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/user');
    });
    it('should display the welcome page, change the locale and check if the title translation is shown', () => {
        cy.setLocale('de');
        cy.getBy('view.title').should('exist').should('contain', 'Willkommen!');
        cy.setLocale('en');
        cy.getBy('view.title').should('contain', 'user.welcome.title');
    });
    it('select all checkboxes and navigate to the finder', () => {
        cy.getBy('input{age-12}').check().should('be.checked');
        cy.getBy('input{age-30}').check().should('be.checked');
        cy.getBy('input{6-month-ago}').check().should('be.checked');
        cy.get('a[href="/user/finder"]').click();
        cy.location('pathname').should('equal', '/user/finder');
    });
    // etc.
});
