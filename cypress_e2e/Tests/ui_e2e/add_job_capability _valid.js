describe("Adding job capability", () => {
    it("should add a new job capability", () => {
        cy.visit("http://localhost:7999/login");
        cy.url().should('include', '/login');
        cy.get('[data-cy=loginHeading]').should('contain', 'Login');
        cy.get('[data-cy="emailInput"]').type('admin@kainos.com').should('have.value', 'admin@kainos.com');
        cy.get('[data-cy="passwdInput"]').type('password').should('have.value', 'password');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="user"]').click();
        cy.get('[data-cy="addcapability"]').click();
        cy.visit("http://localhost:7999/add-job-capability");
        cy.get('h4').should('contain', 'Add a Job Capability').click();
        cy.get('[data-cy="jobCapabInput"]').type('Systems Test').should('have.value','Systems Test');
        cy.get('[data-cy="submitBtn"]').click();
    });
});