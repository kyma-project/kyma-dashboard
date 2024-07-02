/// <reference types="cypress" />

context('Test Kyma Modules views', () => {
  before(() => {
    cy.loginAndSelectCluster();
  });

  it('Test Kyma Modules view', () => {
    cy.navigateTo('Configuration', 'Modules');

    //cy.contains('ui5-title', 'Modules').should('be.visible');
  });

  it('Test adding Modules', () => {
    // cy.navigateTo('Configuration', 'Modules');

    cy.get('ui5-panel')
      .contains('ui5-button', 'Add')
      .click();

    cy.wait(1000);

    cy.get('ui5-card')
      .contains('eventing')
      .should('be.visible');

    cy.get('ui5-card-header[title-text="eventing"]').click();

    cy.get('ui5-card')
      .contains('istio')
      .should('be.visible');

    cy.get('ui5-card-header[title-text="istio"]').click();

    cy.get('.create-form')
      .contains('ui5-button:visible', 'Add')
      .click();

    cy.get('ui5-table-row')
      .contains('eventing')
      .should('be.visible');

    cy.get('ui5-table-row')
      .contains('istio')
      .should('be.visible');
  });

  it('Test changing Module Channel', () => {
    cy.get('ui5-panel')
      .contains('ui5-button', 'Add')
      .click();

    cy.wait(1000);

    cy.get('ui5-card')
      .contains('eventing')
      .should('be.visible');

    cy.get('ui5-card-header[title-text="eventing"]')
      .siblings('ui5-panel')
      .click();

    cy.get('ui5-card-header[title-text="eventing"]')
      .siblings('ui5-panel')
      .find('ui5-select')
      .click();

    cy.wait(2000);

    cy.get('ui5-li:visible')
      .contains(/Regular .*/)
      .click();

    cy.get('.create-form')
      .contains('ui5-button:visible', 'Add')
      .click();

    cy.get('ui5-table-row')
      .contains('regular')
      .should('be.visible');
  });

  it('Test edit Kyma resource', () => {
    cy.inspectTab('Edit');
    cy.inspectTab('View');
  });

  it('Test deleting Modules', () => {
    cy.get('ui5-panel')
      .contains('ui5-button', 'Add')
      .click();

    cy.wait(1000);

    cy.get('ui5-card')
      .contains('eventing')
      .should('be.visible');

    cy.get('ui5-card-header[title-text="eventing"]').click();

    cy.get('.create-form')
      .contains('ui5-button:visible', 'Add')
      .click();

    cy.wait(20000);

    cy.get('ui5-table-row')
      .contains('eventing')
      .should('not.be.visible');
  });
});
