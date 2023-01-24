/// <reference types="cypress" />

context('Test Extensions view', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  // Workloads
  it('Check Workloads Extensions', () => {
    cy.getLeftNav()
      .contains('Workloads')
      .click();

    cy.checkExtension('Functions');
  });

  // Discovery and Network
  it('Check Discovery and Network Extensions', () => {
    cy.getLeftNav()
      .contains('Discovery and Network')
      .click();

    cy.checkExtension('API Rules');
  });

  // Istio
  it('Check Istio Extensions', () => {
    cy.getLeftNav()
      .contains('Istio')
      .click();

    cy.checkExtension('Authorization Policies');
    cy.checkExtension('Destination Rules');
    cy.checkExtension('Gateways');
    cy.checkExtension('Service Entries');
    cy.checkExtension('Sidecars');
    cy.checkExtension('Virtual Services');
  });

  // Configuration
  it('Check Configuration Extensions', () => {
    cy.getLeftNav()
      .contains('Configuration')
      .click();

    cy.checkExtension('DNS Entries');
    cy.checkExtension('DNS Providers');
    cy.checkExtension('Issuers');
  });
});
