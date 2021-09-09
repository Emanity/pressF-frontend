describe("Adding job capability", () => {
    it("should add a new job capability", () => {
        cy.visit("http://localhost:7999/add-job-capability");
        cy.get('h4').should('contain', 'Add a Job Capability').click();
        cy.get('[data-cy="jobCapabInput"]').type('Systems Test').should('have.value','Systems Test');
        cy.get('[data-cy="submitBtn"]').click();
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