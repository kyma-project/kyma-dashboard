const SERVICE_NAME = `test-virtual-service-${Math.floor(Math.random() * 9999) +
  1000}`;
const MATCH_NAME = 'test-match';
const URI_KEY = 'prefix';
const URI_PREFIX = '/wpcatalog';

const HEADER_KEY = 'header';
const HEADER_KEY1 = 'exact';
const HEADER_VALUE = 'foo';

const REDIRECT_URI = '/v1/bookRatings';
const REDIRECT_AUTHORITY = 'newratings.default.svc.cluster.local';

// to edit
const GATEWAY =
  'kyma-gateway-application-connector.kyma-system.svc.cluster.local';
const HOST1 = 'host1.example.com';
const HOST2 = 'host2.example.com';

context('Test Virtual Services', () => {
  Cypress.skipAfterFail();

  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a Virtual Service', () => {
    cy.navigateTo('Istio', 'Virtual Services');

    cy.openCreate();

    // name
    cy.get('[aria-label="VirtualService name"]:visible')
      .find('input')
      .type(SERVICE_NAME, { force: true });

    // HTTP
    cy.get('[aria-label="expand HTTP"]:visible', { log: false })
      .contains('Add')
      .click();

    // Matches
    cy.get('[aria-label="expand Matches"]:visible', { log: false })
      .contains('Add')
      .click();

    cy.get('[data-testid="spec.http.0.match.0.name"]:visible')
      .find('input')
      .type(MATCH_NAME, { force: true });

    // URIs
    cy.get('[aria-label="expand Headers"]:visible', { log: false }).click();

    cy.get('[aria-label="expand URI"]:visible', { log: false }).click();

    cy.get('ui5-combobox[data-testid="select-dropdown"]')
      .find('ui5-icon[accessible-name="Select Options"]:visible', {
        log: false,
      })
      .click();

    cy.get('ui5-li:visible', { timeout: 10000 })
      .contains(URI_KEY)
      .find('li')
      .click({ force: true });

    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .first()
      .type(URI_PREFIX, { force: true });

    cy.get('[aria-label="expand URI"]:visible', { log: false }).click();

    // Headers
    cy.get('[aria-label="expand Headers"]:visible', { log: false }).click();

    cy.get('[placeholder="Enter key"]:visible', { log: false })
      .find('input')
      .first()
      .filterWithNoValue()
      .type(HEADER_KEY, { force: true });

    cy.get('[aria-label="expand undefined"]:visible', { log: false })
      .first()
      .click();

    cy.get('ui5-combobox[data-testid="select-dropdown"]')
      .find('ui5-icon[accessible-name="Select Options"]:visible', {
        log: false,
      })
      .eq(0)
      .click();

    cy.get('ui5-li:visible', { timeout: 10000 })
      .contains(HEADER_KEY1)
      .find('li')
      .click({ force: true });

    cy.get('[placeholder="Enter value"]:visible', { log: false })
      .find('input')
      .filterWithNoValue()
      .first()
      .type(HEADER_VALUE, { force: true });

    cy.get('[aria-label="expand Headers"]:visible', { log: false }).click();

    // REDIRECT
    cy.get('[aria-label="expand Redirect"]', { log: false })
      .first()
      .click();

    cy.get('[data-testid="spec.http.0.redirect.uri"]:visible')
      .find('input')
      .type(REDIRECT_URI, { force: true });

    cy.get('[data-testid="spec.http.0.redirect.authority"]:visible')
      .find('input')
      .type(REDIRECT_AUTHORITY, { force: true });

    cy.saveChanges('Create');

    cy.url().should('match', new RegExp(`/virtualservices/${SERVICE_NAME}`));
  });

  it('Inspect Virtual Service', () => {
    cy.getMidColumn().contains('ui5-title', SERVICE_NAME);

    cy.getMidColumn()
      .get('[data-testid="collapse-button-close"]', { timeout: 10000 })
      .click();

    cy.getMidColumn().contains(MATCH_NAME);
    cy.getMidColumn().contains(`${URI_KEY}=${URI_PREFIX}`);
    cy.getMidColumn().contains(HEADER_KEY);
    cy.getMidColumn().contains(HEADER_KEY1);
    cy.getMidColumn().contains(HEADER_VALUE);
    cy.getMidColumn().contains(REDIRECT_URI);
    cy.getMidColumn().contains(REDIRECT_AUTHORITY);
  });

  it('Edit VS and check updates', () => {
    cy.inspectTab('Edit');

    // Hosts
    cy.get('[aria-label="expand Hosts"]:visible', {
      log: false,
    }).click();

    cy.get('[data-testid="spec.hosts.0"]:visible')
      .find('input')
      .click()
      .clear()
      .type(HOST1, { force: true });

    cy.get('[data-testid="spec.hosts.1"]:visible')
      .find('input')
      .click()
      .clear()
      .type(HOST2, { force: true });

    // Gateways
    cy.get('[aria-label="expand Gateways"]:visible', {
      log: false,
    }).click();

    cy.get('[data-testid="spec.gateways.0"]:visible')
      .find('input')
      .click()
      .clear()
      .type(GATEWAY, { force: true });

    cy.saveChanges('Edit');

    // Changed details
    cy.getMidColumn().contains(HOST1);
    cy.getMidColumn().contains(HOST2);
    cy.getMidColumn().contains(GATEWAY);
  });

  it('Inspect service list', () => {
    cy.inspectList(SERVICE_NAME);
  });
});
