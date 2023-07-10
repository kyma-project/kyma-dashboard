/// <reference types="cypress" />
const APPLICATION_NAME = Cypress.env('APP_NAME');
const APPLICATION_DESCRIPTION = `test description`;

const serviceRequestData = {
  method: 'GET',
  url: /connector-service-internal-api/,
};

context('Test Applications', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
  });

  it('Create Application', () => {
    cy.navigateTo('Integration', 'Applications');

    cy.contains('Create Application').click();

    cy.get('[arialabel="Application name"]input:visible').type(
      Cypress.env('APP_NAME'),
    );

    cy.contains('[role="dialog"] button', 'Create').click();

    cy.contains(Cypress.env('APP_NAME')).should('be.visible');
  });

  it('Inspect list', () => {
    cy.intercept(serviceRequestData, { statusCode: 200, body: '{}' });

    cy.getLeftNav()
      .contains('Applications')
      .click();

    cy.contains('a', APPLICATION_NAME)
      .should('be.visible')
      .click();
  });

  it('Inspect details', () => {
    cy.intercept(serviceRequestData, { statusCode: 200, body: '{}' });

    cy.contains('Access Label').should('be.visible');

    cy.contains('span', APPLICATION_NAME).should('be.visible');

    cy.contains('Provided Services and Events').should('be.visible');
  });

  it('Edit an application', () => {
    cy.contains('Edit').click();

    cy.get('[aria-label="expand Labels"]').click();

    cy.get('[placeholder="Enter key"]:visible')
      .filterWithNoValue()
      .type('labelkey');

    cy.get('[placeholder="Enter value"]:visible')
      .filterWithNoValue()
      .first()
      .type('labelvalue');

    cy.get('[placeholder="Provide a description for your Application"]').type(
      APPLICATION_DESCRIPTION,
    );

    cy.contains('[role="dialog"] button', 'Update').click();
  });

  it('Inspect an updated application', () => {
    cy.contains('labelkey=labelvalue');
    cy.contains(APPLICATION_DESCRIPTION);
  });

  it('Delete the Application', () => {
    cy.getLeftNav()
      .contains('Applications')
      .click();

    cy.deleteFromGenericList(Cypress.env('APP_NAME'));
  });
});
