/// <reference types="cypress" />
import 'cypress-file-upload';
import { chooseComboboxOption } from '../../support/helpers';

function openSearchWithSlashShortcut() {
  cy.get('body').type('/', { force: true });
}

const random = Math.floor(Math.random() * 9999) + 1000;
const FUNCTION_NAME = 'test-function';
const API_RULE_NAME = `test-api-rule-${random}`;
const API_RULE_PATH = '/test-path';
const API_RULE_DEFAULT_PATH = '/.*';

context('Test API Rules in the Function details view', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Go to details of the simple Function', () => {
    cy.navigateTo('Workloads', 'Functions');

    cy.contains('a', FUNCTION_NAME)
      .filter(':visible', { log: false })
      .first()
      .click({ force: true });

    cy.get('[role="status"]').contains('span', /running/i, {
      timeout: 60 * 300,
    });
  });

  it('Create an API Rule for the Function', () => {
    cy.navigateTo('Discovery and Network', 'API Rules');

    cy.contains('ui5-button', 'Create API Rule').click();

    // Name
    cy.get('ui5-dialog')
      .find('[aria-label="APIRule name"]:visible')
      .find('input')
      .click()
      .type(API_RULE_NAME, { force: true });

    cy.get('[data-testid="spec.timeout"]:visible', { log: false })
      .find('input')
      .click()
      .clear()
      .type(1212);

    // Service
    cy.get('[aria-label="expand Service"]:visible', {
      log: false,
    })
      .eq(0)
      .click();

    cy.get('[aria-label="expand Service"]:visible', {
      log: false,
    })
      .eq(1)
      .click();

    chooseComboboxOption(
      '[data-testid="spec.rules.0.service.name"]',
      FUNCTION_NAME,
    );

    cy.get('[data-testid="spec.rules.0.service.port"]:visible', { log: false })
      .find('input')
      .click()
      .clear()
      .type(80);

    // Host
    chooseComboboxOption('[data-testid="spec.host"]', '*');

    cy.get('[data-testid="spec.host"]:visible', { log: false })
      .find('input')
      .click()
      .type(`{home}{rightArrow}{backspace}${API_RULE_NAME}`);

    // Rules

    // > General

    cy.get('[data-testid="spec.rules.0.timeout"]:visible')
      .find('input')
      .click()
      .clear()
      .type(2323);

    // > Access Strategies
    cy.get(
      `ui5-combobox[data-testid="spec.rules.0.accessStrategies.0.handler"]:visible`,
    )
      .find('input')
      .click()
      .clear()
      .type('oauth2_introspection', { force: true });

    cy.get('ui5-li:visible')
      .contains('oauth2_introspection')
      .find('li')
      .click({ force: true });

    cy.get('[aria-label="expand Required Scope"]:visible', {
      log: false,
    }).click();

    cy.get(
      '[data-testid="spec.rules.0.accessStrategies.0.config.required_scope.0"]:visible',
    )
      .find('input')
      .click()
      .clear()
      .type('read');

    // > Methods

    cy.get(
      '[data-testid="spec.rules.0.methods.POST"]:visible',
    ).scrollIntoView();

    cy.get(`ui5-checkbox[text="POST"]`).click();

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();
  });

  it('Check the API Rule details', () => {
    cy.contains(API_RULE_NAME).click();

    cy.contains(API_RULE_DEFAULT_PATH).should('exist');

    cy.contains('1212').should('exist');

    cy.contains('Rules #1', { timeout: 10000 }).click();

    cy.contains('2323').should('exist');

    cy.contains('oauth2_introspection').should('exist');

    cy.contains(API_RULE_PATH).should('not.exist');

    cy.contains('allow').should('not.exist');
    cy.contains('read').should('exist');
  });

  it('Edit the API Rule', () => {
    cy.contains('ui5-button', 'Edit').click();

    cy.contains(API_RULE_NAME);

    // Rules
    // > General

    cy.get('[aria-label="expand Rules"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('[aria-label="expand Rule"]:visible', { log: false })
      .first()
      .click();

    cy.get('[data-testid="spec.rules.1.path"]:visible')
      .find('input')
      .click()
      .clear()
      .type(API_RULE_PATH);

    // > Access Strategies
    cy.get('[aria-label="expand Access Strategies"]:visible', { log: false })
      .first()
      .scrollIntoView();

    cy.get(
      `ui5-combobox[data-testid="spec.rules.1.accessStrategies.0.handler"]:visible`,
    )
      .find('input')
      .click()
      .clear()
      .type('jwt', { force: true });

    cy.get('ui5-li:visible')
      .contains('jwt')
      .find('li')
      .click({ force: true });

    cy.get('[aria-label="expand JWKS URLs"]:visible', { log: false }).click();

    cy.get(
      '[data-testid="spec.rules.1.accessStrategies.0.config.jwks_urls.0"]:visible',
    )
      .find('input')
      .click()
      .clear()
      .type('https://urls.com');

    cy.contains(
      'JWKS URL: HTTP protocol is not secure, consider using HTTPS',
    ).should('not.exist');

    cy.get('[aria-label="expand JWKS URLs"]:visible', { log: false }).click();

    cy.get('[aria-label="expand Trusted Issuers"]:visible', {
      log: false,
    }).click();

    cy.get(
      '[data-testid="spec.rules.1.accessStrategies.0.config.trusted_issuers.0"]:visible',
    )
      .find('input')
      .click()
      .clear()
      .type('https://trusted.com');

    cy.contains(
      'Trusted Issuers: HTTP protocol is not secure, consider using HTTPS',
    ).should('not.exist');

    cy.get('[aria-label="expand Trusted Issuers"]:visible', {
      log: false,
    }).click();

    // > Methods
    cy.get('[data-testid="spec.rules.1.methods.POST"]').scrollIntoView();

    cy.get(`ui5-checkbox[text="GET"]:visible`).click();

    cy.get(`ui5-checkbox[text="POST"]:visible`).click();

    // > Service

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();
  });

  it('Check the edited API Rule details', () => {
    cy.contains(API_RULE_NAME).click();

    cy.contains(API_RULE_DEFAULT_PATH).should('exist');

    cy.contains('Rules #1', { timeout: 10000 }).click();

    cy.contains('Rules #2', { timeout: 10000 }).click();

    cy.contains(API_RULE_PATH).should('exist');

    cy.contains('jwt').should('exist');
    cy.contains('https://urls.com').should('exist');
    cy.contains('https://trusted.com').should('exist');

    cy.contains(
      'JWKS URL: HTTP protocol is not secure, consider using HTTPS',
    ).should('not.exist');
    cy.contains(
      'Trusted Issuers: HTTP protocol is not secure, consider using HTTPS',
    ).should('not.exist');
  });

  it('Inspect list using slash shortcut', () => {
    cy.getLeftNav()
      .contains('API Rules')
      .click();

    cy.contains('ui5-title', 'API Rules').should('be.visible');
    cy.get('[aria-label="open-search"]').should('not.be.disabled');

    openSearchWithSlashShortcut();

    cy.get('ui5-combobox[placeholder="Search"]')
      .find('input')
      .click()
      .type(API_RULE_NAME, {
        force: true,
      });

    cy.contains(API_RULE_NAME).should('be.visible');
  });

  it('Create OAuth2 Introspection rule and edit JWT rule', () => {
    cy.contains('a', API_RULE_NAME).click();

    cy.contains('ui5-button', 'Edit').click();

    cy.contains(API_RULE_NAME);

    // Rules
    cy.get('[aria-label="expand Rules"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('[aria-label="expand Rule"]', { log: false })
      .first()
      .click();

    cy.get('[aria-label="expand Rule"]', { log: false })
      .eq(1)
      .click();

    cy.get('[data-testid="spec.rules.2.path"]:visible')
      .find('input')
      .click()
      .clear()
      .type(API_RULE_PATH);

    // > Access Strategies
    cy.get('[aria-label="expand Access Strategies"]:visible', { log: false })
      .first()
      .scrollIntoView();

    cy.get(
      `ui5-combobox[data-testid="spec.rules.2.accessStrategies.0.handler"]:visible`,
    )
      .find('input')
      .click()
      .clear()
      .type('oauth2_introspection', { force: true });

    cy.get('ui5-li:visible')
      .contains('oauth2_introspection')
      .find('li')
      .click({ force: true });

    cy.get('[aria-label="expand Introspection Request Headers"]:visible', {
      log: false,
    }).click();

    cy.get('[aria-label="expand Introspection Request Headers"]:visible', {
      log: false,
    })
      .parent()
      .within(_$div => {
        cy.get('[placeholder="Enter key"]:visible', { log: false })
          .find('input')
          .first()
          .click()
          .clear()
          .type('Authorization');

        cy.get('[placeholder="Enter value"]:visible', { log: false })
          .find('input')
          .first()
          .click()
          .clear()
          .type('Basic 12345');
      });

    cy.get(
      '[data-testid="spec.rules.2.accessStrategies.0.config.introspection_url"]:visible',
    )
      .find('input')
      .click()
      .clear()
      .type('https://example.com');

    cy.get('[aria-label="expand Token From"]:visible', {
      log: false,
    }).click();

    cy.get('[aria-label="expand Token From"]:visible', {
      log: false,
    })
      .parent()
      .within(_$div => {
        cy.contains('Enter key', { log: false })
          .find('input')
          .click()
          .first()
          .click();
      });

    cy.get('[aria-label="expand Token From"]:visible', {
      log: false,
    })
      .parent()
      .within(_$div => {
        cy.get('[placeholder="Enter value"]:visible', { log: false })
          .find('input')
          .click()
          .first()
          .clear()
          .type('FromHeader');
      });

    // > Methods
    cy.get('[data-testid="spec.rules.2.methods.GET"]:visible').click();

    cy.get('[data-testid="spec.rules.2.methods.POST"]:visible').click();

    // Change urls to HTTP in JWT
    cy.get('[aria-label="expand Rule"]', { log: false })
      .eq(1)
      .click();

    cy.get('[aria-label="expand JWKS URLs"]', { log: false }).click();

    cy.get(
      '[data-testid="spec.rules.1.accessStrategies.0.config.jwks_urls.0"]:visible',
    )
      .find('input')
      .click()
      .clear()
      .type('http://urls.com');

    cy.contains(
      'JWKS URL: HTTP protocol is not secure, consider using HTTPS',
    ).should('exist');

    cy.get('[aria-label="expand Trusted Issuers"]', { log: false }).click();

    cy.get(
      '[data-testid="spec.rules.1.accessStrategies.0.config.trusted_issuers.0"]:visible',
    )
      .find('input')
      .click()
      .clear()
      .type('http://trusted.com');

    cy.contains(
      'Trusted Issuers: HTTP protocol is not secure, consider using HTTPS',
    ).should('exist');

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();
  });

  it('Check OAuth2 Introspection strategy', () => {
    cy.contains(API_RULE_NAME).click();

    cy.contains(API_RULE_DEFAULT_PATH).should('exist');

    cy.contains('Rules #3', { timeout: 10000 }).click();

    cy.contains(API_RULE_PATH).should('exist');

    cy.contains('https://example.com').should('exist');
    cy.contains('Authorization=Basic 12345').should('exist');
    cy.contains('header=FromHeader').should('exist');

    cy.contains(
      'JWKS URL: HTTP protocol is not secure, consider using HTTPS',
    ).should('exist');
    cy.contains(
      'Trusted Issuers: HTTP protocol is not secure, consider using HTTPS',
    ).should('exist');
  });
});
