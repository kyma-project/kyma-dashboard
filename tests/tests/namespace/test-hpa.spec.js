/// <reference types="cypress" />
import 'cypress-file-upload';

const HPA_NAME = 'test-hpa';
const DOCKER_IMAGE = 'nginx';
const DEPLOYEMENT_NAME = 'no-pod';
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

    cy.contains('button', 'Create Deployment').click();

    cy.get('.fd-dialog__content')
      .find('[ariaLabel^="Deployment name"]:visible')
      .type(DEPLOYEMENT_NAME);

    cy.get('.fd-dialog__content')
      .find('[placeholder^="Enter the Docker image"]:visible')
      .type(DOCKER_IMAGE);

    cy.get('.fd-dialog__content')
      .contains('button', 'Create')
      .click();

    cy.contains('h3', DEPLOYEMENT_NAME).should('be.visible');
  });

  it('Create HPA', () => {
    cy.navigateTo('Discovery and Network', 'Horizontal Pod');

    cy.contains('Create Horizontal Pod Autoscaler').click();

    cy.get('[arialabel="HorizontalPodAutoscaler name"]:visible').type(HPA_NAME);

    cy.get('[data-testid="spec.maxReplicas"]:visible')
      .clear()
      .type(MAX_REPLICAS);

    cy.get('[data-testid="spec.scaleTargetRef.name"]:visible').type(
      SCALE_TARGET_REF_NAME,
    );

    cy.get('[data-testid="spec.scaleTargetRef.kind"]:visible').type(
      SCALE_TARGET_REF_KIND,
    );

    cy.get('[role="dialog"]')
      .contains('button', 'Create')
      .click();

    cy.contains('[aria-label="title"]', HPA_NAME).should('be.visible');
  });

  it('Check HPA details', () => {
    cy.contains(`Deployment (${DEPLOYEMENT_NAME})`).should('be.visible');

    cy.contains('#content-wrap', 'Events').should('be.visible');
  });

  it('Check HPA list', () => {
    cy.inspectList('Horizontal Pod', HPA_NAME);
  });

  it('Check HPA subcomponent', () => {
    cy.get('[role=row]')
      .contains(HPA_NAME)
      .click();

    cy.contains(DEPLOYEMENT_NAME).click();

    cy.url().should('match', /deployments/);

    cy.contains(HPA_NAME).should('be.visible');
  });
});
