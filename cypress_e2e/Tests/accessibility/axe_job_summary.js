const { expect } = require("chai");


describe("Viewing available job role's summary", () => {
    it("displays available job role's summary", () => {
        cy.visit('http://localhost:7999/job-roles');
        cy.get('[data-cy="jobSummary2"]').should('contain', 'Innovation Lead').click();
        cy.get('[data-cy=jobRoleDetailsLink2]').should('contain', 'View Job Role Details').click();
    });

    describe('A11y',() => {
        beforeEach(() => {
            cy.injectAxe();
        });
    
        it('should have no detectable a11y errors on page load', () => {
            cy.checkA11y();
        });
    });
});