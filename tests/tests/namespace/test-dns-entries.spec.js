/// <reference types="cypress" />
import 'cypress-file-upload';
const random = Math.random()
  .toString()
  .substr(2, 8);
const DNS_ENTRY_NAME = 'dns-entry-' + random;
const DNS_NAME = 'dns-name-' + random;
const TTL = 200;
context('Test DNS Entries', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create DNS Entry', () => {
    cy.navigateTo('Configuration', 'DNS Entries');

    cy.contains('ui5-button', 'Create').click();

    // ttl
    cy.get('[placeholder^="Enter the time to live"]:visible')
      .find('input')
      .click()
      .clear()
      .type(TTL, { force: true });

    // dns name
    cy.get('[placeholder^="Select the DNSName"]:visible')
      .find('input')
      .type(DNS_NAME, { force: true })
      .click();

    // name
    cy.get('ui5-dialog')
      .find('[aria-label="DNSEntry name"]:visible')
      .find('input')
      .type(DNS_ENTRY_NAME, { force: true });

    // target
    cy.get('[placeholder^="Enter the A record target or CNAME record"]:visible')
      .find('input')
      .click()
      .type('35.204.159.60');

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();
  });

  it('Inspect details', () => {
    cy.getMidColumn().contains(DNS_ENTRY_NAME);
    cy.getMidColumn().contains(`DNSName${DNS_NAME}`);
    cy.getMidColumn().contains(`TTL${TTL}`);
  });

  it('Edit DNS Entry', () => {
    cy.wait(1000);

    cy.getMidColumn()
      .contains('ui5-button', 'Edit')
      .click();

    // name should be disabled for edit
    cy.get('ui5-dialog')
      .find('[aria-label="DNSEntry name"]:visible')
      .find('input')
      .should('have.attr', 'readonly');

    // change from A to CNAME
    cy.get('[placeholder^="Enter the A record target"]:visible')
      .find('input')
      .last()
      .type('example.com', { force: true });

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();

    cy.getMidColumn().contains(/Targets.*, example\.com/);
  });

  it('Inspect list', () => {
    cy.inspectList('Entries', DNS_ENTRY_NAME);
  });
});
