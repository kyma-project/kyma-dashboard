/// <reference types="cypress" />
import 'cypress-file-upload';
import jsyaml from 'js-yaml';
import { useCategory } from '../../support/helpers';

context('Test Service Management category', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Uploads Service Instance and Service Bindings YAMLs', () => {
    cy.contains('Upload YAML').click();

    cy.loadFiles(
      'examples/service-binding-mock-crd.yaml',
      'examples/service-instance-mock-crd.yaml',
    ).then(resources => {
      const input = resources.map(r => jsyaml.dump(r)).join('\n---\n');
      cy.pasteToMonaco(input);
    });

    cy.contains('Submit').click();

    cy.get('.fd-dialog__body')
      .find('.sap-icon--message-success')
      .should('have.length', 4);

    cy.contains('Close').click();

  });

  // Service Management
  it('Check Service Management Extensions', () => {


    useCategory('Service Management');

    cy.checkExtension('Service Bindings');
    cy.checkExtension('Service Instances');
  });
});
