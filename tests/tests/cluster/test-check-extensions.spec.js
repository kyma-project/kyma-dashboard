/// <reference types="cypress" />
import { useCategory } from '../../support/helpers';

context('Test Cluster Extensions views', () => {
  before(() => {
    cy.loginAndSelectCluster();
  });

  // Integration
  describe('Test Integration Extensions', () => {
    useCategory('Integration');

    // uncomment after frog fix
    // it('Test Applications', () => {
    //   cy.checkExtension('Applications');
    // });
  });
});
