/// <reference types="cypress" />
import 'cypress-file-upload';

const CERT_NAME = 'cypress-test-name';
const CERT_COMMON_NAME = 'cypress-test-common-name';
const ANNOTATION_KEY = 'annotation';
const ANNOTATION_VALUE = 'value';

context('Test Certificates', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Adds and displays a certificate', () => {
    cy.navigateTo('Configuration', 'Certificates');

    cy.contains('ui5-button', 'Create')
      .click()
      .should('be.visible');

    cy.contains('Simple').should('be.visible');

    cy.get('ui5-dialog')
      .find('[aria-label="Certificate name"]:visible')
      .find('input')
      .click()
      .type(CERT_NAME, { force: true });

    cy.get('ui5-input[placeholder^="Certificate CN"]:visible')
      .find('input')
      .click()
      .type(CERT_COMMON_NAME, { force: true });

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();

    cy.contains('ui5-title', CERT_NAME).should('be.visible');
  });

  it('Edits a certificate', () => {
    cy.getLeftNav()
      .contains('Certificates')
      .click();

    cy.contains('ui5-link', CERT_NAME).click();

    cy.contains('ui5-button', 'Edit').click();

    cy.get('[aria-label="expand Annotations"]').click();

    cy.get('[placeholder="Enter key"]:visible', { log: false })
      .find('input')
      .type(ANNOTATION_KEY, { force: true });

    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .find('input')
      .first()
      .type(ANNOTATION_VALUE, { force: true });

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();

    cy.contains(`${ANNOTATION_KEY}=${ANNOTATION_VALUE}`).should('be.visible');
  });

  it('Inspect a certificate list', () => {
    cy.inspectList('Certificates');
  });
});
