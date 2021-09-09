describe("Adding job band and band training url", () => {
    it("should add a new job band", () => {
        cy.visit("http://localhost:7999/add-job-band");
        cy.get('h4').should('contain', 'Add a Job Band').click();
        cy.get('[data-cy="jobBandInput"]').type('Senior Consultant').should('have.value','Senior Consultant');
        cy.get('[data-cy="jobBandTrainingInput"]').type('https://www.howToBeABetterConsultant.com').should('have.value', 'https://www.howToBeABetterConsultant.com');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('h4').should('contain', 'Add Job Band Complete');
        cy.get('[data-cy="homePageLink"]').click();
        cy.url().should('include', '/index');
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