const KYMA_NAME = `test-kyma-${Math.floor(Math.random() * 9999) + 1000}`;
const KYMA_DEFAULT_CHANNEL = 'fast';
context('Test Kyma', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();

    cy.getLeftNav()
      .contains('Kyma')
      .eq(0)
      .click();

    cy.getLeftNav()
      .contains('Kyma')
      .eq(1)
      .click();
  });

  it('Create an Kyma', () => {
    cy.contains('Create Kyma').click();

    cy.get('[arialabel="Kyma name"]:visible').type(KYMA_NAME);

    cy.get('[aria-label="Combobox input"]:visible').type(KYMA_DEFAULT_CHANNEL);

    cy.contains('keda');

    cy.get('[role=dialog]')
      .contains('button', 'Create')
      .click();
  });

  it('Inspect Kyma', () => {
    cy.contains(KYMA_NAME);
  });

  it('Edit a Kyma', () => {
    cy.contains('Edit').click();

    cy.get('[class="fd-form-label fd-checkbox__label"]')
      .filter(':visible')
      .click();

    cy.contains('Update').click();
  });

  it('Inspect updated Kyma', () => {
    cy.contains(KYMA_NAME);
    cy.contains('keda');
  });

  it('Inspect Kyma list', () => {
    cy.inspectList('Kyma', KYMA_NAME);
  });
});
