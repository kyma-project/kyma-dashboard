/// <reference types="cypress" />
import 'cypress-file-upload';
import { chooseComboboxOption } from '../../support/helpers';

const PROVIDER_NAME = 'test-provider';
const PROVIDER_TYPE = 'cloudflare-dns';
const PROVIDER_TYPE_PRETTY = 'Cloudflare DNS provider';
const PROVIDER_INCLUDED_DOMAIN = 'test.kyma.local';
const PROVIDER_INCLUDED_DOMAIN_2 = 'test2.kyma.local';
const PROVIDER_EXCLUDED_DOMAIN = 'sth.kyma.local';

context('Test DNS Providers', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create DNS Provider', () => {
    cy.navigateTo('Configuration', 'DNS Providers');

    cy.contains('ui5-button', 'Create').click();

    cy.wait(500);

    // type
    chooseComboboxOption(
      '[placeholder="Choose Provider type"]',
      PROVIDER_TYPE_PRETTY,
    );

    // secret
    chooseComboboxOption(
      '[placeholder="Select Namespace"]',
      Cypress.env('NAMESPACE_NAME'),
    );

    cy.wait(500);

    chooseComboboxOption(
      '[placeholder="Select name"]',
      'serverless-registry-config-default',
    );

    // include domains
    cy.get('[placeholder="Domain that is allowed"]:visible', { log: false })
      .find('input')
      .clear()
      .type(PROVIDER_INCLUDED_DOMAIN, { force: true });

    // name
    cy.get('ui5-dialog')
      .find('[aria-label="DNSProvider name"]:visible')
      .find('input')
      .type(PROVIDER_NAME, { force: true });

    // create
    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();
  });

  it('Inspect details', () => {
    // name
    cy.contains(PROVIDER_NAME);
    // type
    cy.contains(PROVIDER_TYPE);
    // included domain
    cy.contains(PROVIDER_INCLUDED_DOMAIN);
  });

  it('Edit DNS Provider', () => {
    cy.contains('ui5-button', 'Edit').click();

    // name should be readonly
    cy.get('ui5-dialog')
      .find('[aria-label="DNSProvider name"]:visible')
      .find('input')
      .should('have.attr', 'readonly', 'readonly');

    // edit labels
    cy.get('ui5-dialog')
      .contains('Labels')
      .filter(':visible', { log: false })
      .click();

    cy.get('[placeholder="Enter key"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .type('is-edited', { force: true });

    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .first()
      .type('yes', { force: true });

    cy.get('[placeholder="Domain that is allowed"]')
      .find('input')
      .filterWithNoValue()
      .type(PROVIDER_INCLUDED_DOMAIN_2);

    // edit excluded domains
    cy.get('ui5-dialog')
      .contains('Exclude Domains')
      .scrollIntoView()
      .filter(':visible', { log: false })
      .click();

    cy.get('[placeholder="Domain that is forbidden"]')
      .find('input')
      .filterWithNoValue()
      .type(PROVIDER_EXCLUDED_DOMAIN);

    // hit update
    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();

    cy.contains('Included Domains');

    // indluded domain
    cy.contains(PROVIDER_INCLUDED_DOMAIN_2);
    // excluded domain
    cy.contains(PROVIDER_EXCLUDED_DOMAIN);
  });

  it('Inspect list', () => {
    cy.inspectList('DNS Providers');

    // label
    cy.contains('edited=yes');
    // type
    cy.contains(PROVIDER_TYPE);
  });
});
