const { expect } = require("chai");

describe("Getting Job Roles view", function(){
    it("connects to display Job Roles", function(){
        cy.visit("http://localhost:7999");
        cy.get('.btn').contains('View Job Roles').click();
        cy.url().should('include', '/job-roles');
    });
});

describe("Viewing available job role's summary", function(){
    it("displays available job role's summary", function(){
        cy.get('#list2').contains('Innovation Lead').click();
        cy.get('a[href*="/job-role-details/2"]').contains('View Job Role Details').click();
    });
});

describe("Viewing job role's details", function(){
    it("displays job role's details", function(){
        cy.get('#card-text').contains('Innovation Lead');
        cy.get('#jobRoleDetails').contains('Job Role Details').click();
        cy.get('#jobCompetencies').should('have.text', 'Job Competencies').click();
        cy.get('#jobCompLink').should('be.visible');
        cy.get('#jobSpecification').should('have.text', 'Job Specification').click();
        cy.get('#jobSpecLink').should('be.visible');
    });
});

