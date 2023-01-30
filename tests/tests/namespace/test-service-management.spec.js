/// <reference types="cypress" />
import 'cypress-file-upload';
import jsyaml from 'js-yaml';

const NAMESPACE = 'service-management';

context('Test extensibility variables', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster({
      fileName: 'kubeconfig-k3s.yaml',
      storage: 'Session storage',
    });

  });

  it('Creates the EXT test resources config', () => {
    cy.getLeftNav()
      .contains('Cluster Details')
      .click();

    cy.contains('Upload YAML').click();

    cy.loadFiles(
      'examples/service-binding-mock-crd.yaml',
      'examples/service-instance-mock-crd.yaml',
      'examples/servicebindings.yaml',
      'examples/serviceinstances.yaml'
    ).then(resources => {
      const input = resources.map(r => jsyaml.dump(r)).join('\n---\n');
      cy.pasteToMonaco(input);
    });

    cy.contains('Submit').click();

    cy.get('.fd-dialog__body')
      .find('.sap-icon--message-success')
      .should('have.length', 4);
  });


  it('Navigate to Test Resource Creation', () => {
    cy.loginAndSelectCluster({
      fileName: 'kubeconfig-k3s.yaml',
      storage: 'Session storage',
    });

    cy.contains('Namespaces').click();

    cy.contains('a', 'default').click();

      // Service Management
  describe('Check Service Management Extensions', () => {
    useCategory('Service Management');

    it('Test Service Bindings', () => {
      cy.checkExtension('Service Bindings');
    });

    it('Test Service Instances', () => {
      cy.checkExtension('Service Instances');
    });
  });
  })
})