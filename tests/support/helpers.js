export function chooseComboboxOption(selector, optionText) {
  cy.get(`ui5-combobox${selector}:visible`)
    .find('input')
    .filterWithNoValue()
    .click()
    .type(optionText, { force: true });

  cy.get('ui5-li:visible', { timeout: 10000 })
    .contains(optionText)
    .find('li')
    .click({ force: true });

  return cy.end();
}

export function useCategory(category) {
  before(() => {
    cy.getLeftNav()
      .contains(category)
      .click();
  });

  after(() => {
    cy.getLeftNav()
      .contains(category)
      .click();
  });
}
