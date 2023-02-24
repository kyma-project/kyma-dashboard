/// <reference types="cypress" />
import { useCategory } from '../../support/helpers';

context('Test Namespace Extensions view', () => {
  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  // Workloads
  describe('Test Workloads Extensions', () => {
    useCategory('Workloads');

    it('Test Functions', () => {
      cy.checkExtension('Functions');
    });
  });

  // Discovery and Network
  describe('Check Discovery and Network Extensions', () => {
    useCategory('Discovery and Network');

    it('Test API Rules', () => {
      cy.checkExtension('API Rules');
    });
  });

  // Istio
  describe('Check Istio Extensions', () => {
    useCategory('Istio');

    it('Test Authorization Policies', () => {
      cy.checkExtension('Authorization Policies');
    });

    it('Test Destination Rules', () => {
      cy.checkExtension('Destination Rules');
    });

    it('Test Gateways', () => {
      cy.checkExtension('Gateways');
    });

    it('Test Service Entries', () => {
      cy.checkExtension('Service Entries');
    });

    it('Test Sidecars', () => {
      cy.checkExtension('Sidecars');
    });

    it('Test Virtual Services', () => {
      cy.checkExtension('Virtual Services');
    });
  });

  // Configuration
  describe('Check Configuration Extensions', () => {
    useCategory('Configuration');

    it('Test Certificates', () => {
      cy.checkExtension('Certificates');
    });

    it('Test DNS Entries', () => {
      cy.checkExtension('DNS Entries');
    });

    it('Test DNS Providers', () => {
      cy.checkExtension('DNS Providers');
    });


    it('Test Issuers', () => {
      cy.checkExtension('Issuers');
    });

    it('Test Subscriptions', () => {
      cy.checkExtension('Subscriptions');

    it('Test OAuth2 Clients', () => {
      cy.checkExtension('OAuth2 Clients');

    });
  });
});
