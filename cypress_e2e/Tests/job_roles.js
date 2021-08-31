const { expect } = require("chai");

describe("Getting Job Roles view", function(){
    it("connects to display Job Roles", function(){
        cy.visit("http://localhost:7999");
        cy.get('.btn').contains('View Job Roles').click();
        cy.url().should('include', '/job-roles');
    });
});

describe("Viewing available job role's details", function(){
    it("displays available job role's details", function(){
        cy.visit("http://localhost:7999/job-roles");
        cy.url().should('include', '/job-roles');
        cy.get('#accordion2').contains("Innovation Lead").click();
        cy.get('a[href*="/job-roles/2"]').contains('View Job Role Details').click()
    });
});