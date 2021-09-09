const { expect } = require("chai");

describe("Viewing job role's details", () => {
    it("displays job role's details", () => {
        cy.visit('http://localhost:7999/job-role-details/2');
        cy.get('[data-cy=jobTitleCard]').should('contain', 'Innovation Lead');
        cy.get('[data-cy=jobRoleDetails]').should('contain', 'Job Role Details').click();
        cy.get('[data-cy=jobCompetencies]').should('contain', 'Job Competencies').click();
        cy.get('[data-cy=jobCompLink]').should('be.visible');
        cy.get('[data-cy=jobSpecification]').should('contain', 'Job Specification').click();
        cy.get('[data-cy=jobSpecLink]').should('be.visible');
        cy.get('[data-cy=jobRoleResponsibilities]').should('contain', 'Job Role Responsibilities').click();
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