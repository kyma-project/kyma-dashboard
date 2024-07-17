Cypress.Commands.add('openCreate', () => {
  cy.get('ui5-panel')
    .contains('ui5-button', 'Create')
    .click();
});

Cypress.Commands.add('saveChanges', (action = 'Create') => {
  const isCreate = action === 'Create';
  cy.get(isCreate ? '[data-testid="create-form-footer-bar"]' : '.edit-form')
    .contains('ui5-button:visible', isCreate ? 'Create' : 'Save')
    .click();
});
