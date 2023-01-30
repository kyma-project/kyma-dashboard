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
  
  })

  // cy.goToNamespaceDetails();
  
})