/// <reference types="cypress" />

context('Test Extensions view', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
  });

  // Integration
  it('Check Integration Extensions', () => {
    cy.getLeftNav()
      .contains('Integration')
      .click();

    cy.checkExtension('Applications');
  });

  // Observability
  it('Check Observability Extensions', () => {
    cy.getLeftNav()
      .contains('Observability')
      .click();

    cy.checkExtension('Log Parsers');
    cy.checkExtension('Log Pipelines');
  });
});
