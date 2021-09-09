const { expect } = require("chai");

describe("Loading home page", function(){
    it("connects to index.html", function(){
        cy.visit("http://localhost:7999");
        cy.url().should('include', '/');
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