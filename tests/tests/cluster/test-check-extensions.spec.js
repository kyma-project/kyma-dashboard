/// <reference types="cypress" />
import { useCategory } from '../../support/helpers';

context('Test Cluster Extensions views', () => {
  before(() => {
    cy.loginAndSelectCluster();
  });

  // Integration XD
  describe('Test Integration Extensions', () => {
    useCategory('Integration');

    it('Test Applications', () => {
      cy.checkExtension('Applications');
    });
  });

  // Observability
  describe('Test Observability Extensions', () => {
    useCategory('Observability');

    it('Test Log Parsers', () => {
      cy.checkExtension('Log Parsers');
    });

    it('Test Log Pipelines', () => {
      cy.checkExtension('Log Pipelines');
    });
  });
});
