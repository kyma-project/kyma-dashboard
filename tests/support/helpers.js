export function chooseComboboxOption(selector, optionText) {
  cy.wait(1000);

  cy.get(`ui5-combobox${selector}:visible`)
    .find('input')
    .filterWithNoValue()
    .click()
    .type(optionText, { force: true });

  cy.wait(1000);

  cy.get('ui5-li:visible')
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
}
