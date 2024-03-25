/// <reference types="cypress" />
import 'cypress-file-upload';
import { chooseComboboxOption } from '../../support/helpers';

const SIDECAR_NAME =
  'test-' +
  Math.random()
    .toString()
    .substr(2, 8);

const PORT_NUMBER = '81';
const EGRESS_NAME = 'egresshttp';
const IGRES_NAME = 'somename';
const PORT_PROTOCOL = 'HTTP';
const EGRESS_HOST = 'testhost/*';
const DEFAULT_ENDPOINT = '127.0.0.1:8080';

context('Test Sidecars', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Sidecar', () => {
    cy.navigateTo('Istio', 'Sidecars');

    cy.openCreate();

    // Name
    cy.get('[aria-label="Sidecar name"]:visible')
      .find('input')
      .click()
      .type(SIDECAR_NAME, { force: true });

    // Egress
    cy.get('[aria-label="expand Egress"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('[aria-label="expand Port"]:visible', { log: false }).click();

    cy.get('[placeholder="Enter the port number"]:visible', {
      log: false,
    })
      .find('input')
      .type(PORT_NUMBER, { force: true });

    cy.get('[aria-label="Sidecar name"]:visible')
      .find('input')
      .filterWithNoValue()
      .click()
      .type(EGRESS_NAME, { force: true });

    chooseComboboxOption(
      '[data-testid="spec.egress.0.port.protocol"]',
      PORT_PROTOCOL,
    );

    cy.get('[aria-label="expand Hosts"]:visible', { log: false }).click();

    cy.get('[placeholder="For example, *.api.mydomain.com"]:visible', {
      log: false,
    })
      .find('input')
      .type(EGRESS_HOST, { force: true });

    cy.get('[aria-label="expand Egress"]:visible', { log: false })
      .first()
      .click();

    // Ingress
    cy.get('[aria-label="expand Ingress"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('[aria-label="expand Port"]:visible', { log: false }).click();

    cy.get('[placeholder="Enter the port number"]:visible', {
      log: false,
    })
      .find('input')
      .type(PORT_NUMBER, { force: true });

    chooseComboboxOption(
      '[data-testid="spec.ingress.0.port.protocol"]',
      PORT_PROTOCOL,
    );

    cy.get('[aria-label="Sidecar name"]:visible')
      .find('input')
      .filterWithNoValue()
      .click()
      .type(IGRES_NAME, { force: true });

    cy.get('[placeholder="For example, 127.0.0.1:PORT"]:visible', {
      log: false,
    })
      .find('input')
      .type(DEFAULT_ENDPOINT, { force: true });

    cy.saveChanges('Create');

    cy.getMidColumn()
      .contains('ui5-title', SIDECAR_NAME)
      .should('be.visible');
  });

  it('Check the Sidecar details', () => {
    cy.getMidColumn().contains(PORT_NUMBER);
    cy.getMidColumn().contains(EGRESS_NAME);
    cy.getMidColumn().contains(IGRES_NAME);
    cy.getMidColumn().contains(PORT_PROTOCOL);
    cy.getMidColumn().contains(EGRESS_HOST);
    cy.getMidColumn().contains(DEFAULT_ENDPOINT);
  });

  it('Check the Sidecars list', () => {
    cy.inspectList(SIDECAR_NAME);
  });
});
