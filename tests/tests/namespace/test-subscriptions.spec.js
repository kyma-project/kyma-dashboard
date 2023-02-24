/// <reference types="cypress" />
import 'cypress-file-upload';

const SERVICE_NAME = 'service';
const APPLICATION_NAME = 'a-busola-test-3690';
const SUBSCRIPTION_NAME = 'test-subscription';
const SUBSCRIPTION_EVENT_NAME = 'order.cancelled';
const SUBSCRIPTION_EVENT_VERSION = 'v1';
const SUBSCRIPTION_EVENT_TYPE = 'http://service.baby-yoda.svc.cluster.local';
const SUBSCRIPTION_SINK =
  'sap.kyma.custom.a-busola-test-3690.order.cancelled.v1';
const SUBSCRIPTION_SEC_EVENT_VERSION = 'v2';
const SUBSCRIPTION_SEC_SINK =
  'sap.kyma.custom.a-busola-test-3690.order.cancelled.v2';

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
  });

  it('Create Subscription', () => {
    cy.wait(500);
    cy.navigateTo('Configuration', 'Subscriptions');

    cy.contains('Create subscription').click();

    // name
    cy.get('[arialabel="Subscription name""]:visible')
      .click()
      .type(SUBSCRIPTION_NAME);

    // service
    cy.get('[ariaLabel="Service name"]:visible')
      .click()
      .type(SERVICE_NAME);

    //add Filters
    cy.contains('Add').click();

    // application
    cy.get('[aria-label="Choose Application"]:visible')
      .click()
      .type(APPLICATION_NAME);

    // event name
    cy.get('[placeholder="For example, order.cancelled"]:visible')
      .click()
      .type(SUBSCRIPTION_EVENT_NAME);

    // event version
    cy.get('[placeholder="For example, v1"]:visible')
      .click()
      .type(SUBSCRIPTION_EVENT_VERSION);

    // Sink
    cy.contains(SUBSCRIPTION_SINK);

    // event type
    cy.contains(SUBSCRIPTION_EVENT_TYPE);
  });

  it('Inspect details', () => {
    // Sink
    cy.contains(SUBSCRIPTION_SINK);
    // event type
    cy.contains(SUBSCRIPTION_EVENT_TYPE);

    cy.get('[role=status]').should('have.text', 'Error');
  });

  it('Edit DNS Provider', () => {
    cy.contains('Edit').click();

    // Sink
    cy.contains(SUBSCRIPTION_SINK);

    // event type
    cy.contains(SUBSCRIPTION_EVENT_TYPE);

    // application
    cy.get('[aria-label="Choose Application"]:visible')
      .click()
      .type(APPLICATION_NAME);

    // event name
    cy.get('[placeholder="For example, order.cancelled"]:visible')
      .click()
      .type(SUBSCRIPTION_EVENT_NAME);

    // event version
    cy.get('[placeholder="For example, v1"]:visible')
      .click()
      .type(SUBSCRIPTION_SINK_2);

    // Sink
    cy.contains(SUBSCRIPTION_SINK_2);
  });

  it('Inspect list', () => {
    // Sink
    cy.contains(SUBSCRIPTION_SINK_2);

    // event type
    cy.contains(SUBSCRIPTION_EVENT_TYPE);
  });
});
