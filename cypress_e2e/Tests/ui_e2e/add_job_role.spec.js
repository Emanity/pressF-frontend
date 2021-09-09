const { expect } = require("chai");

describe("Adding job role", () => {
    it("should display error - invalid job title", () => {
        cy.visit("http://localhost:7999/add-job-role");
        cy.get('h4').should('contain', 'Add a Job Role').click();
        cy.get('[data-cy="jobTitleInput"]').type('!^%').should('have.value','!^%' );
        cy.get('[data-cy="jobBandDropdown"]').select('Senior Associate').should('have.value', '5');
        cy.get('[data-cy="jobCapabDropdown"]').select('Engineering').should('have.value', '3');
        cy.get('[data-cy="jobDiscipDropdown"]').select('Testing & Quality Assurance').should('have.value', '4');
        cy.get('[data-cy="jobSpecInput"]').type('Good technical ability and can assist with test automation tasks and has a desire to develop their test automation skills further. Understanding of different delivery methodologies and how testing fits within them.')
        .should('have.value', 'Good technical ability and can assist with test automation tasks and has a desire to develop their test automation skills further. Understanding of different delivery methodologies and how testing fits within them.');
        cy.get('[data-cy="jobCompInput"]').type('Developing and executing functional automated and manual tests to help the team deliver working application software that meets user needs')
        .should('have.value', 'Developing and executing functional automated and manual tests to help the team deliver working application software that meets user needs');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="alert"]').should('contain', 'Job Title: Must only contain letters and space')
        cy.url().should('include', '/add-job-role');
    });

    it("should display error - job specification input empty", () => {
        cy.visit("http://localhost:7999/add-job-role");
        cy.get('h4').should('contain', 'Add a Job Role').click();
        cy.get('[data-cy="jobTitleInput"]').type('Senior Test Engineer').should('have.value','Senior Test Engineer');
        cy.get('[data-cy="jobBandDropdown"]').select('Senior Associate').should('have.value', '5');
        cy.get('[data-cy="jobCapabDropdown"]').select('Engineering').should('have.value', '3');
        cy.get('[data-cy="jobDiscipDropdown"]').select('Testing & Quality Assurance').should('have.value', '4');
        cy.get('[data-cy="jobCompInput"]').type('Developing and executing functional automated and manual tests to help the team deliver working application software that meets user needs')
        .should('have.value', 'Developing and executing functional automated and manual tests to help the team deliver working application software that meets user needs');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="alert"]').should('contain', 'Job Specification: Must be longer than 0 characters and shorter than 5000 characters')
        cy.url().should('include', '/add-job-role');
    });

    it("should display error - job competencies input empty", () => {
        cy.visit("http://localhost:7999/add-job-role");
        cy.get('h4').should('contain', 'Add a Job Role').click();
        cy.get('[data-cy="jobTitleInput"]').type('Senior Test Engineer').should('have.value','Senior Test Engineer');
        cy.get('[data-cy="jobBandDropdown"]').select('Senior Associate').should('have.value', '5');
        cy.get('[data-cy="jobCapabDropdown"]').select('Engineering').should('have.value', '3');
        cy.get('[data-cy="jobDiscipDropdown"]').select('Testing & Quality Assurance').should('have.value', '4');
        cy.get('[data-cy="jobSpecInput"]').type('Good technical ability and can assist with test automation tasks and has a desire to develop their test automation skills further. Understanding of different delivery methodologies and how testing fits within them.')
        .should('have.value', 'Good technical ability and can assist with test automation tasks and has a desire to develop their test automation skills further. Understanding of different delivery methodologies and how testing fits within them.');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="alert"]').should('contain', 'Job Competencies: Must be longer than 0 characters and shorter than 500 characters');
        cy.url().should('include', '/add-job-role');
    });

    it("should add a new job role", () => {
        cy.visit("http://localhost:7999/add-job-role");
        cy.get('h4').should('contain', 'Add a Job Role').click();
        cy.get('[data-cy="jobTitleInput"]').type('Senior Test Engineer').should('have.value','Senior Test Engineer' );
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

    it("checks the added role is in job roles list", () =>{
        cy.get('[data-cy=viewJobRoles]').should('contain', 'View Job Roles').click();
        cy.get('[data-cy="jobRoleList"]').should('contain', 'Senior Test Engineer (Senior Associate').click();
    })
});