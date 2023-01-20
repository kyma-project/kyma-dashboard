/// <reference types="cypress" />
import 'cypress-file-upload';

const SB_NAME =
  'test-' +
  Math.random()
    .toString()
    .substr(2, 8);

const SI_NAME = 'objectstore';
const PARAMETER_KEY = 'test-key';
const PARAMETER_VALUE = 'test-value';
const SECRET_NAME = 'serverless-registry-config-default';
const SECRET_KEY = '.dockerconfigjson';

context('Test Service Bindings', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Service Binding', () => {
    cy.navigateTo('Service Management', 'Service Bindings');

    cy.contains('Create Service Binding').click();

    cy.contains('Advanced').click();

    // Name
    cy.get('[arialabel="BTP Service Binding name"]:visible', {
      log: false,
    }).type(SB_NAME);

    // Service Instance Name
    cy.get('[aria-label="Choose Service Binding"]:visible', {
      log: false,
    }).type(SI_NAME);

    // Parameters
    cy.get('[aria-label="expand Parameters"]:visible', { log: false }).click();
    cy.get('[placeholder="Enter key"]:visible', { log: false }).type(
      PARAMETER_KEY,
    );
    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .first()
      .type(PARAMETER_VALUE);

    //Parameters from Secrets
    cy.get('[aria-label="Choose Secret"]:visible', { log: false }).type(
      SECRET_NAME,
    );
    cy.get('[placeholder="Choose Secret Key"]:visible', { log: false }).type(
      SECRET_KEY,
    );

    // Create
    cy.get('[role="dialog"]')
      .contains('button', 'Create')
      .click();
  });
});
