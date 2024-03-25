Cypress.Commands.add('inspectList', (resource, resourceName) => {
  cy.closeMidColumn();
  cy.wait(1000);

  cy.get('ui5-input[placeholder="Search"]:visible')
    .find('input')
    .wait(1000)
    .type(`${resourceName}{enter}`);

  cy.contains('span', resourceName).should('be.visible');
});
