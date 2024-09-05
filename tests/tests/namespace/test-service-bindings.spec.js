const SERVICE_BINDING_NAME = 'service-binding';
const SERVICE_INSTANCE_NAME = 'service-instance';
const SERVICE_INSTANCE_NAME_CHANGED = 'service-instance-change';

context('Test Service Bindings', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Service Binding', () => {
    cy.navigateTo('Service Management', 'Service Bindings');

    cy.openCreate();

    cy.get('[aria-label="ServiceBinding name"]:visible')
      .find('input')
      .click()
      .type(SERVICE_BINDING_NAME, { force: true });

    cy.get('[aria-label="Choose ServiceInstance"]:visible')
      .find('input')
      .eq(0)
      .click()
      .type(SERVICE_INSTANCE_NAME, { force: true });

    cy.saveChanges('Create');
  });

  it('Inspect Service Bindings', () => {
    cy.getMidColumn().contains(SERVICE_INSTANCE_NAME);

    cy.getMidColumn().contains('User Info');
  });

  it('Edit a Service Binding', () => {
    cy.wait(1000);

    cy.inspectTab('Edit');

    cy.get('[aria-label="Choose ServiceInstance"]:visible')
      .find('input')
      .click()
      .type(SERVICE_INSTANCE_NAME_CHANGED, { force: true });

    cy.saveChanges('Edit');
    cy.getMidColumn().inspectTab('View');
  });

  it('Inspect updated Service Binding', () => {
    cy.getMidColumn().contains(SERVICE_INSTANCE_NAME_CHANGED);
  });

  it('Inspect Service Bindings list', () => {
    cy.inspectList(SERVICE_BINDING_NAME);

    cy.deleteFromGenericList('ServiceBinding', SERVICE_BINDING_NAME);
  });
});
