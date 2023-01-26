/// <reference types="cypress" />
import 'cypress-file-upload';

const CLIENT_NAME = 'test-oauth2-client';
const AUTH2_NAME = 'enter-a-nice-name-to-test-oauth2';

context('Test OAuth2 Clients', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Client', () => {
    cy.navigateTo('Configuration', 'OAuth2 Clients');

    cy.contains('Create OAuth2 Client').click();

    cy.contains('Advanced').click();

    cy.get('[arialabel="OAuth2Client name"]')
      .clear()
      .type(AUTH2_NAME);

    cy.get('[data-testid="spec.clientName"]')
      .clear()
      .type(CLIENT_NAME);

    cy.contains('label', 'ID Token').click();

    cy.contains('label', 'Authorization Code').click();

    cy.contains('label', 'Implicit').click();

    cy.contains('label', 'Code').click();

    cy.get('[data-testid="spec.scope"]')
      .clear()
      .type('openid', {
        //for unknown reason Cypress can lose 'e' when typing openid, therefore slowing down the typing
        delay: 100,
        waitForAnimations: true,
      });

    cy.contains('label', 'Scope').click();

    cy.get('[role="dialog"]')
      .contains('button', 'Create')
      .click();
  });

  it('Checking details', () => {
    cy.contains(CLIENT_NAME).should('be.visible');

    cy.contains('id_token').should('be.visible');

    cy.contains('authorization_code').should('be.visible');

    cy.contains('implicit').should('be.visible');

    cy.contains('code').should('be.visible');

    cy.contains('openid').should('be.visible');

    // don't check Secret section, as Secret may not be created yet
    // cy
    //   .contains('client_id')
    //   .should('be.visible');

    // cy
    //   .contains('client_secret')
    //   .should('be.visible');
  });

  it('Edit client', () => {
    cy.contains('Edit').click();

    cy.contains('label', 'ID Token').click();

    cy.contains('label', 'Authorization Code').click();

    cy.get('[value="openid"]')
      .clear()
      .type('email{downarrow}');

    cy.get('[role="dialog"]')
      .contains('button', 'Update')
      .click();
  });

  it('Checking updates details', () => {
    cy.contains('code').should('be.visible');

    cy.contains('implicit').should('be.visible');

    cy.contains('email').should('be.visible');

    // don't check Secret section, as Secret may not be created yet
    // cy
    //   .contains('client_id')
    //   .should('be.visible');

    // cy
    //   .contains('client_secret')
    //   .should('be.visible');
  });

  it('Inpect list', () => {
    cy.inspectList('OAuth2 Clients', AUTH2_NAME);
  });
});
