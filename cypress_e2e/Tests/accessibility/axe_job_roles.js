const { expect } = require("chai");

describe('Getting Job Roles view', () => {
    it('connects to display Job Roles', () => {
        cy.visit('http://localhost:7999');        
        cy.get('[data-cy=viewJobRoles]').should('contain', 'View Job Roles').click();
        cy.url().should('include', '/job-roles');
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

