/// <reference types="cypress" />
import 'cypress-file-upload';
import { chooseComboboxOption } from '../../support/helpers';

const AP_NAME =
  'test-ap-' +
  Math.random()
    .toString()
    .substr(2, 8);
const ACTION = 'AUDIT';
const METHODS = 'GET';
const PATHS = '/user/profile/*';
const KEY = 'request.auth.claims[iss]';
const VALUES = 'https://test-value.com';

context('Test Authorization Policies', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create Authorization Policy', () => {
    cy.navigateTo('Istio', 'Authorization Policies');

    cy.contains('ui5-button', 'Create').click();

    cy.wait(500);

    // Action
    chooseComboboxOption('[placeholder="Type or choose an option."]', ACTION);

    // Name
    cy.get('ui5-dialog')
      .find('[aria-label="AuthorizationPolicy name"]:visible')
      .find('input')
      .type(AP_NAME, { force: true });

    // Rules
    cy.get('[aria-label="expand Rules"]:visible', { log: false })
      .contains('Add')
      .click();

    // When
    cy.get('[aria-label="expand When"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('[data-testid="spec.rules.0.when.0.key"]:visible')
      .find('input')
      .type(KEY);

    cy.get('[aria-label="expand Values"]:visible', { log: false }).click();

    cy.get('[data-testid="spec.rules.0.when.0.values.0"]:visible')
      .find('input')
      .type(VALUES);

    // To
    cy.get('[aria-label="expand To"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('[aria-label="expand Methods"]:visible', { log: false }).click();

    cy.get('[data-testid="spec.rules.0.to.0.operation.methods.0"]:visible')
      .find('input')
      .type(METHODS);

    cy.get('[aria-label="expand Paths"]:visible', { log: false }).click();

    cy.get('[data-testid="spec.rules.0.to.0.operation.paths.0"]:visible')
      .find('input')
      .type(PATHS);

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();
  });

  it('Checking details', () => {
    cy.getMidColumn()
      .contains(AP_NAME)
      .should('be.visible');

    cy.getMidColumn()
      .contains(ACTION)
      .should('be.visible');

    cy.getMidColumn()
      .contains('Matches all Pods in the Namespace')
      .should('be.visible');

    cy.getMidColumn()
      .contains('Rule #1 to when', { timeout: 10000 })
      .click();

    cy.getMidColumn()
      .contains('To #1 methods paths', { timeout: 10000 })
      .click();

    cy.getMidColumn()
      .contains(PATHS)
      .should('be.visible');

    cy.getMidColumn()
      .contains(KEY)
      .should('be.visible');

    cy.getMidColumn()
      .contains(VALUES)
      .should('be.visible');

    cy.getMidColumn()
      .contains('Operation')
      .should('be.visible');

    cy.getMidColumn()
      .contains(METHODS)
      .should('be.visible');
  });

  it('Edit and check changes', () => {
    cy.getMidColumn()
      .contains('ui5-button', 'Edit')
      .click();

    cy.get('[placeholder="Enter key"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .type('sel', { force: true });

    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .first()
      .type('selector-value', { force: true });

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();

    cy.getMidColumn()
      .contains('sel=selector-value')
      .should('be.visible');

    cy.getMidColumn()
      .contains('Matches all Pods in the Namespace')
      .should('not.exist');
  });

  it('Inspect list', () => {
    cy.inspectList('Authorization Policies', 'test-ap');
  });
});
