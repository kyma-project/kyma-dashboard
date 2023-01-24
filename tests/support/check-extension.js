Cypress.Commands.add('checkExtension', (resource, create = true) => {
  cy.getLeftNav()
    .contains(resource)
    .click();

  cy.contains(resource).should('be.visible');

  if (create) {
    cy.contains('Create').should('be.visible');
  }
});
