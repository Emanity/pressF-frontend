describe("Adding a job band and band training url", () => {
    it("should display errors - invalid job band", () => {
        cy.visit("http://localhost:7999/add-job-band");
        cy.get('h4').should('contain', 'Add a Job Band').click();
        cy.get('[data-cy="jobBandInput"]').type('!^%').should('have.value','!^%');
        cy.get('[data-cy="jobBandTrainingInput"]').type('https://www.howToBeABetterConsultant.com').should('have.value', 'https://www.howToBeABetterConsultant.com');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="alert"]').should('contain', 'Job Band must only contain letters and space')
        cy.url().should('include', '/add-job-band');
    })

    it("should display errors - invalid url", () => {
        cy.visit("http://localhost:7999/add-job-band");
        cy.get('h4').should('contain', 'Add a Job Band').click();
        cy.get('[data-cy="jobBandInput"]').type('Senior Consultant Test').should('have.value','Senior Consultant Test');
        cy.get('[data-cy="jobBandTrainingInput"]').type('howtobeabetterconsultant').should('have.value', 'howtobeabetterconsultant');
        cy.get('[data-cy="submitBtn"]').click();
        cy.get('[data-cy="alert"]').should('contain', 'Job Band Training: Must be a URL')
        cy.url().should('include', '/add-job-band');
    })
    
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
});