describe("Adding job capability", () => {
    it("should display errors - invalid job capability format", () => {
        cy.visit("http://localhost:7999/add-job-capability");
        cy.get('h4').should('contain', 'Add a Job Capability').click();
        cy.get('[data-cy="jobCapabInput"]').type('!^%').should('have.value','!^%');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="alert"]').should('contain', 'Job Capability must only contain letters and space')
        cy.url().should('include', '/add-job-capability');
    })
    
    it("should add a new job capability", () => {
        cy.visit("http://localhost:7999/add-job-capability");
        cy.get('h4').should('contain', 'Add a Job Capability').click();
        cy.get('[data-cy="jobCapabInput"]').type('Systems Test').should('have.value','Systems Test');
        cy.get('[data-cy="submitBtn"]').click();
    });
});