const { expect } = require("chai");

describe("Loading home page", function(){
    it("connects to index.html", function(){
        cy.visit("http://localhost:7999");
        cy.url().should('include', '/');
    });
});

describe("Getting Job Roles view", function(){
    it("connects to display Job Roles", function(){
        cy.visit("http://localhost:7999");
        cy.get('.btn').contains('View Job Roles').click();
        cy.url().should('include', '/job-roles');
    });
});


