/// <reference types="cypress" />
import 'cypress-file-upload';

const CLIENT_NAME = 'client';
const AUTH2_NAME = `test-oauth2-${Math.floor(Math.random() * 9999) + 1000}`;

context('Test OAuth2 Clients', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Client', () => {
    cy.navigateTo('Configuration', 'OAuth2 Clients');

    cy.contains('ui5-button', 'Create').click();

    cy.contains('Advanced').click();

    cy.get('ui5-dialog')
      .find('[aria-label="OAuth2Client name"]:visible')
      .find('input')
      .click()
      .type(AUTH2_NAME, { force: true });

    cy.get('[data-testid="spec.clientName"]')
      .find('input')
      .click()
      .clear()
      .type(CLIENT_NAME);

    cy.get(`ui5-checkbox[text="ID Token"]`).click();

    cy.get(`ui5-checkbox[text="Authorization Code"]`).click();

    cy.get(`ui5-checkbox[text="Implicit"]`).click();

    cy.get(`ui5-checkbox[text="Code"]`).click();

    cy.get('[data-testid="spec.scope"]')
      .find('input')
      .click()
      .clear()
      .type('openid', {
        //for unknown reason Cypress can lose 'e' when typing openid, therefore slowing down the typing
        delay: 100,
        waitForAnimations: true,
      });

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();
  });

  it('Checking details', () => {
    cy.contains(CLIENT_NAME).should('be.visible');

    cy.contains('id_token').should('be.visible');

    cy.contains('authorization_code').should('be.visible');

    cy.contains('implicit').should('be.visible');

    cy.contains('code').should('be.visible');

    cy.contains('openid').should('be.visible');

    cy.contains('client_id').should('be.visible');

    cy.contains('client_secret').should('be.visible');

    cy.contains('discontinued').should('be.visible');
  });

  it('Edit client', () => {
    cy.contains('ui5-button', 'Edit').click();

    cy.get(`ui5-checkbox[text="ID Token"]`).click();

    cy.get(`ui5-checkbox[text="Authorization Code"]`).click();

    cy.get('[value="openid"]')
      .find('input')
      .click()
      .clear()
      .type('read');

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();
  });

  it('Checking updates details', () => {
    cy.contains('code').should('be.visible');

    cy.contains('implicit').should('be.visible');

    cy.contains('read').should('be.visible');

    cy.contains('client_id').should('be.visible');

    cy.contains('client_secret').should('be.visible');
  });

  it('Inpect list', () => {
    cy.inspectList('OAuth2 Clients', AUTH2_NAME);
  });

  it('Check deprecation note in Cluster Overview', () => {
    cy.getLeftNav()
      .contains('Back To Cluster Details')
      .click();

    cy.contains('Ory Hydra Deprecation').should('be.visible');

    cy.contains('ui5-panel', 'OAuth2Clients').within(_$genericList => {
      cy.get('ui5-combobox[placeholder="Search"]')
        .find('input')
        .click()
        .type(AUTH2_NAME);

      cy.contains('ui5-link', AUTH2_NAME).should('be.visible');

      cy.get('ui5-button[data-testid="delete"]').click();
    });

    cy.get(`[header-text="Delete O Auth Client"]`)
      .find('[data-testid="delete-confirmation"]')
      .click();

    cy.wait(1000);

    cy.contains('ui5-link', AUTH2_NAME).should('not.exist');

    cy.contains('Ory Hydra Deprecation').should('not.exist');
  });
});
