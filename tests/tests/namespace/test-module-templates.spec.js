context('Test Module-templates', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.getLeftNav()
      .contains('Namespaces')
      .click();

    cy.get('[role=row]')
      .contains('kcp-system')
      .click();

    cy.navigateTo('Kyma', 'Module Templates');

    cy.contains('keda-fast').click();

    cy.url().should('match', new RegExp(`/moduletemplates/keda-fast`));
  });

  it('Inspect Module-templates', () => {
    cy.contains('argocd.argoproj.io/instance=kyma-modules-fast-channel');
    cy.contains('operator.kyma-project.io/managed-by=lifecycle-manager');
    cy.contains('operator.kyma-project.io/controller-name=manifest');
    cy.contains('operator.kyma-project.io/module-name=keda');
    cy.contains('Data');
    cy.contains('Descriptor');

    cy.get('[class="fd-object-status__text"]:visible').contains('fast');

    cy.contains('View YAML').click();

    cy.contains('keda-fast.yaml');

    cy.get('[aria-label="close drawer"]:visible').click();
  });
});
