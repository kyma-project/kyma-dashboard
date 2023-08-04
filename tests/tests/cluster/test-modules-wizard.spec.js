/// <reference types="cypress" />

context('Test Modules Wizard', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
  });

  it('Check wizard view and add module', () => {
    cy.contains('Add your module under').should('be.visible');

    cy.contains('Add Module').click();

    cy.contains('Kyma Modules').should('be.visible');

    cy.contains('keda').click();

    cy.get('[aria-label="Module channel overwrite"]:visible').click();

    cy.contains('fast').click();

    cy.get('[role="dialog"]')
      .contains('button', 'Next step')
      .click();

    cy.contains('Summary').should('be.visible');

    cy.get('[role="dialog"]')
      .contains('button', 'Upload')
      .click();
  });

  it('Inspect updates', () => {
    cy.contains('keda').should('be.visible');

    cy.contains('fast').should('be.visible');

    cy.get('[role=status]').should('be.visible');
  });
});
