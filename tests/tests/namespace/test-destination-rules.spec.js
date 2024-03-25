/// <reference types="cypress" />
import 'cypress-file-upload';

const DR_NAME =
  'test-dr-' +
  Math.random()
    .toString()
    .substr(2, 8);
const HOST = 'ratings.prod.svc.cluster.local';
const SELECTOR = 'selector=selector-value';
const BALANCER = 'simple';
const SIMPLE = 'LEAST_CONN';

context('Test Destination Rules', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Destination Rule', () => {
    cy.navigateTo('Istio', 'Destination Rules');

    cy.openCreate();

    cy.get('[aria-label="DestinationRule name"]:visible')
      .find('input')
      .type(DR_NAME, { force: true });

    cy.get('[data-testid="spec.host"]:visible')
      .find('input')
      .click()
      .type(HOST, { force: true });

    cy.saveChanges('Create');

    cy.getMidColumn()
      .contains('ui5-title', DR_NAME)
      .should('be.visible');
  });

  it('Check Destination Rule details', () => {
    cy.getMidColumn()
      .contains(HOST)
      .should('be.visible');

    cy.getMidColumn()
      .contains('Subsets')
      .should('not.exist');

    cy.getMidColumn()
      .contains('Workload Selector')
      .should('not.exist');
  });

  it('Edit Destination Rule', () => {
    cy.inspectTab('Edit');

    cy.get('[aria-label="DestinationRule name"]:visible')
      .find('input')
      .should('have.attr', 'readonly');

    // selector
    cy.get('[placeholder="Enter key"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .type('selector', { force: true });

    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .first()
      .type('selector-value', { force: true });

    // traffic policy
    // could be uncomment after resolving: https://github.com/kyma-project/busola/issues/2088
    // cy
    //   .get('[aria-label="expand Traffic Policy"]:visible', { log: false })
    //   .click();

    // cy
    //   .get('[aria-label="expand Load Balancer"]:visible', { log: false })
    //   .click();

    // cy
    //   .get('[aria-label="Combobox input"]:visible', { log: false })
    //   .type(BALANCER);

    // cy
    //   .get('[aria-label="Combobox input"]', {
    //     log: false,
    //   })
    //   .eq(1)
    //   .type(SIMPLE);

    cy.saveChanges('Edit');
    cy.getMidColumn().inspectTab('View');

    // changed details
    cy.getMidColumn().contains(SELECTOR);
    // After resolving: https://github.com/kyma-project/busola/issues/2088 we need to add checking loadBalancer value
  });

  it('Check the Destination Rule list', () => {
    cy.inspectList(DR_NAME);
  });
});
