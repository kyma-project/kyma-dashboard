const SERVICE_NAME = 'service';
const SERVICE_KEY = `app`; //SERVICE
const SERVICE_VALUE = 'proxy';
const SERVICE_TARGET_PORT = 'http-web-svc';
const SERVICE_PORT_NAME = 'service-port';
const SERVICE_DIFF_TYPE = 'NodePort';
const SERVICE_PORT = '80:http-web-svc/TCP';

context('Test Services', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Service', () => {
    cy.navigateTo('Discovery and Network', 'Services');

    cy.contains('Create Service').click();

    cy.get('[arialabel="Service name"]:visible').type(SERVICE_NAME);
    cy.get('[arialabel="Delete"]:visible').click();

    cy.get('[placeholder="Enter key"]:visible')
      .click()
      .type(SERVICE_KEY);
    cy.get('[index="-1"]:visible')
      .click()
      .type(SERVICE_VALUE);

    cy.get(
      '[class="fd-button fd-button--transparent fd-button--compact"]:visible',
    )
      .contains('Add')
      .click({ force: true });

    cy.get('[placeholder="enter Ports Name"]:visible').type(SERVICE_PORT_NAME);

    cy.get('[placeholder="Enter Target Port"]:visible')
      .clear()
      .type(SERVICE_TARGET_PORT);

    cy.get('[role="dialog"]')
      .contains('button', 'Create')
      .click();
  });

  it('Inspect Services', () => {
    cy.contains(SERVICE_PORT);
  });

  it('Edit a Service', () => {
    cy.contains('Edit').click();

    cy.get('[placeholder="Enter Type"]:visible')
      .clear()
      .type(SERVICE_DIFF_TYPE);

    cy.contains('Update').click();
  });

  it('Inspect updated Service', () => {
    cy.contains(SERVICE_DIFF_TYPE);
    cy.contains(SERVICE_PORT);
  });

  it('Inspect Service list', () => {
    cy.inspectList('Services', SERVICE_NAME);
  });
});
