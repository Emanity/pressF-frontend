const { expect } = require("chai");

describe("Loading home page", function(){
    it("connects to index.html", function(){
        cy.visit("http://localhost:7999");
        cy.url().should('include', '/');
    });
});




