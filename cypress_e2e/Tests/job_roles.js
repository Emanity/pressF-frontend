const { expect } = require("chai");

describe("Getting Job Roles view", function(){
    it("connects to display Job Roles", function(){
        cy.visit("http://localhost:7999");
        cy.get('#jobRoles-Button').should('contain', 'View Job Roles').click();
        cy.url().should('include', '/job-roles');
    });
});

describe("Viewing available job role's summary", function(){
    it("displays available job role's summary", function(){
        cy.get('#list2').should('contain', 'Innovation Lead').click();
        cy.get('a[href*="/job-role-details/2"]').should('contain', 'View Job Role Details').click();
    });
});

describe("Viewing job role's details", function(){
    it("displays job role's details", function(){
        cy.get('#card-text').should('contain', 'Innovation Lead');
        cy.get('#jobRoleDetails').should('contain', 'Job Role Details').click();
        cy.get('#jobCompetencies').should('contain', 'Job Competencies').click();
        cy.get('#jobCompLink').should('be.visible');
        cy.get('#jobSpecification').should('contain', 'Job Specification').click();
        cy.get('#jobSpecLink').should('be.visible');
    });
});

