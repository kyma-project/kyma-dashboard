/// <reference types="cypress" />
import 'cypress-file-upload';
import { chooseComboboxOption } from '../../support/helpers';

const HPA_NAME = 'test-hpa';
const DOCKER_IMAGE = 'nginx';
const DEPLOYEMENT_NAME = 'no-pod';
const MIN_REPLICAS = 2;
const MAX_REPLICAS = 3;
const SCALE_TARGET_REF_KIND = 'Deployment';
const SCALE_TARGET_REF_NAME = 'no-pod';

context('Test HPA', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Creates auxiliary Deployment', () => {
    cy.navigateTo('Workloads', 'Deployments');

    cy.contains('ui5-button', 'Create Deployment').click();

    cy.get('ui5-dialog')
      .find('[aria-label="Deployment name"]:visible')
      .find('input')
      .type(DEPLOYEMENT_NAME, { force: true });

    cy.get('[placeholder^="Enter the Docker image"]:visible')
      .find('input')
      .type(DOCKER_IMAGE, { force: true });

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();

    cy.contains('ui5-title', DEPLOYEMENT_NAME).should('be.visible');
  });

  it('Create HPA', () => {
    cy.navigateTo('Discovery and Network', 'Horizontal Pod');

    cy.contains('ui5-button', 'Create Horizontal Pod Autoscaler').click();

    cy.get('ui5-dialog')
      .find('[aria-label="HorizontalPodAutoscaler name"]:visible')
      .find('input')
      .click()
      .type(HPA_NAME, { force: true });

    cy.get('[data-testid="spec.maxReplicas"]:visible')
      .find('input')
      .click()
      .clear()
      .type(MAX_REPLICAS);

    chooseComboboxOption(
      '[data-testid="spec.scaleTargetRef.kind"]',
      SCALE_TARGET_REF_KIND,
    );

    cy.get('[data-testid="spec.scaleTargetRef.name"]:visible')
      .find('input')
      .type(SCALE_TARGET_REF_NAME, { force: true });

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Create')
      .should('be.visible')
      .click();

    cy.contains('ui5-title', HPA_NAME).should('be.visible');
  });

  it('Check HPA details', () => {
    cy.contains('Deployment').should('be.visible');
    cy.contains('a', `${DEPLOYEMENT_NAME}`).should('be.visible');

    cy.contains('#content-wrap', 'Events').should('be.visible');
  });

  it('Check HPA list', () => {
    cy.inspectList('Horizontal Pod', HPA_NAME);
  });

  it('Check HPA subcomponent', () => {
    cy.get('[role=row]')
      .contains('a', HPA_NAME)
      .click();

    cy.contains('a', DEPLOYEMENT_NAME).click();

    cy.url().should('match', /deployments/);

    cy.contains(HPA_NAME).should('be.visible');
  });

  it('Check Edit HPA', () => {
    cy.get('[role=row]')
      .contains('a', HPA_NAME)
      .click();

    cy.contains('ui5-button', 'Edit').click();

    cy.get('[data-testid="spec.minReplicas"]:visible')
      .find('input')
      .click()
      .clear()
      .type(MIN_REPLICAS);

    cy.get('ui5-dialog')
      .contains('ui5-button', 'Update')
      .should('be.visible')
      .click();

    cy.contains('Min Replicas')
      .parent()
      .contains(MIN_REPLICAS);
  });
});
