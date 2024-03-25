/// <reference types="cypress" />
import 'cypress-file-upload';
import { chooseComboboxOption } from '../../support/helpers';

const SE_NAME =
  'test-' +
  Math.random()
    .toString()
    .substr(2, 8);

const RESOLUTION = 'STATIC';
const LOCATION = 'MESH_EXTERNAL';
const HOST = 'test.com';
const ADDRESS = '192.192.192.192/24';
const WORKLOAD_SELECTOR_LABEL = 'test=selector-value';

context('Test Service Entries', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Service Entry', () => {
    cy.navigateTo('Istio', 'Service Entries');

    cy.openCreate();

    // Name
    cy.get('[aria-label="ServiceEntry name"]:visible')
      .find('input')
      .click()
      .type(SE_NAME, { force: true });

    // Hosts
    cy.get('[aria-label="expand Hosts"]:visible', { log: false }).click();

    cy.get('[data-testid="spec.hosts.0"]:visible')
      .find('input')
      .type(HOST, { force: true });

    chooseComboboxOption('[data-testid="spec.resolution"]', RESOLUTION);

    chooseComboboxOption('[data-testid="spec.location"]', LOCATION);

    cy.get('[aria-label="expand Addresses"]:visible', { log: false }).click();

    cy.get('[placeholder="For example, 127.0.0.1"]:visible', {
      log: false,
    })
      .find('input')
      .type(ADDRESS, { force: true });

    cy.get('[placeholder="Enter key"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .type('test', { force: true });

    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .first()
      .type('selector-value', { force: true });

    cy.saveChanges('Create');

    cy.getMidColumn()
      .contains('ui5-title', SE_NAME)
      .should('be.visible');
  });

  it('Check the Service Entry details', () => {
    cy.getMidColumn()
      .should('include.text', RESOLUTION)
      .and('include.text', LOCATION)
      .and('include.text', HOST)
      .and('include.text', ADDRESS);

    cy.getMidColumn().contains(WORKLOAD_SELECTOR_LABEL);
  });

  it('Check the Service Entries list', () => {
    cy.inspectList(SE_NAME);
    cy.contains(RESOLUTION);
  });
});
