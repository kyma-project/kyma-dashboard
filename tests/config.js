const env = Cypress.env();
const domain = env.DOMAIN || 'https://local.kyma.dev';

console.log(env);

export default {
  domain: domain,
  localDev: env.LOCAL_DEV || false,
  clusterAddress: env.LOCAL_DEV ? `http://localhost:3001` : `${domain}`,
};
