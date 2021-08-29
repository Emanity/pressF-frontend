const { expect } = require("chai");

describe("Viewing available job role's details", function(){
    it("displays available job role's details", function(){
        cy.visit("http://localhost:7999/job-roles");
        cy.url().should('include', '/job-roles');
        cy.get('#accordion2').contains("Innovation Lead").click();
        cy.get('a[href*="/job-spec/2"]').contains('View Job Role Details').click()
    });
});