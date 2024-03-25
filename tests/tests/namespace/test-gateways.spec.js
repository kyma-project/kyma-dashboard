/// <reference types="cypress" />
import 'cypress-file-upload';
import { chooseComboboxOption } from '../../support/helpers';

const GATEWAY_NAME =
  'test-gateway-' +
  Math.random()
    .toString()
    .substr(2, 8);

const SERVER_NAME = GATEWAY_NAME + '-server';
const PORT_NUMBER = 80;
const PORT_PROTOCOL = 'HTTP';
const SELECTOR = 'selector=selector-value';

const KYMA_GATEWAY_CERTS = 'kyma-gateway-certs';

context('Test Gateways', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create Gateway', () => {
    cy.navigateTo('Istio', 'Gateways');

    cy.contains('ui5-button', 'Create').click();

    // name
    cy.get('ui5-dialog')
      .find('[aria-label="Gateway name"]:visible')
      .find('input')
      .type(GATEWAY_NAME, { force: true });

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

    // server
    cy.get('[aria-label="expand Servers"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('[data-testid="spec.servers.0.port.number"]:visible')
      .find('input')
      .type(PORT_NUMBER);

    chooseComboboxOption(
      '[data-testid="spec.servers.0.port.protocol"]',
      PORT_PROTOCOL,
    );

    cy.get('[aria-label^="Gateway name"]:visible', { log: false })
      .find('input')
      .eq(1)
      .type(SERVER_NAME, { force: true });

    // hosts
    cy.get('[aria-label="expand Hosts"]:visible', { log: false }).click();

    cy.get('[placeholder="For example, *.api.mydomain.com"]:visible', {
      log: false,
    })
      .find('input')
      .type('example.com');

    cy.get('[placeholder="For example, *.api.mydomain.com"]:visible', {
      log: false,
    })
      .find('input')
      .filterWithNoValue()
      .type('*.example.com', { force: true });

    // create
    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();
  });

  it('Inspect details', () => {
    cy.getMidColumn().contains(GATEWAY_NAME);
    cy.getMidColumn().contains(SELECTOR);
    // default selector
    cy.getMidColumn().contains('istio=ingressgateway');
    cy.getMidColumn().contains(SERVER_NAME);
    cy.getMidColumn().contains(PORT_NUMBER);
    // hosts
    cy.getMidColumn().contains('example.com');
    cy.getMidColumn().contains('*.example.com');
  });

  it('Edit Gateway', () => {
    cy.wait(500);

    cy.getMidColumn()
      .contains('ui5-button', 'Edit')
      .click();

    cy.get('ui5-dialog')
      .find('[aria-label="Gateway name"]:visible')
      .find('input')
      .should('have.attr', 'readonly');

    cy.get('[aria-label="expand Servers"]:visible', {
      log: false,
    }).click();

    // change server to HTTPS
    cy.get(`ui5-combobox[data-testid="spec.servers.0.port.protocol"]`)
      .find('input')
      .click()
      .clear()
      .type('HTTPS');

    cy.get('ui5-li:visible')
      .contains('HTTPS')
      .find('li')
      .click({ force: true });

    cy.get('[data-testid="spec.servers.0.port.number"]:visible')
      .find('input')
      .click()
      .clear()
      .type('443');

    cy.get('[aria-label="expand Port"]:visible', {
      log: false,
    }).click();

    cy.get('[aria-label="expand TLS"]:visible', {
      log: false,
    }).click();

    // secret
    cy.get('[aria-label="Choose Secret"]:visible', {
      log: false,
    })
      .find('input')
      .type(KYMA_GATEWAY_CERTS);

    chooseComboboxOption('[data-testid="spec.servers.0.tls.mode"]', 'SIMPLE');

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();

    // changed details
    cy.getMidColumn().contains('443');
    cy.getMidColumn().contains('HTTPS');
    cy.getMidColumn().contains(/simple/i);
    cy.getMidColumn().contains(KYMA_GATEWAY_CERTS);
  });

  it('Inspect list', () => {
    cy.inspectList('Gateways', GATEWAY_NAME);
  });
});
