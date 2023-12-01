Cypress.Commands.add('navigateToFunctionCreate', functionName => {
  cy.getLeftNav()
    .contains('Functions')
    .click();

  cy.contains('ui5-button', 'Create Function').click();

  cy.get('ui5-dialog')
    .find('ui5-combobox[placeholder="Choose preset"]:visible')
    .find('ui5-icon')
    .click({ force: true });

  cy.get('ui5-li:visible', { timeout: 10000 })
    .contains('Node.js Function')
    .click();

  cy.contains('Advanced').click();

  cy.get('ui5-dialog')
    .find('[aria-label="Function name"]:visible')
    .find('input')
    .type(functionName, { force: true });
});

Cypress.Commands.add('createSimpleFunction', functionName => {
  cy.getLeftNav()
    .contains('Workloads')
    .click();

  cy.navigateToFunctionCreate(functionName);

  cy.get('ui5-dialog')
    .contains('ui5-button', 'Create')
    .should('be.visible')
    .click();
});

Cypress.Commands.add(
  'createFunction',
  (functionName, functionPath, dependenciesPath) => {
    cy.navigateToFunctionCreate(functionName);

    //paste code to the Source Tab code editor
    cy.get('ui5-dialog')
      .get('[aria-label="expand Source"]')
      .readFile(functionPath)
      .then(body => {
        cy.pasteToMonaco(body);
      });

    //open Dependencies Tab and paste the dependencies to the code editor
    cy.get('ui5-dialog')
      .get('[aria-label="expand Dependencies"]')
      .click()
      .readFile(dependenciesPath)
      .then(body => {
        cy.pasteToMonaco(JSON.stringify(body), 1);
      });

    // click Create button
    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();

    //check whether Function has been created
    cy.contains('ui5-button', 'Edit');
  },
);
