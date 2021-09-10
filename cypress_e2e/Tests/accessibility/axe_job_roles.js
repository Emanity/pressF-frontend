const { expect } = require("chai");

describe("Getting Job Roles view", () => {
    it("should connect to display Job Roles", () => {
        cy.visit("http://localhost:7999/login");
        cy.url().should('include', '/login');
        cy.get('[data-cy=loginHeading]').should('contain', 'Login');
        cy.get('[data-cy="emailInput"]').type('email@kainos.com').should('have.value', 'email@kainos.com');
        cy.get('[data-cy="passwdInput"]').type('password').should('have.value', 'password');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="user"]').click();
        cy.get('[data-cy="viewjobrole"]').click();
        cy.url().should('include', '/job-roles');
        cy.get('[data-cy="jobSummary2"]').should('contain', 'Innovation Lead').click();
        cy.get('[data-cy=jobRoleDetailsLink2]').should('contain', 'View Job Role Details').click();
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