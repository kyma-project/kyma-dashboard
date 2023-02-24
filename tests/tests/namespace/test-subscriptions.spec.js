/// <reference types="cypress" />
import 'cypress-file-upload';

const SERVICE_NAME = 'service';
const APPLICATION_NAME = 'a-busola-test-3690';
const SUBSCRIPTION_NAME = 'test-subscription';
const SUBSCRIPTION_EVENT_NAME = 'order.cancelled';
const SUBSCRIPTION_EVENT_VERSION = 'v1';
const SUBSCRIPTION_SINK =
  'sap.kyma.custom.a-busola-test-3690.order.cancelled.v1';
const SUBSCRIPTION_EVENT_VERSION_2 = 'v4';
const SUBSCRIPTION_SINK_2 =
  'sap.kyma.custom.a-busola-test-3690.order.cancelled.v4';

context('Test Subscriptions', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create Services', () => {
    cy.wait(500);
    cy.navigateTo('Discovery and Network', 'Services');

    cy.contains('Create Service').click();

    // name
    cy.get('[ariaLabel="Service name"]:visible')
      .click()
      .type(SERVICE_NAME);

    // add port
    cy.contains('Add').click();

    cy.get('[role="dialog"]')
      .contains('button', 'Create')
      .click();
  });

  it('Create Subscription', () => {
    cy.wait(500);
    cy.navigateTo('Configuration', 'Subscriptions');

    cy.contains('Create Subscription').click();

    // name
    cy.get('[arialabel="Subscription name"]:visible')
      .click()
      .type(SUBSCRIPTION_NAME);

    // service
    cy.get('[aria-label="Choose Service"]:visible')
      .click()
      .type(SERVICE_NAME);

    //add Filters
    cy.contains('Add').click();

    // application
    cy.get('[aria-label="Choose Application"]:visible')
      .click()
      .type(APPLICATION_NAME);
    cy.contains(APPLICATION_NAME).click({ force: true });

    // event name
    cy.get('[placeholder="For example, order.cancelled"]:visible')
      .click()
      .type(SUBSCRIPTION_EVENT_NAME);

    // event version
    cy.get('[placeholder="For example, v1"]:visible')
      .click()
      .type(SUBSCRIPTION_EVENT_VERSION);
    cy.contains(SUBSCRIPTION_EVENT_VERSION).click({ force: true });

    cy.get('[role="dialog"]')
      .contains('button', 'Create')
      .click();
  });

  it('Inspect details', () => {
    // Sink
    cy.contains(SUBSCRIPTION_SINK);
  });

  it('Edit Subscriptions', () => {
    cy.contains('Edit').click();

    // Sink
    cy.contains(SUBSCRIPTION_SINK);

    // application
    cy.get('[aria-label="Choose Application"]:visible')
      .click()
      .type(APPLICATION_NAME);
    cy.contains(APPLICATION_NAME).click({ force: true });

    // event name
    cy.get('[placeholder="For example, order.cancelled"]:visible')
      .click()
      .type(SUBSCRIPTION_EVENT_NAME);

    // event version
    cy.get('[placeholder="For example, v1"]:visible')
      .click()
      .type(SUBSCRIPTION_EVENT_VERSION_2);
    cy.contains(SUBSCRIPTION_EVENT_VERSION).click({ force: true });

    cy.get('[role="dialog"]')
      .contains('button', 'Update')
      .click();
  });

  it('Checking changes', () => {
    // Sink
    cy.contains(SUBSCRIPTION_SINK_2);
  });

  it('delete created service', () => {
    cy.navigateTo('Discovery and Network', 'Services');

    cy.get('[role="search"] [aria-label="search-input"]').type(SERVICE_NAME);

    cy.get('tbody tr [aria-label="Delete"]').click({ force: true });

    cy.contains('button', 'Delete')
      .filter(':visible', { log: false })
      .click({ force: true });
  });
});
