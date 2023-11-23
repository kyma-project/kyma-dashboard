const SERVICE_NAME = 'service';
const SERVICE_KEY = `app`;
const SERVICE_VALUE = 'proxy';
const SERVICE_TARGET_PORT = 'http-web-svc';
const SERVICE_DIFF_TYPE = 'NodePort';
const SERVICE_PORT = '(80) --> (http-web-svc)';

context('Test Services', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Service', () => {
    cy.navigateTo('Discovery and Network', 'Services');

    cy.contains('ui5-button', 'Create Service').click();

    cy.get('ui5-dialog')
      .find('[aria-label="Service name"]:visible')
      .find('input')
      .click()
      .type(SERVICE_NAME, { force: true });

    cy.get('[placeholder="Enter key"]:visible', { log: false })
      .find('input')
      .eq(0)
      .click()
      .clear()
      .type(SERVICE_KEY, { force: true });

    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .first()
      .type(SERVICE_VALUE, { force: true });

    cy.get('[aria-label="expand Ports"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('ui5-dialog')
      .find('[aria-label="Service name"]:visible')
      .eq(1)
      .find('input')
      .click()
      .type(SERVICE_NAME, { force: true });

    cy.get('[placeholder="Enter Target Port"]:visible')
      .find('input')
      .click()
      .clear()
      .type(SERVICE_TARGET_PORT);

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();
  });

  it('Inspect Services', () => {
    cy.contains(SERVICE_PORT);
  });

  it('Edit a Service', () => {
    cy.contains('ui5-button', 'Edit').click();

    cy.get('[placeholder="Enter Type"]:visible')
      .find('input')
      .click()
      .clear()
      .type(SERVICE_DIFF_TYPE);

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();
  });

  it('Inspect updated Service', () => {
    cy.contains(SERVICE_DIFF_TYPE);
    cy.contains(SERVICE_PORT);
  });

  it('Inspect Service list', () => {
    cy.inspectList('Services', SERVICE_NAME);
  });
});
