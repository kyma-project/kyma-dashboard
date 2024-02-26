Cypress.Commands.add('inspectList', (resource, resourceName) => {
  const resourceUrl = resource.replace(/\s/g, '').toLowerCase();
  cy.navigateBackTo(resourceUrl, resource);
  cy.wait(1000);
  cy.get('ui5-combobox[placeholder="Search"]')
    .find('input')
    .click()
    .type(resourceName);

  cy.contains(resourceName).should('be.visible');
});
