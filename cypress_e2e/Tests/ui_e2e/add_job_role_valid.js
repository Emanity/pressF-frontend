const { expect } = require("chai");

describe("Adding job role valid values", () => {
    it("should add job role", () => {
        cy.visit("http://localhost:7999/login");
        cy.url().should('include', '/login');
        cy.get('[data-cy=loginHeading]').should('contain', 'Login');
        cy.get('[data-cy="emailInput"]').type('admin@kainos.com').should('have.value', 'admin@kainos.com');
        cy.get('[data-cy="passwdInput"]').type('password').should('have.value', 'password');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="user"]').click();
        cy.get('[data-cy="addrole"]').click();
        cy.visit("http://localhost:7999/add-job-role");
        cy.get('h4').should('contain', 'Add a Job Role').click();
        cy.get('[data-cy="jobTitleInput"]').type('Senior Test Engineer').should('have.value', 'Senior Test Engineer');
        cy.get('[data-cy="jobBandDropdown"]').select('Senior Associate').should('have.value', '5');
        cy.get('[data-cy="jobCapabDropdown"]').select('Engineering').should('have.value', '3');
        cy.get('[data-cy="jobDiscipDropdown"]').select('Testing & Quality Assurance').should('have.value', '4');
        cy.get('[data-cy="jobSpecInput"]').type('Good technical ability and can assist with test automation tasks and has a desire to develop their test automation skills further. Understanding of different delivery methodologies and how testing fits within them.')
            .should('have.value', 'Good technical ability and can assist with test automation tasks and has a desire to develop their test automation skills further. Understanding of different delivery methodologies and how testing fits within them.');
        cy.get('[data-cy="jobCompInput"]').type('Developing and executing functional automated and manual tests to help the team deliver working application software that meets user needs')
            .should('have.value', 'Developing and executing functional automated and manual tests to help the team deliver working application software that meets user needs');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('h4').should('contain', 'Add Job Role Complete');
        cy.get('[data-cy="homePageLink"]').click();
        cy.url().should('include', '/index');
    });
});