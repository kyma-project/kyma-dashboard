/// <reference types="cypress" />

context('Test Kyma Modules views', () => {
  before(() => {
    cy.loginAndSelectCluster();
  });

  it('Test Feature card for Modules', () => {
    cy.wait(2000);

    cy.get('ui5-card')
      .contains('Installed Modules')
      .should('be.visible');

    cy.get('ui5-card')
      .contains('Modify Modules')
      .click();

    cy.url().should('match', /.*\/kymamodules/);
  });

  it('Test adding Modules', () => {
    cy.get('ui5-panel')
      .contains('ui5-button', 'Add')
      .click();

    cy.wait(1000);

    cy.get('ui5-card')
      .contains('eventing')
      .should('be.visible');

    cy.get('ui5-card-header[title-text="eventing"]').click();

    cy.get('ui5-card')
      .contains('api-gateway')
      .should('be.visible');

    cy.get('ui5-card-header[title-text="api-gateway"]').click();

    cy.get('.create-form')
      .contains('ui5-button:visible', 'Add')
      .click();

    cy.wait(7000);

    cy.get('ui5-table-row')
      .contains('eventing')
      .should('be.visible');

    cy.get('ui5-table-row')
      .contains('api-gateway')
      .should('be.visible');
  });

  it('Test Modules list and details', () => {
    cy.reload();

    cy.get('ui5-input[placeholder="Search"]:visible')
      .find('input')
      .wait(1000)
      .type('eventing');

    cy.get('ui5-table-row')
      .contains('eventing')
      .should('be.visible');

    cy.get('ui5-table-row')
      .contains('eventing')
      .click();

    cy.getMidColumn().contains('eventing');
    cy.getMidColumn().contains(`Eventing`);
    cy.getMidColumn().contains(`0 days`);

    cy.closeMidColumn();

    cy.get('ui5-input[placeholder="Search"]:visible')
      .find('input')
      .clearInput();

    cy.inspectTab('Edit');

    cy.get('ui5-button:visible')
      .contains('Save')
      .click();

    cy.get('ui5-message-strip')
      .contains('Kyma updated')
      .should('be.visible');

    cy.inspectTab('View');
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
      .as('eventing-panel');

    cy.get('@eventing-panel').click();

    cy.get('@eventing-panel')
      .find('ui5-select')
      .click();

    cy.get('ui5-li:visible')
      .contains(/Regular .*/)
      .click();

    cy.get('.create-form')
      .contains('ui5-button:visible', 'Add')
      .click();

    cy.wait(10000);

    cy.get('ui5-table-row')
      .contains('eventing')
      .should('be.visible');

    cy.get('ui5-table-row')
      .contains('regular')
      .should('be.visible');
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