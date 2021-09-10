describe("Adding a job band and band training url", () => {
    it("should display errors - invalid job band", () => {
        cy.visit("http://localhost:7999/login");
        cy.url().should('include', '/login');
        cy.get('[data-cy=loginHeading]').should('contain', 'Login');
        cy.get('[data-cy="emailInput"]').type('admin@kainos.com').should('have.value', 'admin@kainos.com');
        cy.get('[data-cy="passwdInput"]').type('password').should('have.value', 'password');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="user"]').click();
        cy.get('[data-cy="addband"]').click();
        cy.visit("http://localhost:7999/add-job-band");
        cy.get('h4').should('contain', 'Add a Job Band').click();
        cy.get('[data-cy="jobBandInput"]').type('!^%').should('have.value','!^%');
        cy.get('[data-cy="jobBandTrainingInput"]').type('https://www.howToBeABetterConsultant.com').should('have.value', 'https://www.howToBeABetterConsultant.com');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="alert"]').should('contain', 'Job Band must only contain letters and space')
        cy.url().should('include', '/add-job-band');
    })
});

describe("Adding a job band and band training with invalid url", () => {
    it("should display errors - invalid job band training url", () => {
        cy.visit("http://localhost:7999/login");
        cy.url().should('include', '/login');
        cy.get('[data-cy=loginHeading]').should('contain', 'Login');
        cy.get('[data-cy="emailInput"]').type('admin@kainos.com').should('have.value', 'admin@kainos.com');
        cy.get('[data-cy="passwdInput"]').type('password').should('have.value', 'password');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="user"]').click();
        cy.get('[data-cy="addband"]')
        cy.visit("http://localhost:7999/add-job-band");
        cy.get('h4').should('contain', 'Add a Job Band').click();
        cy.get('[data-cy="jobBandInput"]').type('Senior Consultant Test').should('have.value','Senior Consultant Test');
        cy.get('[data-cy="jobBandTrainingInput"]').type('howtobeabetterconsultant').should('have.value', 'howtobeabetterconsultant');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="alert"]').should('contain', 'Job Band Training: Must be a URL')
        cy.url().should('include', '/add-job-band');
    })
});