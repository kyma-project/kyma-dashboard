Cypress.Commands.add('inspectList', (resource, resourceName) => {
  cy.closeMidColumn();
  cy.wait(1000);
  cy.get('ui5-combobox[placeholder="Search"]:visible:visible')
    .find('input')
    .click()
    .type(resourceName);

  cy.contains(resourceName).should('be.visible');
});
