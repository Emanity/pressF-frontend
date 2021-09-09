const { expect } = require("chai");

describe("Getting Job Roles view", () => {
    it("should connect to display Job Roles", () => {
        cy.visit("http://localhost:7999");
        cy.get('[data-cy=viewJobRoles]').should('contain', 'View Job Roles').click();
        cy.url().should('include', '/job-roles');
    });
});

describe("Viewing available job role's summary", () => {
    it("should display available job role's summary", () => {
        cy.visit('http://localhost:7999/job-roles');
        cy.get('[data-cy="jobSummary2"]').should('contain', 'Innovation Lead').click();
        cy.get('[data-cy=jobRoleDetailsLink2]').should('contain', 'View Job Role Details').click();
    });
});

describe("Viewing job role's details", () => {
    it("should display job role's details", () => {
        cy.visit('http://localhost:7999/job-role-details/2');
        cy.get('[data-cy=jobTitleCard]').should('contain', 'Innovation Lead');
        cy.get('[data-cy=jobRoleDetails]').should('contain', 'Job Role Details').click();
        cy.get('[data-cy=jobCompetencies]').should('contain', 'Job Competencies').click();
        cy.get('[data-cy=jobCompLink]').should('be.visible');
        cy.get('[data-cy=jobSpecification]').should('contain', 'Job Specification').click();
        cy.get('[data-cy=jobSpecLink]').should('be.visible');
        cy.get('[data-cy=jobRoleResponsibilities]').should('contain', 'Job Role Responsibilities').click();
    });
});